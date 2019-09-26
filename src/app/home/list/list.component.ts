import {Component, Input, OnInit} from '@angular/core';
import {NativeTransitionOptions, NativePageTransitions,} from '@ionic-native/native-page-transitions/ngx';
import {Router} from '@angular/router';

import {TasksService, Task} from '../../service/tasks.service';
import {NotificationService} from '../../service/notification.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})


export class ListComponent implements OnInit {

  @Input() tasks;

  // public tasks : Task[];
  private task : Task ;

  constructor(private router: Router,
              private nativePageTransitions: NativePageTransitions,
              private tasksService : TasksService,
              private notificationServise : NotificationService) {
    console.log('list const')
  }

  ngOnInit() {
    console.log('ng home')
  }

  delete(task : Task){
    this.notificationServise.clearNotification(task)
    this.tasksService.deleteItem(task.id).then(task =>{
      this.loadTask()
    })
  }

  showCard(id : number){
    this.tasksService.getTaskList()
    this.tasksService.getTaskById(id)
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 300,
    };
    this.nativePageTransitions.slide(options);
    this.router.navigateByUrl('/card');
  }

  loadTask(){
    this.tasksService.getItem().then((tasks)=> {
        this.tasks = tasks
      }
    )
  }

  load(){

  }
}
