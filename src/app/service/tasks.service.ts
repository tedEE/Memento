import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {BehaviorSubject, Subject, Subscription, ReplaySubject} from 'rxjs';

export interface Task {
  id: number,
  location: string,
  hint?: string,
  date?: any,
  status : number
}

const TASK_KEY = 'my_task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  // public  arr$ : any
  public tasks: Task[] = [];
  public task: Task[];
  public striamTask$ : ReplaySubject<number> = new ReplaySubject<number>()
  sub : Subscription
  counter = 0

  constructor(private storage: Storage) {
    this.sub = this.striamTask$.subscribe((val)=>{
      console.log(val)
    })
    this.getItem().then((items) => {
        this.tasks = items;
      }
    );
  }

  //test subject
  next(){
    this.counter ++
    this.striamTask$.next(this.counter)
  }

  //Create
  addItem(item: Task): Promise<any> {
    return this.storage.get(TASK_KEY).then((items: Task[]) => {
      if (items) {
        items.push(item);
        return this.storage.set(TASK_KEY, items);
      } else {
        return this.storage.set(TASK_KEY, [item]);
      }
    })
  }

// Read
  getItem(): Promise<Task[]> {
    return this.storage.get(TASK_KEY);
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
  deleteItem(id: number): Promise<Task> {
    return this.storage.get(TASK_KEY).then((items: Task[]) => {
      if (!items || items.length === 0) {
        return null;
      }
      let toKeep: Task[] = [];
      for (let i of items) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(TASK_KEY, toKeep);
    });
  }

  getTaskKey() {
    return TASK_KEY;
  }

///////////////////////////////


  getTaskById(id: number) {
    this.task = this.tasks.filter((item) => {
      return item.id === id;
    });
  }

  getTaskList() {
    this.getItem().then((items) => {
        this.tasks = items;
        console.log('get task list', this.tasks);
      }
    );
  }


}
