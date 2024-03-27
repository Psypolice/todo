import {Component, OnInit} from '@angular/core';
import {Task} from "./model/Task";
import {DataHandlerService} from "./service/data-handler.service";
import {Category} from "./model/Category";
import {Priority} from "./model/Priority";
import {concatMap, map, zip} from "rxjs";
import {IntroService} from "./service/intro.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent implements OnInit {

  protected categoryMap = new Map<Category, number>();

  title = 'Todo';
  tasks: Task[] = [];
  categories: Category[] = [];
  priorities: Priority[] = [];

  protected totalTasksCountInCategory: number = 0;
  protected completedTaskCountInCategory: number = 0;
  protected uncompletedTaskCountInCategory: number = 0;
  protected uncompletedTotalTaskCount: number = 0;

  protected showStat: boolean = true;

  protected selectedCategory!: Category;
  private searchTaskText: string = '';

  private priorityFilter!: Priority;
  private statusFilter!: boolean;
  private searchCategoryText: string = '';

  constructor(private dataHandler: DataHandlerService,
              private introService: IntroService) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllCategory().subscribe(category => this.categories = category);
    this.dataHandler.getAllPriority().subscribe(priority => this.priorities = priority);
    this.fillCategories();

    this.onSelectCategory(null!);

    this.introService.startIntroJS(true);
  }

  onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this.updateTaskAndStats();
  }

  onUpdateTask(task: Task) {
    this.dataHandler.updateTask(task).subscribe(() => {
      this.fillCategories();
      this.updateTaskAndStats();
    });
  }

  onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task.id).pipe(
      concatMap(task => {
        return this.dataHandler.getUncompletedTaskCountInCategory(task.category!).pipe(map(count => {
          return ({t: task, count});
        }));
      })
    ).subscribe(result => {
      const t = result.t as Task;
      this.categoryMap.set(t.category!, result.count);

      this.updateTaskAndStats();
    })
  }

  protected onDeleteCategory(category: Category) {
    this.dataHandler.deleteCategory(category.id).subscribe(cat => {
      this.selectedCategory = null!;
      this.categoryMap.delete(cat)
      this.onSearchCategory(this.searchCategoryText);
      this.updateTaskAndStats()
    });
  }

  protected onUpdateCategory(category: Category) {
    this.dataHandler.updateCategory(category).subscribe(() => {
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
    this.dataHandler.addTask(task).pipe(
      concatMap(task => {
        return this.dataHandler.getUncompletedTaskCountInCategory(task.category!).pipe(map(count => {
          return({t: task, count});
        }))
      })
    ).subscribe(result => {
      const t = result.t as Task;
      if (t.category) {
        this.categoryMap.set(t.category, result.count);
      }
      this.updateTaskAndStats();
    });
  }

  onAddCategory(title: string): void {
    this.dataHandler.addCategory(title).subscribe(() => this.fillCategories());

  }

  protected fillCategories(): void {
    if (this.categoryMap) {
      this.categoryMap.clear();
    }

    this.categories = this.categories.sort((a, b) =>
      a.title.localeCompare(b.title));

    this.categories.forEach(cat => {
      this.dataHandler.getUncompletedTaskCountInCategory(cat)
        .subscribe(count => this.categoryMap.set(cat, count));
    });

  }

  protected onSearchCategory(title: string): void {
    this.searchCategoryText = title;

    this.dataHandler.searchCategories(title).subscribe(categories => {
      this.categories = categories;
      this.fillCategories();
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
    ).subscribe(array => {
      this.totalTasksCountInCategory = array[0];
      this.completedTaskCountInCategory = array[1];
      this.uncompletedTaskCountInCategory = array[2];
      this.uncompletedTotalTaskCount = array[3];
    })
  }

  protected toggleStat(showStat: boolean): void {
    this.showStat = showStat;
  }
}
