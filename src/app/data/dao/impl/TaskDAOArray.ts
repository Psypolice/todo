import {TaskDAO} from "../interface/TaskDAO";
import {Observable, of} from "rxjs";
import {Category} from "../../../model/Category";
import {Priority} from "../../../model/Priority";
import { Task } from "../../../model/Task";
import {TestData} from "../../TestData";

export class TaskDAOArray implements TaskDAO {
  add(task: Task): Observable<Task> {
    if (task.id === null) {
      task.id = this.getLastIdTask();
    }
    TestData.tasks.push(task);
    return of(task);
  }

  delete(id: number): Observable<Task> {
    const taskTmp = TestData.tasks.find( t => t.id === id);
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp!), 1);
    return of(taskTmp!);
  }

  get(id: number): Observable<Task> {
    // @ts-ignore
    return of(TestData.tasks.find(todo => todo.id === id));
  }

  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    // @ts-ignore
    return undefined;
  }

  getTotalCount(): Observable<number> {
    // @ts-ignore
    return undefined;
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    // @ts-ignore
    return undefined;
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    // @ts-ignore
    return undefined;
  }

  search(category: Category, searchText: String, status: boolean, priority: Priority): Observable<Task[]> {
    return of(this.searchTasks(category, searchText, status, priority));
  }



  private searchTasks(category: Category, searchText: String, status: boolean, priority: Priority): Task[] {
    let allTasks = TestData.tasks;

    if (status != null) {
      allTasks = allTasks.filter((task => task.completed === status))
    }
    if (category != null) {
      allTasks = allTasks.filter((task => task.category === category))
    }
    if (priority != null) {
      allTasks = allTasks.filter((task => task.priority === priority))
    }
    if (searchText != null) {
      allTasks = allTasks.filter(
        task => task.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return allTasks;
  }

  update(task: Task): Observable<Task> {
    const taskTmp = TestData.tasks.find(t => t.id === task.id);
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp as Task), 1, task);

    return of(task);
  }

  private getLastIdTask(): number {
    return Math.max.apply(Math, TestData.tasks.map(t => t.id)) + 1;
  }
}
