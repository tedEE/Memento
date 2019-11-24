import {Component, OnInit} from '@angular/core';
import {NativeTransitionOptions, NativePageTransitions,} from '@ionic-native/native-page-transitions/ngx';
import {Router} from '@angular/router';

import {TasksService, ITask, AppState} from '../../service/tasks.service';
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
  tasksList: ITask[];
  chosenItem : number

  constructor(private router: Router,
              private nativePageTransitions: NativePageTransitions,
              private tasksService: TasksService,
              private store: Store<AppState>,
              private notificationServise: NotificationService) {
  }

  ngOnInit() {
    this.store.select('taskReduser').subscribe(({tasks}) => {
      console.log(tasks);
      this.tasksList = tasks;
    });
  }

  delete(task: ITask) {
    this.store.dispatch(new DeleteTask(task));
    this.notificationServise.clearNotification(task);
    this.tasksService.deleteItem(task.id).then(t => {
    });
  }

  showDetailis(id) {
    this.chosenItem = id

  }

  closeDetails(){
    this.chosenItem = 0
  }

  showCard(id: number) {
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 300,
    };
    this.nativePageTransitions.slide(options);
    this.router.navigateByUrl('/card');

    this.tasksService.getTaskById(id, this.tasksList);
  }

  testswipe(){
    console.log('swipe left')
  }

  update(item: ITask) {
    // this.tasksService.updateItem(item).then((e)=>{
    //   console.log(e)
    // })
  }
}
