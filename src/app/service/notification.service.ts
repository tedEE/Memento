import { Injectable } from '@angular/core';
import {HTTP} from '@ionic-native/http/ngx';
import {Task} from './tasks.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  createNotification(task : Task){
    // @ts-ignore
    cordova.plugins.notification.local.schedule([
      // this.createNotificationSeting(task,1, 1, 'minute'),
      // this.createNotificationSeting(task,2, 2, 'minute'),
      this.createNotificationSeting(task,1, 30, 'minute'),
      this.createNotificationSeting(task,2, 1, 'hour'),
      this.createNotificationSeting(task,3, 3, 'hour'),
      this.createNotificationSeting(task,4, 8, 'hour'),
      this.createNotificationSeting(task,5, 24, 'hour'),
      this.createNotificationSeting(task,6, 3, 'day'),
    ]);
  }

  createNotificationSeting(task : Task, id : number, trigerNumber : number, trigerString : string) {
    return {
      id: task.id + id,
      title: task.location,
      text: `${trigerNumber} ${trigerString}`,
      foreground: true,
      trigger: {in: trigerNumber, unit: trigerString }
    }
  }

  clearNotification(task : Task){
    // количество итераций захардкоженно временно оно равно
    // вызову createNotificationSeting
    for (let i = 1; i <= 6; i++) {
      // @ts-ignore
      cordova.plugins.notification.local.clear(task.id + i, function() {
        console.log(`done ${task.location} `);
      });
    }
  }
}
