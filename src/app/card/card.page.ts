import {Component, OnInit} from '@angular/core';
import {Task} from '../service/tasks.service';
import {NativeTransitionOptions, NativePageTransitions} from '@ionic-native/native-page-transitions/ngx';
import {Router} from '@angular/router';
import {TasksService} from '../service/tasks.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {

  public task: Task;
  constructor(private nativePageTransitions: NativePageTransitions,
              private router: Router,
              private taskServise : TasksService) {
    if (this.taskServise.task[0] === undefined) {
      this.taskServise.getTaskList();
    }
    this.task = this.taskServise.task[0];
  }

  ngOnInit(): void {
    // if (this.cardServise.task[0] === undefined){
    //   this.task = {id : 1, hint : 'def', location : 'def'}
    // }else {this.task = this.cardServise.task[0]}
    // console.log('from card', this.task)
  }

  transitionHome() {
    const options: NativeTransitionOptions = {
      direction: 'left',
      duration: 300,
    };
    this.nativePageTransitions.slide(options);
    this.router.navigateByUrl('/home');
  }

}
