import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SettingsDialogComponent} from "../../dialog/settings-dialog/settings-dialog.component";
import {IntroService} from "../../service/intro.service";

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

  constructor(private dialogRef: MatDialog,
              private introService: IntroService) {
  }

  ngOnInit(): void {
  }

  protected onToggleStat(): void {
    this.toggleStat.emit(!this.showStat);
  }

  protected showSettings(): void {
    const dialogRef = this.dialogRef.open(SettingsDialogComponent,
      {
        autoFocus: false,
        width: '500px'
      });
  }

  protected showIntroHelp() {
    this.introService.startIntroJS(false);
  }

}
