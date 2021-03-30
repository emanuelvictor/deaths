import {Observable} from 'rxjs';
import {Page} from "../../page-serialize/Page";

export interface IRead<T> {

  findById(id: number): Observable<T>;

  listByFilters(filters: any): Observable<Page<T>>;

  findAll(): Observable<T[]>
}
