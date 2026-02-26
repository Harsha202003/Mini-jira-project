import { Component, Input } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-card',
  template: `
    <div class="card">
      <h4>{{task.title}}</h4>
      <p>{{task.description}}</p>
      <small>{{task.priority}}</small>
    </div>
  `
})
export class TaskCardComponent {
  @Input() task!: Task;
}