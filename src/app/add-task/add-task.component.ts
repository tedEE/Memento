import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NativePageTransitions, NativeTransitionOptions} from '@ionic-native/native-page-transitions/ngx';
import {Router} from '@angular/router';
import {HTTP} from '@ionic-native/http/ngx';

import {TasksService, Task} from '../service/tasks.service';
import {NotificationService} from '../service/notification.service';

/////////////////////


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {

  public tasks: Task[];
  private task: Task;
  private id: number;


  constructor(private router: Router,
              private nativePageTransitions: NativePageTransitions,
              private tasksService: TasksService,
              private notificationServise : NotificationService,
              private http: HTTP) {

  }

  ngOnInit() {
    document.addEventListener('backbutton', () => {
      this.transitionHome();
    }, false);
  }


  transitionHome() {
    const options: NativeTransitionOptions = {
      direction: 'right',
      duration: 500,
    };
    this.nativePageTransitions.slide(options);
    this.router.navigateByUrl('/home');
  }

  addTimeNatification() {
    this.notificationServise.createNotification(this.task)
    // @ts-ignore
    // cordova.plugins.notification.local.schedule([
    //   this.notificationServise.createNotificationSeting(this.task,1, 1, 'minute'),
    //   this.notificationServise.createNotificationSeting(this.task,2, 2, 'minute'),
      // this.notificationServise.createNotificationSeting(this.task,1, 30, 'minute'),
      // this.notificationServise.createNotificationSeting(this.task,2, 1, 'hour'),
      // this.notificationServise.createNotificationSeting(this.task,3, 3, 'hour'),
      // this.notificationServise.createNotificationSeting(this.task,4, 8, 'hour'),
      // this.notificationServise.createNotificationSeting(this.task,5, 24, 'hour'),
      // this.notificationServise.createNotificationSeting(this.task,6, 3, 'day'),
    //]);
  }

  createTask(lok, hint) {
    // const date = new Date().getHours() + ' h ' + new Date().getMinutes() + ' m';
    const date = new Date();
    this.id = Number(new Date());
    // if (lok.value === '') {
    //   return;
    // }
    // if (hint.value === '') {
    //   return;
    // }
    if (lok.value.trim() && hint.value.trim()) {
      this.task = {
        id: this.id,
        location: lok.value,
        hint: hint.value,
        date: date,
        status : 1
      };

      this.tasksService.addItem(this.task).then((tasks) => {
        this.tasksService.tasks = tasks;
        console.log('add task', tasks);
      });
      lok.value = '';
      hint.value = '';
    }
  }

  addTimeNatificationServer() {
    this.http.post('http://192.168.0.103/post', this.task, {'application': 'json'})
    // this.http.post('http://127.0.0.1/post',this.task, {"application" : "json"})
      .then((res) => console.log(res))
      .catch(error => console.log(error));
  }

  // loadTask() {
  //   this.tasksService.getItem().then((tasks) => {
  //       this.tasksService.tasks = tasks;
  //     }
  //   );
  // }

  addTask(lok, hint) {
    // console.log('конструктор', this.inputLok)
    // this.inputLok.nativeElement.focus()
    this.createTask(lok, hint);
    this.addTimeNatification();
  }


}
