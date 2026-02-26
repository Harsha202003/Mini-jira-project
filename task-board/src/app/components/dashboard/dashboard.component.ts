import { Component, Input } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-dashboard',
  template: `
    <div>
      <h3>Dashboard</h3>
      <p>To Do: {{count('TODO')}}</p>
      <p>In Progress: {{count('IN_PROGRESS')}}</p>
      <p>Done: {{count('DONE')}}</p>
    </div>
  `
})
export class DashboardComponent {

  @Input() tasks: Task[] = [];

  count(status: string): number {
    return this.tasks.filter(t => t.status === status).length;
  }
}