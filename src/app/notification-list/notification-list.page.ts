import { Component, OnInit } from '@angular/core';
import {Notification, NotificationService} from '../service/notification.service';
import {Store} from '@ngrx/store';
import {AppState, Task} from '../service/tasks.service';
import {DeleteNotification} from '../store/action/notification.action';
import {DeleteTask} from '../store/action/task.action';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.page.html',
  styleUrls: ['./notification-list.page.scss'],
})
export class NotificationListPage implements OnInit {

  private notifications : Notification []
  constructor(private notificationService : NotificationService,
              private store : Store<AppState>) { }

  ngOnInit() {
    this.notificationService.loadNotification()
    this.store.select('notificationReduser').subscribe(({notifications}) => {
      this.notifications = notifications
      console.log(this.notifications)
    })
  }

  delNotif(notification: Notification){

    this.notificationService.deleteNotification(notification).then(_ => {
      console.log(`уведомление ${notification.id} удалено`)
    })
  }

  // delete(task : Task){
  //   this.store.dispatch(new DeleteTask(task))
  //   this.tasksService.deleteItem(task.id).then(t =>{
  //     console.log('del', t)
  //   })
  // }

}
