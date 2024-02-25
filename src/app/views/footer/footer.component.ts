import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog} from "@angular/material/dialog";
import {AboutDialogComponent} from "../../dialog/about-dialog/about-dialog.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  protected year: Date = new Date();
  protected site = 'https://github.com/Psypolice';
  protected blog = 'https://github.com/Psypolice';
  protected siteName = 'PsyPolice';

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    this.year = new Date();
  }

  protected openAboutDialog(): void {
    this.dialog.open(AboutDialogComponent,
      {
        autoFocus: false,
        data: {
          dialogTitle: 'О программе',
          message: 'Это программа для управления задачами.'
        },
        width: '500px'
      });
  }

}
