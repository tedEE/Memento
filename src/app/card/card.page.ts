import {Component, OnInit} from '@angular/core';
import {ITask} from '../service/tasks.service';
import {NativeTransitionOptions, NativePageTransitions} from '@ionic-native/native-page-transitions/ngx';
import {Router,ActivatedRoute} from '@angular/router';
import {TasksService} from '../service/tasks.service';
import {INotification, NotificationService} from '../service/notification.service';
import {Store} from '@ngrx/store';
import {Platform} from '@ionic/angular';


@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {

  // public task: Task;
  public tasks : INotification[];
  private taskForId : ITask


  constructor(private nativePageTransitions: NativePageTransitions,
              private router: Router,
              private routerActivated : ActivatedRoute,
              private taskServise : TasksService,
              private plt : Platform,
              private store : Store<ITask[]>) {}

  ngOnInit(): void {
    // this.store.select('taskReduser').subscribe(({notifications}) => {
    //   console.log(notifications)
    //   this.tasks = notifications
    // })
    this.backButtonEvent()
    this.taskForId = this.taskServise.taskForId
    console.log(this.taskForId)
  }

  transitionHome() {
    const options: NativeTransitionOptions = {
      direction: 'left',
      duration: 300,
    };
    this.nativePageTransitions.slide(options);
    this.router.navigateByUrl('/home');
  }

  backButtonEvent() {
    // this.plt.backButton.subscribe(async () => {
    //   console.log(this.routerActivated)
    //   // this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
    //   //   if (this.router.url == '/login') {
    //   //     if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
    //   //       navigator['app'].exitApp()
    //   //     } else {
    //   //       let toast = this.toastCtrl.create({
    //   //         message: "Click to exit the application!",
    //   //         duration: 2000,
    //   //         position: 'bottom'
    //   //       })
    //   //       toast.then(toast => toast.present())
    //   //       this.lastTimeBackPress = new Date().getTime()
    //   //     }
    //   //   } else  {
    //   //     outlet.pop()
    //   //     window.history.back()
    //   //   }
    //   // })
    // })
  }
}
