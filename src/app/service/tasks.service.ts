import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

import {DbService} from './db.service';
import {Store} from '@ngrx/store';
import {AddTask, LoadTasks} from '../store/action/task.action';
import {Notification} from './notification.service';
import {Db} from './Db';

export interface AppState {
  TaskState: {
    tasks: Task[],
    notifications : Notification[]
  }
}

export interface Task {
  id: number,
  location: string,
  hint?: string,
  date?: any,
  status: number
}

const TASK_KEY = 'my_task';

@Injectable({
  providedIn: 'root'
})
export class TasksService extends Db{

  public tasks: Task[] = [];
  public task: Task[];

  constructor(protected storage: Storage,
              private store : Store<any>) {
    super(storage)
  }

  //Create
  // addTask(task: Task): Promise<any> {
  //   this.store.dispatch(new AddTask(task))
  //   return this.dbService.addElem(task, TASK_KEY);
  // }

  addTask(task: Task): Promise<any> {
    this.store.dispatch(new AddTask(task))
    return super.addElem(task, TASK_KEY)
  }

// Read
//   getTask(): Promise<Task[]> {
//     return this.dbService.getElem(TASK_KEY);
//   }

  getTask(): Promise<Task[]> {
    return super.getElem(TASK_KEY);
  }

  //Update
  updateItem(item: Task): Promise<any> {
    return this.storage.get(TASK_KEY).then((items: Task[]) => {
      if (!items || items.length === 0) {
        return null;
      }
      let neIitems: Task[] = [];
      for (let i of items) {
        if (i.id === item.id) {
          neIitems.push(i);
        }
      }
      return this.storage.set(TASK_KEY, neIitems);
    });
  }

  //Delete
  // deleteItem(id: number): Promise<Task> {
  //   return this.dbService.deleteElem(id, TASK_KEY);
  // }

  deleteItem(id: number): Promise<Task> {
    return super.deleteElem(id, TASK_KEY);
  }

  // получение списка задач из базы
  loadTask(){
    this.getTask().then(payload => {
      this.store.dispatch(new LoadTasks(payload))
    })
  }

  getTaskKey() {
    return TASK_KEY;
  }

///////////////////////////////


  // getTaskById(id: number) {
  //   this.task = this.tasks.filter((item) => {
  //     return item.id === id;
  //   });
  // }

  // getTaskList() {
  //   this.getItem().then((items) => {
  //       this.tasks = items;
  //       console.log('get task list', this.tasks);
  //     }
  //   );
  // }
}
