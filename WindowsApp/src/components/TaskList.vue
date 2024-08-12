<template>
    <div>
      <button @click="fetchTasks">Fetch Tasks</button>
      <h2>Tasks</h2>
      <ul>
        <li v-for="task in tasks" :key="task._id">{{ task.title }} - {{ task.duration }} seconds</li>
      </ul>
      <h2>Priority</h2>
      <ul>
        <li v-for="(task, index) in priority" :key="index">{{ task.label }} ({{ task.score }})</li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        tasks: [],
        priority: []
      };
    },
    methods: {
      fetchTasks() {
        axios.get('http://localhost:3000/tasks')
          .then(response => {
            this.tasks = response.data;
            return axios.post(`http://localhost:3000/predict_priority/${this.task}`, { tasks: this.tasks });
          })
          .then(response => {
            this.priority = response.data.priority;
          })
          .catch(error => console.error(error));
      }
    },
    created() {
      window.electron.onUpdateTasks((event, tasks) => {
        this.tasks = tasks;
      });
    }
  };
  </script>
  