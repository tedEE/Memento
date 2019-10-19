import {Injectable, OnInit} from '@angular/core';
import {Task} from './tasks.service';
import {Store} from '@ngrx/store';
import {AddNotification, DeleteNotification, LoadNotification} from '../store/action/notification.action';
import {Db} from './Db';
import {Storage} from '@ionic/storage';

// export interface AppState {
//   TaskState: {
//     tasks: Task[],
//     notifications : []
//   }
// }

const DB_KEY = 'notification_tasks_from_db';

export interface Notification {
  id: number,
  title : string,
  text?: string,
  status? : any
}

//id: 1571231547886, title: "тест", text: "2 minute"
// trigger: {in: 1, unit: "minute", type: "calendar"}

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends Db implements OnInit {
  private notification: Notification

  // checkbox уведомление в тестовом режиме
  testCheck = false

  constructor(
    protected storege : Storage,
    private store: Store<any>
  ) {
    super(storege)
  }

  ngOnInit() {
  }

  // Создание постоянных уведомлений
  addNotification(task: Task) {
    // @ts-ignore
    cordova.plugins.notification.local.schedule([
      this.createNotificationSeting(task, 1, 30, 'minute'),
      this.createNotificationSeting(task, 2, 1, 'hour'),
      this.createNotificationSeting(task, 3, 3, 'hour'),
      this.createNotificationSeting(task, 4, 8, 'hour'),
      this.createNotificationSeting(task, 5, 24, 'hour'),
      this.createNotificationSeting(task, 6, 3, 'day'),
    ]);
  }

  // создание времменных уведомлений для тестирования
  testcreateNotification(task: Task) {
    // @ts-ignore
    cordova.plugins.notification.local.schedule([
      this.createNotificationSeting(task, 1, 1, 'minute'),
      this.createNotificationSeting(task, 2, 2, 'minute'),
    ]);
  }

  createNotification(task: Task) {
    console.log(this.testCheck)
    if (this.testCheck) {
      this.testcreateNotification(task)
    } else {
      this.addNotification(task)
    }
  }

  createNotificationSeting(task: Task, id: number, trigerNumber: number, trigerString: string) {
    return {
      id: task.id + id,
      title: task.location,
      text: `${trigerNumber} ${trigerString}`,
      foreground: true,
      trigger: {in: trigerNumber, unit: trigerString}
    }
  }

  trigerEvent() {
    // @ts-ignore
    cordova.plugins.notification.local.on("trigger", (notification, state) => {
      // this.notificationList.push(notification)
      this.notification = {
        id: notification.id,
        title: notification.title,
        text : notification.text,
      }
      this.add(this.notification).then(e => console.log('e',e))
      // console.log(this.notification)
      // console.log("notification " , notification);
      // console.log('state ',state)
    })
  }

  clearNotification(task: Task) {
    // количество итераций захардкоженно временно оно равно
    // вызову createNotificationSeting
    for (let i = 1; i <= 6; i++) {
      // @ts-ignore
      cordova.plugins.notification.local.clear(task.id + i, function() {
        console.log(`done ${task.location} `);
      });
    }
  }

  // Работа с БД

  // Read
  getNotification(): Promise<Notification[]> {
    return super.getElem(DB_KEY);
  }

  //Delete
  deleteNotification(notification: Notification): Promise<Notification> {
    this.store.dispatch(new DeleteNotification(notification))
    return super.deleteElem(notification.id, DB_KEY)
  }

  //Create
  add(notification: Notification): Promise<Notification> {
    this.store.dispatch(new AddNotification(this.notification))
    console.log('код в add()')
    return super.addElem(notification, DB_KEY);
  }

  loadNotification(){
    this.getNotification().then(payload => {
      this.store.dispatch(new LoadNotification(payload))
    })
  }
}
