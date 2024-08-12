package com.example.activitytracker

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class TaskViewModel : ViewModel() {
    private val _tasks = MutableLiveData<List<Task>>()
    val tasks: LiveData<List<Task>> = _tasks

    fun updateTasks(newTasks: List<Task>) {
        _tasks.value = newTasks
    }
}

data class Task(
    val title: String,
    val duration: Int,
    val timestamp: Long
)
