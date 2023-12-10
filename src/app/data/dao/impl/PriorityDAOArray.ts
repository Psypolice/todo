import {PriorityDAO} from "../interface/PriorityDAO";
import {Priority} from "../../../model/Priority";
import {Observable, of} from "rxjs";
import {TestData} from "../../TestData";

export class PriorityDAOArray implements PriorityDAO {
  add(t: Priority): Observable<Priority> {
    // @ts-ignore
    return undefined;
  }

  delete(id: number): Observable<Priority> {
    // @ts-ignore
    return undefined;
  }

  get(id: number): Observable<Priority> {
    // @ts-ignore
    return of(TestData.priorities.find(todo => todo.id === id));
  }

  getAll(): Observable<Priority[]> {
    return of(TestData.priorities);
  }

  update(t: Priority): Observable<Priority> {
    // @ts-ignore
    return undefined;
  }

}
