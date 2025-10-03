import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import * as TaskActions from './task.actions';
import { TaskService } from '../services/task.service';

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions);
  private taskService = inject(TaskService);

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          map(tasks => TaskActions.loadTasksSuccess({ tasks })),
          catchError(error => of(TaskActions.loadTasksFailure({ error: error.message })))
        )
      )
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.addTask),
      exhaustMap(({ task }) =>
        this.taskService.addTask(task).then(
          newTask => TaskActions.addTaskSuccess({ task: newTask }),
          error => TaskActions.addTaskFailure({ error: error.message })
        )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTask),
      exhaustMap(({ task }) =>
        this.taskService.updateTask(task).then(
          updatedTask => TaskActions.updateTaskSuccess({ task: updatedTask }),
          error => TaskActions.updateTaskFailure({ error: error.message })
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      exhaustMap(({ id }) =>
        this.taskService.deleteTask(id).then(
          () => TaskActions.deleteTaskSuccess({ id }),
          error => TaskActions.deleteTaskFailure({ error: error.message })
        )
      )
    )
  );
}