import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit {

  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  // 🔄 Load all tasks from backend
  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.todo = tasks.filter(t => t.status === 'TODO');
      this.inProgress = tasks.filter(t => t.status === 'IN_PROGRESS');
      this.done = tasks.filter(t => t.status === 'DONE');
    });
  }

  // 🎯 Drag & Drop Method
  drop(event: CdkDragDrop<Task[]>, status: 'TODO' | 'IN_PROGRESS' | 'DONE') {

    if (event.previousContainer === event.container) return;

    const task = event.previousContainer.data[event.previousIndex];
    task.status = status;

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    this.taskService.updateTask(task)
      .subscribe(() => this.loadTasks());
  }

  // 📊 Dashboard Counters
  get todoCount(): number {
    return this.todo.length;
  }

  get inProgressCount(): number {
    return this.inProgress.length;
  }

  get doneCount(): number {
    return this.done.length;
  }

  // 📝 Open Add/Edit Dialog
  openDialog(task?: Task): void {

    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: task ? { ...task } : {
        title: '',
        description: '',
        status: 'TODO',
        assignee: '',
        priority: 'MEDIUM',
        dueDate: null
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        // Remove empty date before sending
        if (!result.dueDate) {
          delete result.dueDate;
        }

        if (result.id) {
          this.taskService.updateTask(result)
            .subscribe(() => this.loadTasks());
        } else {
          this.taskService.createTask(result)
            .subscribe(() => this.loadTasks());
        }
      }
    });
  }
  changeStatus(task: Task,
    newStatus: 'TODO' | 'IN_PROGRESS' | 'DONE',
    event: Event): void {

    event.stopPropagation();

    task.status = newStatus;

    this.taskService.updateTask(task)
      .subscribe(() => this.loadTasks());
  }

  // 🗑️ Delete a task
  deleteTask(task: Task, event: MouseEvent): void {
    event.stopPropagation();

    if (!task.id) return;

    if (confirm('Delete this task?')) {
      this.taskService.deleteTask(task.id).subscribe(() => {
        this.loadTasks();
      });
    }
  }

}
