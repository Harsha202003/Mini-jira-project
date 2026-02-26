import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } 
from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './task-dialog.component.html'
})
export class TaskDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<any>,   // 🔥 use <any> to avoid injection issue
    @Inject(MAT_DIALOG_DATA) public task: any
  ) {}

  save() {
    this.dialogRef.close(this.task);
  }

  close() {
    this.dialogRef.close();
  }
}