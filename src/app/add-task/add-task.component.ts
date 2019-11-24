import {Component,  OnInit, } from '@angular/core';
import {NativePageTransitions, NativeTransitionOptions} from '@ionic-native/native-page-transitions/ngx';
import {Router} from '@angular/router';
import {HTTP} from '@ionic-native/http/ngx';

import {TasksService, ITask} from '../service/tasks.service';
import {NotificationService} from '../service/notification.service';
import {Store} from '@ngrx/store';
import {AddTask} from '../store/action/task.action';
import {NotiificationFactory} from '../service/NotiificationFactory';

/////////////////////


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {

  public tasks: ITask[];
  private task: ITask;
  private id: number;
  /////////////
  // private testVal = new NotiificationFactory(this.task)

  constructor(private router: Router,
              private nativePageTransitions: NativePageTransitions,
              private tasksService: TasksService,
              private notificationServise : NotificationService,
              private http: HTTP,
              private store : Store<any>) {}

  ngOnInit() {
    document.addEventListener('backbutton', () => {

    }, true);
  }

  next(){
    // this.tasksService.next()
  }

  transitionHome() {
    const options: NativeTransitionOptions = {
      direction: 'right',
      duration: 500,
      androiddelay: 150,
    };
    this.nativePageTransitions.slide(options);
    this.router.navigateByUrl('/home');
  }

  addTimeNatification(task : ITask) {
    this.notificationServise.createNotification(task)
  }

  createTask(lok, hint) {
    // const date = new Date().getHours() + ' h ' + new Date().getMinutes() + ' m';
    const date = new Date();
    this.id = Number(new Date());
    if (lok.value.trim() && hint.value.trim()) {
      this.task = {
        id: this.id,
        location: lok.value,
        hint: hint.value,
        date: date,
        status : 1
      };
      // this.store.dispatch(new AddTask(this.task))

      this.tasksService.addTask(this.task).then((tasks) => {
        console.log('add task', tasks);
        console.log('this.tasksService.tasks', this.tasksService.tasks);
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

  addTask(lok, hint) {
    // console.log(this.testVal, 'task')
    // this.inputLok.nativeElement.focus()
    this.createTask(lok, hint);
    this.addTimeNatification(this.task);
  }


}
