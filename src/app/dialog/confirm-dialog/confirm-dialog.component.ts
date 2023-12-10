import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent implements OnInit{

  message: string = '';
  dialogTitle: string = '';


  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {dialogTitle: string, message: string}
  ) {
    this.dialogTitle = data.dialogTitle;
    this.message = data.message;
  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm() {
    this.dialogRef.close(true);
  }
}
