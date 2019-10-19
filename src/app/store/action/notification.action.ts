import {Action} from '@ngrx/store';


export namespace NOTIFICATION_ACTION {
  export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
  export const LOAD_NOTIFICATION= 'LOAD_NOTIFICATION'
  export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION'
}

export class AddNotification implements Action{
  readonly type: string = NOTIFICATION_ACTION.ADD_NOTIFICATION
  constructor(public payload ){}
}

export class LoadNotification implements Action{
  readonly type : string = NOTIFICATION_ACTION.LOAD_NOTIFICATION
  constructor(public payload ){}
}

export class DeleteNotification implements Action{
  readonly type : string = NOTIFICATION_ACTION.DELETE_NOTIFICATION
  constructor(public payload ){}
}

// export type TaskAction = LoadTasks | AddTask | DeleteTask
