import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private api = 'http://localhost:8081/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.api);
  }

  createTask(task: Task) {
    return this.http.post<Task>(this.api, task);
  }

  updateTask(task: Task) {
    return this.http.put<Task>(`${this.api}/${task.id}`, task);
  }

  deleteTask(id: number) {
    return this.http.delete(`http://localhost:8081/tasks/${id}`);
  }
}