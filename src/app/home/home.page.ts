import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NativePageTransitions, NativeTransitionOptions} from '@ionic-native/native-page-transitions/ngx';
import {TasksService, ITask} from '../service/tasks.service';
import {Storage} from '@ionic/storage';
import {FCM} from '@ionic-native/fcm/ngx';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../service/notification.service';
import {Platform} from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public tasks: ITask[];
  private taskKey = this.tasksService.getTaskKey()


  constructor(private router: Router,
              private routerActivated : ActivatedRoute,
              private nativePageTransitions: NativePageTransitions,
              private tasksService: TasksService,
              private notificationService: NotificationService,
              private storage: Storage,
              private fcm: FCM,
              private plt : Platform,
              private httpClient: HttpClient) {
    this.tasksService.loadTask()
    // this.plt.ready().then(()=>{
    //   this.notificationService.trigerEvent()
    // })
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

  // routeEvent(router: Router) {
  //   router.events.subscribe(e => {
  //     if (e instanceof NavigationEnd) {
  //       console.log('функция routeEvent', e);
  //       this.storage.get(this.tasksService.getTaskKey()).then((tasks) => {
  //         this.tasks = tasks;
  //       });
  //     }
  //   });
  // }

  transition() {
    const options: NativeTransitionOptions = {
      direction: 'left',
      duration: 500,
      androiddelay: 150,
    };
    this.nativePageTransitions.slide(options);
    this.router.navigateByUrl('/add-task');
  }

  ngOnInit() {
    this.backButtonEvent()
    // document.addEventListener('backbutton', () => {
    //   navigator['app'].exitApp();
    // }, false);
    // this.notificationService.trigerEvent()
    ////////////////////получение токена устройства
    this.fcm.getToken().then(token => {
      console.log('token', token);
    });
  }

  close() {
    navigator['app'].exitApp();
  }

  backButtonEvent() {
  this.plt.backButton.subscribe(async () => {
    this.close()
    console.log(this.routerActivated)
    // this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
    //   if (this.router.url == '/login') {
    //     if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
    //       navigator['app'].exitApp()
    //     } else {
    //       let toast = this.toastCtrl.create({
    //         message: "Click to exit the application!",
    //         duration: 2000,
    //         position: 'bottom'
    //       })
    //       toast.then(toast => toast.present())
    //       this.lastTimeBackPress = new Date().getTime()
    //     }
    //   } else  {
    //     outlet.pop()
    //     window.history.back()
    //   }
    // })
  })
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
