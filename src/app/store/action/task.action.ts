import {Action} from '@ngrx/store';
import {ITask} from '../../service/tasks.service';

export namespace TASK_ACTION {
  export const ADD_TASK = 'ADD_TASK'
  export const LOAD_TASKS = 'LOAD_TASKS'
  export const DELETE_TASK = 'DELETE_TASK'
}

export class AddTask implements Action{
  readonly type: string = TASK_ACTION.ADD_TASK ;
  constructor(public payload : ITask){}
}

export class LoadTasks implements Action{
  readonly type : string = TASK_ACTION.LOAD_TASKS
  constructor(public payload : ITask[]){}
}

export class DeleteTask implements Action{
  readonly type : string = TASK_ACTION.DELETE_TASK
  constructor(public payload : ITask){}
}

export type TaskAction = LoadTasks | AddTask | DeleteTask

