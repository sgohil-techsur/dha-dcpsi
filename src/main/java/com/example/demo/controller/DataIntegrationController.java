package com.example.demo.controller;

import com.example.demo.model.DataIntegrationTask;
import com.example.demo.repository.DataIntegrationTaskRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/data-integration")
public class DataIntegrationController {

    private final DataIntegrationTaskRepository taskRepository;

    public DataIntegrationController(DataIntegrationTaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping("/status")
    public String getStatus() {
        return "Data Integration Service is running.";
    }

    @GetMapping("/tasks")
    public List<DataIntegrationTask> getAllTasks() {
        return taskRepository.findAll();
    }

    // Additional endpoints can be added here for tasks monitoring, lineage visualization, etc.
}
