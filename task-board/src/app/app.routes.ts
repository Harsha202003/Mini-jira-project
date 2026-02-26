import { Routes } from '@angular/router';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';

export const routes: Routes = [
  { path: '', component: KanbanBoardComponent },
  { path: 'todo', component: KanbanBoardComponent },
  { path: 'inprogress', component: KanbanBoardComponent },
  { path: 'done', component: KanbanBoardComponent }
];