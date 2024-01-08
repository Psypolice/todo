import {Component, OnInit} from '@angular/core';
import {Task} from "./model/Task";
import {DataHandlerService} from "./service/data-handler.service";
import {Category} from "./model/Category";
import {Priority} from "./model/Priority";

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

  protected selectedCategory!: Category;
  private searchTaskText: string = '';

  private priorityFilter!: Priority;
  private statusFilter!: boolean;

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
        this.dataHandler.getAllTask().subscribe(tasks => this.tasks = tasks);
        this.dataHandler.getAllPriority().subscribe(priority => this.priorities = priority);
        this.dataHandler.getAllCategory().subscribe(categories => this.categories = categories)
    }

  onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this.dataHandler.searchTasks(
      this.selectedCategory,
      null!,
      null!,
      null!
    ).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  onUpdateTask(task: Task) {
    this.dataHandler.updateTask(task).subscribe(() => {
      this.dataHandler.searchTasks(
        this.selectedCategory,
        null!,
        null!,
        null!
      ).subscribe(tasks => {
        this.tasks = tasks;
      });
    });
  }

  onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task.id).subscribe(() => {
      this.dataHandler.searchTasks(
        this.selectedCategory,
        null!,
        null!,
        null!,
      ).subscribe(tasks => {
        this.tasks = tasks;
      });
    });
  }

  protected onDeleteCategory(category: Category) {
    this.dataHandler.deleteCategory(category.id).subscribe( () => {
      this.selectedCategory = null!;
      this.onSelectCategory(this.selectedCategory);
    });
  }

  protected onUpdateCategory(category: Category) {
    this.dataHandler.updateCategory(category).subscribe( () => {
      this.onSelectCategory(this.selectedCategory);
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
}
