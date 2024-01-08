import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Task} from '../../model/Task';
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/Category";
import {Priority} from "../../model/Priority";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {OperType} from "../OperType";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrl: './edit-task-dialog.component.css'
})
export class EditTaskDialogComponent implements OnInit{

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string, OperType],
    private dataHandler: DataHandlerService,
    private dialog: MatDialog
  ) {
  }
  categories: Category[] = [];
  priority: Priority[] = [];

  dialogTitle: string = '';
  task!: Task;
  operType!: OperType;

  tmpTitle: string = '';
  tmpCategory!: Category;
  tmpPriority!: Priority;
  tmpDate!: Date | null;

    ngOnInit(): void {
        this.task = this.data[0];
        this.dialogTitle = this.data[1];
        this.operType = this.data[2];

        this.tmpTitle = this.task.title;
        this.tmpCategory = this.task.category as Category;
        this.tmpPriority = this.task.priority as Priority;
        this.tmpDate = this.task.date as Date;

        this.dataHandler.getAllCategory().subscribe(items => this.categories = items);
        this.dataHandler.getAllPriority().subscribe(items => this.priority = items);
    }

  onConfirm() {
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;
    this.task.date = this.tmpDate;
    this.dialogRef.close(this.task);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onDelete() {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы уверены, что хотите удалить задачу: "${this.task.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }

  onDone() {
    this.dialogRef.close('done');
  }

  onActivate() {
    this.dialogRef.close('activate');
  }

  protected canDelete(): boolean {
      return this.operType == OperType.EDIT;
  }

  protected canActivateDesactivate(): boolean {
      return this.operType == OperType.EDIT;
  }
}
