const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Server } = require('ws');
const axios = require('axios');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/activityTracker', { useNewUrlParser: true, useUnifiedTopology: true });

const activitySchema = new mongoose.Schema({
    title: String,
    duration: Number,
    timestamp: Number
});

const Activity = mongoose.model('Activity', activitySchema);

app.use(bodyParser.json());

app.post('/record', (req, res) => {
    const { window_title, duration, timestamp } = req.body;
    const activity = new Activity({ title: window_title, duration, timestamp });
    activity.save().then(() => {
        broadcastActivities();
        res.sendStatus(200);
    });
});

app.post('/priority/:task', async (req, res) => {
    const task = req.params.task;
    const taskList = req.body.tasks;
    try {
        const response = await axios.post(`http://localhost:5000/predict_priority/${task}`, { tasks: taskList });
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/set_model', async (req, res) => {
    const { task, model_name } = req.body;
    try {
        await axios.post('http://localhost:5000/set_model', { task, model_name });
        res.json({ status: 'Model set successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/models', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/models');
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/model/:task', async (req, res) => {
    const task = req.params.task;
    try {
        const response = await axios.get(`http://localhost:5000/model/${task}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

const wss = new Server({ server });

function broadcastActivities() {
    Activity.find().then(activities => {
        const data = JSON.stringify(activities);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
}

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('close', () => console.log('Client disconnected'));
});
