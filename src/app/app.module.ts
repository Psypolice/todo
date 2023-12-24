import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CategoriesComponent} from './views/categories/categories.component';
import {TasksComponent} from "./views/tasks/tasks.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import {EditTaskDialogComponent} from "./dialog/edit-task-dialog/edit-task-dialog.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MatNativeDateModule, MatOptionModule, MAT_DATE_LOCALE} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ConfirmDialogComponent} from "./dialog/confirm-dialog/confirm-dialog.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {TaskDatePipe} from "./pipe/task-date.pipe";
import {registerLocaleData} from "@angular/common";
import localeRu from "@angular/common/locales/ru";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {EditCategoryDialogComponent} from "./dialog/edit-category-dialog/edit-category-dialog.component";

registerLocaleData(localeRu);
@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    TasksComponent,
    EditTaskDialogComponent,
    EditCategoryDialogComponent,
    ConfirmDialogComponent,
    TaskDatePipe
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'}
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
