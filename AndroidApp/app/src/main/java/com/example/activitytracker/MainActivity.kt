package com.example.activitytracker

import android.os.Bundle
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import okhttp3.OkHttpClient
import okhttp3.Request

class MainActivity : AppCompatActivity() {
    private val taskViewModel: TaskViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val webSocketListener = WebSocketListener(taskViewModel)
        val client = OkHttpClient()
        val request = Request.Builder().url("ws://your-backend-server-url/ws").build()
        val webSocket = client.newWebSocket(request, webSocketListener)

        taskViewModel.tasks.observe(this, Observer { tasks ->
            // Update your UI here with the tasks list
        })
    }
}
