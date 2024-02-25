import {Component, OnInit} from '@angular/core';
import {Task} from "./model/Task";
import {DataHandlerService} from "./service/data-handler.service";
import {Category} from "./model/Category";
import {Priority} from "./model/Priority";
import {zip} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent implements OnInit{
  title = 'Todo';
  tasks: Task[] = [];
  categories: Category[] = [];
  priorities: Priority[] = [];

  protected totalTasksCountInCategory: number = 0;
  protected completedTaskCountInCategory: number = 0;
  protected uncompletedTaskCountInCategory: number = 0;
  protected uncompletedTotalTaskCount: number = 0;



  protected selectedCategory!: Category;
  private searchTaskText: string = '';

  private priorityFilter!: Priority;
  private statusFilter!: boolean;
  private searchCategoryText: string = '';

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
        this.dataHandler.getAllTask().subscribe(tasks => this.tasks = tasks);
        this.dataHandler.getAllPriority().subscribe(priority => this.priorities = priority);
        this.dataHandler.getAllCategory().subscribe(categories => this.categories = categories)
    }

  onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this.updateTaskAndStats();
  }

  onUpdateTask(task: Task) {
    this.dataHandler.updateTask(task).subscribe(() => {
      this.updateTaskAndStats();
    });
  }

  onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task.id).subscribe(cat => {
      this.updateTaskAndStats();
    });
  }

  protected onDeleteCategory(category: Category) {
    this.dataHandler.deleteCategory(category.id).subscribe( () => {
      this.selectedCategory = null!;
      this.onSearchCategory(this.searchCategoryText);
    });
  }

  protected onUpdateCategory(category: Category) {
    this.dataHandler.updateCategory(category).subscribe( () => {
      this.onSearchCategory(this.searchCategoryText);
    });
  }

  protected onSearchTasks(searchString: string) {
    this.searchTaskText = searchString;
    this.updateTasks();
  }

  protected onFilterTasksByStatus(status: boolean): void {
    this.statusFilter = status;
    this.updateTasks();
  }

  protected onFilterTasksByPriority(priority: Priority): void {
    this.priorityFilter = priority;
    this.updateTasks();
  }

  protected updateTasks(): void {
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  protected onAddTask(task: Task) {
    this.dataHandler.addTask(task).subscribe(result => {
      this.updateTaskAndStats();
    });
  }

  onAddCategory(title: string): void {
    this.dataHandler.addCategory(title).subscribe(() => this.updateCategories());

  }

  private updateCategories() {
      this.dataHandler.getAllCategory().subscribe(categories => this.categories = categories);
  }

  protected onSearchCategory(title: string):void {
    this.searchCategoryText = title;

    this.dataHandler.searchCategories(title).subscribe(categories => {
      this.categories = categories;
    });
  }

  protected updateTaskAndStats(): void {
    this.updateTasks();

    this.updateStats();
  }

  protected updateStats(): void {
    zip(
      this.dataHandler.getTotalTaskCountInCategory(this.selectedCategory),
      this.dataHandler.getCompletedTaskCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedTaskCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedTotalTaskCount()
    ).subscribe( array => {
      this.totalTasksCountInCategory = array[0];
      this.completedTaskCountInCategory = array[1];
      this.uncompletedTaskCountInCategory = array[2];
      this.uncompletedTotalTaskCount = array[3];
    })
  }
}
