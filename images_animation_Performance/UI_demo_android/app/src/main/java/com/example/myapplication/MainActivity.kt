package com.example.myapplication

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView


class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val adapter = PerformanceAdapter(this)
        val layoutManager = GridLayoutManager(this, 10)
        var recyclerView = findViewById<RecyclerView>(R.id.rvView)
        recyclerView.setLayoutManager(layoutManager)
        recyclerView.setHasFixedSize(true)
        recyclerView.setAdapter(adapter)
    }
}
