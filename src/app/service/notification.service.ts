import {Injectable, OnInit} from '@angular/core';
import {ITask} from './tasks.service';
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

export interface INotification {
  id: number,
  title : string,
  text?: string,
  status? : any
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends Db implements OnInit {
  private notification: INotification

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
  addNotification(task: ITask) {
    let thirtyMinute = 30 * 60000,
      hour = thirtyMinute * 2,
      threeHours = hour * 3,
      eightHours = hour * 8,
      day = hour * 24,
      threeDay = day * 3,
      week = day * 7,
      month = day * 30;

    // @ts-ignore
    cordova.plugins.notification.local.schedule([
      this.createNotificationSeting(task, 1, thirtyMinute, '30 минут'),
      this.createNotificationSeting(task, 2, hour , '1 час'),
      this.createNotificationSeting(task, 3, threeHours, '3 часа'),
      this.createNotificationSeting(task, 4, eightHours, '8 часов'),
      this.createNotificationSeting(task, 5, day, '24 часа'),
      this.createNotificationSeting(task, 6, threeDay, '3 дня'),
      this.createNotificationSeting(task, 6, week, 'неделя'),
      this.createNotificationSeting(task, 6, month, 'месяц'),
    ]);
  }

  // создание времменных уведомлений для тестирования
  testcreateNotification(task: ITask) {
    let oneMinute = 60000,
      twoMinute = oneMinute * 2
    // @ts-ignore
    cordova.plugins.notification.local.schedule([
      this.createNotificationSeting(task, 1, oneMinute, '1 минута'),
      this.createNotificationSeting(task, 2, twoMinute, '2 минуты'),
    ]);
  }

  createNotification(task: ITask) {
    console.log(this.testCheck)
    if (this.testCheck) {
      this.testcreateNotification(task)
    } else {
      this.addNotification(task)
    }
  }

  createNotificationSeting(task: ITask, id: number, trigerTime : number, text : string) {
    return {
      id: task.id + id,
      title: task.location,
      text: `${text}`,
      attachments: ['file://img/rb-leipzig.jpg'],
      foreground: true,
      // trigger: {in: trigerNumber, unit: trigerString},
      trigger: { at: new Date(task.id + trigerTime) },
      wakeup : true
    }
  }

  trigerEvent() {
    // @ts-ignore
    cordova.plugins.notification.local.on("trigger", (notification, state) => {
      console.log(state)
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

  clearNotification(task: ITask) {
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
  getNotification(): Promise<INotification[]> {
    return super.getElem(DB_KEY);
  }

  //Delete
  deleteNotification(notification: INotification): Promise<INotification> {
    this.store.dispatch(new DeleteNotification(notification))
    return super.deleteElem(notification.id, DB_KEY)
  }

  //Create
  add(notification: INotification): Promise<INotification> {
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
