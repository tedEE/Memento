import {Component, DoCheck, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit, DoCheck, OnChanges {


  constructor() {
    console.log('constructor test')
  }

  ngOnInit() {
    console.log('ngOnInit test')
  }

  ngDoCheck(){
    console.log('ngDoCheck test')
  }

  ngOnChanges(){
    console.log('OnChanges')
  }

}
