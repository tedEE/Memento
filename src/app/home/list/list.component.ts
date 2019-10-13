import {Component, OnInit} from '@angular/core';
import {NativeTransitionOptions, NativePageTransitions,} from '@ionic-native/native-page-transitions/ngx';
import {Router} from '@angular/router';

import {TasksService, Task, AppState} from '../../service/tasks.service';
import {NotificationService} from '../../service/notification.service';
import {Store} from '@ngrx/store';
import {DeleteTask} from '../../store/action/task.action';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})


export class ListComponent implements OnInit {

  // @Input() tasks;

  tasksList : Task[]
  constructor(private router: Router,
              private nativePageTransitions: NativePageTransitions,
              private tasksService : TasksService,
              private store : Store<AppState>,
              private notificationServise : NotificationService) {}

  ngOnInit() {
    this.store.select('taskReduser').subscribe(({tasks}) => {
      this.tasksList = tasks
    })
  }

  delete(task : Task){
    this.store.dispatch(new DeleteTask(task))
    this.notificationServise.clearNotification(task)
    this.tasksService.deleteItem(task.id).then(t =>{
      console.log('del', t)
    })
  }

  showCard(id : number){
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 300,
    };
    this.nativePageTransitions.slide(options);
    this.router.navigateByUrl('/card');
  }
}
