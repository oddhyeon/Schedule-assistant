const { contextBridge, ipcRenderer } = require('electron');
const WebSocket = require('ws');

contextBridge.exposeInMainWorld('electron', {
  sendTaskData: (data) => ipcRenderer.send('send-task-data', data),
  setModel: (task, modelName) => ipcRenderer.send('set-model', { task, modelName }),
  listModels: () => ipcRenderer.send('list-models'),
  getModel: (task) => ipcRenderer.send('get-model', task)
});

let ws;

function connectWebSocket() {
  ws = new WebSocket('ws://your-backend-server-url/ws');

  ws.onopen = () => {
    console.log('WebSocket connection opened');
  };

  ws.onmessage = (event) => {
    const tasks = JSON.parse(event.data);
    ipcRenderer.send('update-tasks', tasks);
  };

  ws.onclose = () => {
    console.log('WebSocket connection closed');
    setTimeout(connectWebSocket, 1000); // Retry connection after 1 second
  };
}

connectWebSocket();
