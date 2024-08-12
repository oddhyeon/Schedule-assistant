<template>
    <div id="app">
      <h1>Activity Tracker</h1>
      <TaskList />
      <div>
        <input v-model="task" placeholder="Enter task"/>
        <input v-model="modelName" placeholder="Enter model name"/>
        <button @click="setModel">Set Model</button>
      </div>
      <div>
        <button @click="listModels">List Models</button>
        <ul>
          <li v-for="model in models" :key="model">{{ model }}</li>
        </ul>
      </div>
      <div>
        <input v-model="taskToGetModel" placeholder="Enter task to get model"/>
        <button @click="getModel">Get Model</button>
        <p>{{ modelInfo }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import TaskList from './components/TaskList.vue';
  
  export default {
    name: 'App',
    components: {
      TaskList
    },
    data() {
      return {
        task: '',
        modelName: '',
        models: [],
        taskToGetModel: '',
        modelInfo: ''
      };
    },
    methods: {
      setModel() {
        window.electron.setModel(this.task, this.modelName);
      },
      listModels() {
        window.electron.listModels();
      },
      getModel() {
        window.electron.getModel(this.taskToGetModel);
      }
    },
    created() {
      window.electron.onUpdateTasks((event, tasks) => {
        this.tasks = tasks;
      });
      window.electron.on('update-models', (event, models) => {
        this.models = models;
      });
      window.electron.on('update-model-info', (event, modelInfo) => {
        this.modelInfo = modelInfo;
      });
    }
  };
  </script>
  