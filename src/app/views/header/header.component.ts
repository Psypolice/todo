import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  @Input()
  categoryName: string = '';

  @Input()
  showStat: boolean = true;

  @Output()
  toggleStat: any = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  protected onToggleStat(): void {
    this.toggleStat.emit(!this.showStat);
  }

}
