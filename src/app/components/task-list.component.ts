import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Task, TaskFilters, TaskSort } from '../models/task.model';
import { 
  updateTask, 
  deleteTask, 
  setFilter, 
  setSort,
  loadTasks 
} from '../store/task.actions';
import { 
  selectFilteredTasks, 
  selectTasksLoading, 
  selectTaskFilters, 
  selectTaskSort 
} from '../store/task.selectors';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  private store = inject(Store);

  tasks$: Observable<Task[]>;
  loading$: Observable<boolean>;
  filters$: Observable<TaskFilters>;
  sort$: Observable<TaskSort>;

  categories = ['Work', 'Personal', 'Shopping', 'Health', 'Other'];
  priorities = ['low', 'medium', 'high'];

  constructor() {
    this.tasks$ = this.store.select(selectFilteredTasks);
    this.loading$ = this.store.select(selectTasksLoading);
    this.filters$ = this.store.select(selectTaskFilters);
    this.sort$ = this.store.select(selectTaskSort);
  }

  ngOnInit(): void {
    this.store.dispatch(loadTasks());
  }

  toggleComplete(task: Task): void {
    const updatedTask = { ...task, completed: !task.completed };
    this.store.dispatch(updateTask({ task: updatedTask }));
  }

  onDeleteTask(id: string): void {
    if (id) {
      this.store.dispatch(deleteTask({ id }));
    }
  }

  onFilterChange(filters: Partial<TaskFilters>): void {
    this.store.dispatch(setFilter({ filters }));
  }

  onSortChange(field: keyof Task): void {
    this.store.dispatch(setSort({ sort: { field, direction: 'asc' } }));
  }

  clearFilters(): void {
    this.store.dispatch(setFilter({ filters: {} }));
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high': return 'warn';
      case 'medium': return 'accent';
      case 'low': return 'primary';
      default: return 'primary';
    }
  }
}