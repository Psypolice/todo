import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css'
})
export class StatCardComponent implements OnInit {

  @Input()
  completed: boolean = false;

  @Input()
  iconName: string = '';

  @Input()
  count1: any;

  @Input()
  countTotal: any;

  @Input()
  title: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

}
