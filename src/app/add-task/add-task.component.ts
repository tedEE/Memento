import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NativePageTransitions, NativeTransitionOptions} from '@ionic-native/native-page-transitions/ngx';
import {Router} from '@angular/router';
import {HTTP} from '@ionic-native/http/ngx';
import {Subject} from 'rxjs';

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
              private http: HTTP) {}

  ngOnInit() {
    document.addEventListener('backbutton', () => {
      this.transitionHome();
    }, false);
  }

  next(){
    // this.tasksService.next()
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
        this.tasksService.striamTask$.next(this.task)
        // this.tasksService.tasks = tasks;
        console.log('add task', tasks);
        console.log('this.tasksService.tasks', this.tasksService.tasks);
        // this.tasksService.next()
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

  testCheck(){
    this.notificationServise.testCheck = !this.notificationServise.testCheck
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
