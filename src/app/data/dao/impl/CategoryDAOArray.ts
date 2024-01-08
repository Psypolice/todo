import {CategoryDAO} from "../interface/CategoryDAO";
import {Category} from "../../../model/Category";
import {Observable, of} from "rxjs";
import {TestData} from "../../TestData";

export class CategoryDAOArray implements CategoryDAO {
  add(category: Category): Observable<Category> {
    if (category.id === null || category.id === 0) {
      category.id = this.getLastIdCategory();
    }
    TestData.categories.push(category);
    return of(category);
  }

  delete(id: number): Observable<Category> {
    TestData.tasks.forEach(task => {
      if (task.category && task.category.id === id) {
        task.category = null!;
      }
    });

    const tmpCategory = TestData.categories.find(t => t.id === id);
    TestData.categories.splice(TestData.categories.indexOf(<Category>tmpCategory), 1);
    // @ts-ignore
    return of(tmpCategory);
  }

  get(id: number): Observable<Category> {
    // @ts-ignore
    return of(TestData.categories.find(todo => todo.id === id));
  }

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

  search(title: string): Observable<Category[]> {
    // @ts-ignore
    return undefined;
  }

  update(category: Category): Observable<Category> {
    const tmpCategory = TestData.categories.find(c => c.id === category.id);
    TestData.categories.splice(TestData.categories.indexOf(<Category>tmpCategory), 1, category);
    // @ts-ignore
    return of(tmpCategory);
  }

  private getLastIdCategory() {
    return Math.max.apply(Math, TestData.categories.map(c => c.id)) + 1;
  }
}
