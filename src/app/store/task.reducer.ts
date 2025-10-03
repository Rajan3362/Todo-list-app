import { createReducer, on } from '@ngrx/store';
import { Task, TaskFilters, TaskSort } from '../models/task.model';
import * as TaskActions from './task.actions';

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filters: TaskFilters;
  sort: TaskSort;
}

export const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  filters: {},
  sort: { field: 'createdAt', direction: 'desc' }
};

export const taskReducer = createReducer(
  initialState,
  
  on(TaskActions.loadTasks, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    loading: false
  })),
  on(TaskActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  
  on(TaskActions.addTask, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TaskActions.addTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
    loading: false
  })),
  on(TaskActions.addTaskFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  
  on(TaskActions.updateTask, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TaskActions.updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => t.id === task.id ? task : t),
    loading: false
  })),
  on(TaskActions.updateTaskFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  
  on(TaskActions.deleteTask, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TaskActions.deleteTaskSuccess, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter(t => t.id !== id),
    loading: false
  })),
  on(TaskActions.deleteTaskFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  
  on(TaskActions.setFilter, (state, { filters }) => ({
    ...state,
    filters
  })),
  on(TaskActions.setSort, (state, { sort }) => ({
    ...state,
    sort
  }))
);