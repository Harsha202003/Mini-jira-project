package com.harsha.taskmanager.service;

import java.util.*;
import org.springframework.stereotype.Service;
import com.harsha.taskmanager.model.Task;
import com.harsha.taskmanager.exception.TaskNotFoundException;
@Service
public class TaskService {

    private Map<Long, Task> tasks = new HashMap<>();
    private Long idCounter = 1L;

    public List<Task> getAllTasks() {
        return new ArrayList<>(tasks.values());
    }

    public Task createTask(Task task) {
        task.setId(idCounter++);
        tasks.put(task.getId(), task);
        return task;
    }

    public Task updateTask(Long id, Task updatedTask) {
        if (!tasks.containsKey(id)) {
            throw new RuntimeException("Task not found");
        }
        updatedTask.setId(id);
        tasks.put(id, updatedTask);
        return updatedTask;
    }

    public void deleteTask(Long id) {
        tasks.remove(id);
    }
}