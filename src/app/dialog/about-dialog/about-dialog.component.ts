import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrl: './about-dialog.component.css'
})
export class AboutDialogComponent implements OnInit{
  protected dialogTitle: string = '';
  protected message: string = '';

  constructor(
    private dialogRef: MatDialogRef<AboutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {dialogTitle: string, message: string}
  ) {
    this.dialogTitle = data.dialogTitle;
    this.message = data.message;
  }

  ngOnInit(): void {
    }

    protected onConfirm(): void {
    this.dialogRef.close(true);
    }
}
