import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectAllTasks = createSelector(
  selectTaskState,
  (state) => state.tasks
);

export const selectTasksLoading = createSelector(
  selectTaskState,
  (state) => state.loading
);

export const selectTasksError = createSelector(
  selectTaskState,
  (state) => state.error
);

export const selectTaskFilters = createSelector(
  selectTaskState,
  (state) => state.filters
);

export const selectTaskSort = createSelector(
  selectTaskState,
  (state) => state.sort
);

export const selectFilteredTasks = createSelector(
  selectAllTasks,
  selectTaskFilters,
  selectTaskSort,
  (tasks, filters, sort) => {
    let filtered = tasks.filter(task => {
      if (filters.category && task.category !== filters.category) return false;
      if (filters.completed !== undefined && task.completed !== filters.completed) return false;
      if (filters.priority && task.priority !== filters.priority) return false;
      return true;
    });

    filtered.sort((a, b) => {
      const aValue = a[sort.field];
      const bValue = b[sort.field];
      
      if (aValue === undefined || bValue === undefined) return 0;
      
      if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }
);