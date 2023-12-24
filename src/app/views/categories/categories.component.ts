import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/Category";
import {MatDialog} from "@angular/material/dialog";
import {EditCategoryDialogComponent} from "../../dialog/edit-category-dialog/edit-category-dialog.component";
import {Task} from "../../model/Task";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  @Input()
  categories: Category[] = [];

  @Output()
  selectCategory = new EventEmitter<Category>();

  @Output()
  deleteCategory = new EventEmitter<Category>();

  @Output()
  updateCategory = new EventEmitter<Category>();

  @Input()
  selectedCategory?: Category;

  protected indexMouseMove: number = 0;
  protected showEditIconCategory: boolean = false;

  constructor(private dataHandler: DataHandlerService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    // this.dataHandler.getAllCategory().subscribe(categories => this.categories = categories);
  }

  showTasksByCategory(category: Category) {

    if (this.selectedCategory === category) {
      return;
    }

    this.selectedCategory = category;
    this.selectCategory.emit(this.selectedCategory);
  }

  protected showEditIcon(index: number) {
    this.indexMouseMove = index;

  }

  openEditDialog(category: Category): void {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category.title, 'Редактирование категории'],
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deleteCategory.emit(category);
        return;
      }

      if (typeof (result) === 'string') {
        category.title = result as string;

        this.updateCategory.emit(category);
        return;
      }
    });

  }
}
