import {Component, Input, OnInit} from '@angular/core';
import {NativeTransitionOptions, NativePageTransitions,} from '@ionic-native/native-page-transitions/ngx';
import {Router} from '@angular/router';

import {TasksService, Task} from '../../service/tasks.service';
import {NotificationService} from '../../service/notification.service';
import {filter, last, scan, skip, take} from 'rxjs/operators';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})


export class ListComponent implements OnInit {

  @Input() tasks;

  tasksList : Task[] = []
  public t ;
  private task : Task ;
  constructor(private router: Router,
              private nativePageTransitions: NativePageTransitions,
              private tasksService : TasksService,
              private notificationServise : NotificationService) {
    // this.tasksService.gettingAllTasksFromDB()
  }

  ngOnInit() {}

  delete(task : Task){
    this.notificationServise.clearNotification(task)
    this.tasksService.deleteItem(task.id).then(t =>{
      console.log('del', t)
      this.loadTask()
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

  loadTask(){
    this.tasksService.getTask().then((tasks)=> {
        this.tasks = tasks
      }
    )
  }

  // load() {
  //   this.tasksService.test$.next(1)
  // }

}
