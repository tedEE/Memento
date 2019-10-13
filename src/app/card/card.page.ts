import {Component, OnInit} from '@angular/core';
import {Task} from '../service/tasks.service';
import {NativeTransitionOptions, NativePageTransitions} from '@ionic-native/native-page-transitions/ngx';
import {Router} from '@angular/router';
import {TasksService} from '../service/tasks.service';
import {NotificationService} from '../service/notification.service';
import {Store} from '@ngrx/store';


@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {

  // public task: Task;
  public tasks : Task[];
  private notificationList


  constructor(private nativePageTransitions: NativePageTransitions,
              private router: Router,
              private notificationService: NotificationService,
              private taskServise : TasksService,
              private store : Store<Task[]>) {}

  ngOnInit(): void {
    this.store.select('taskReduser').subscribe(({tasks}) => {
      console.log(tasks)
      this.tasks = tasks
    })
    this.notificationList = this.notificationService.notificationList
  }

  transitionHome() {
    const options: NativeTransitionOptions = {
      direction: 'left',
      duration: 300,
    };
    this.nativePageTransitions.slide(options);
    this.router.navigateByUrl('/home');
  }

  next(){
  }

}
