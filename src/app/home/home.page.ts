import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {NativePageTransitions, NativeTransitionOptions} from '@ionic-native/native-page-transitions/ngx';
import {TasksService, Task} from '../service/tasks.service';
import {Storage} from '@ionic/storage';
import {FCM} from '@ionic-native/fcm/ngx';
import {HttpClient} from '@angular/common/http';
import {trigger} from '@angular/animations';
import {NotificationService} from '../service/notification.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public tasks: Task[];
  private taskKey = this.tasksService.getTaskKey()

  constructor(private router: Router, private nativePageTransitions: NativePageTransitions,
              private tasksService: TasksService,
              private notificationService: NotificationService,
              private storage: Storage,
              private fcm: FCM,
              private httpClient: HttpClient) {

    storage.get(this.taskKey).then((tasks) => {
      this.tasks = tasks;
      tasksService.tasks = this.tasks;
      console.log('конструктор home')
      this.routeEvent(this.router);
    });
    // firebase
    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        console.log('Received in background');
      } else {
        console.log('Received in foreground');
      }
      ;
    });
  }

  routeEvent(router: Router) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        console.log('функция routeEvent', e);
        this.storage.get('my_task').then((tasks) => {
          this.tasks = tasks;
        });
      }
    });
  }

  loadTask() {
    this.tasksService.getItem().then((tasks) => {
        this.tasks = tasks;
        console.log('функция loadTask home page', 'load');
      }
    );
  }


  transition() {
    const options: NativeTransitionOptions = {
      direction: 'left',
      duration: 300,
    };
    this.nativePageTransitions.slide(options);
    this.router.navigateByUrl('/add-task');
  }

  ngOnInit() {
    document.addEventListener('backbutton', () => {
      navigator['app'].exitApp();
    }, false);
    this.notificationService.trigerEvent()
    ////////////////////получение токена устройства
    this.fcm.getToken().then(token => {
      console.log('token', token);
    });
  }

  close() {
    navigator['app'].exitApp();
  }

// отправка токена на сервер
//   sendingToken(){
//     let data = {
//       "name" : "Stas",
//       "age" : "32"
//     }
//     this.httpClient.post('http://localhost:5000/token', data,
//       {headers : new HttpHeaders({"content-type":"application/json"})})
//       .subscribe(data=>{
//         console.log('токен')
//       })
//   }

}
