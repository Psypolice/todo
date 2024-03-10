import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements OnInit {

  @Input()
  totalTaskInCategory: number = 0;

  @Input()
  completedTaskInCategory: number = 0;

  @Input()
  uncompletedTaskInCategory: number = 0;

  @Input()
  showStat: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
  }

}
