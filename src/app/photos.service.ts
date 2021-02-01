import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {Observable, throwError} from 'rxjs'
import {catchError, delay} from 'rxjs/operators'

export interface Todo {
  completed: boolean
  title: string
  id?: number
}

@Injectable({providedIn: 'root'})
export class PhotosService {
  constructor(private http: HttpClient) {}

  addTodo(todo: Todo): Observable<Todo> {
    const headers = new HttpHeaders({
      MyCustomHeader: Math.random().toString(),
    })

    return this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo, {
      headers
    })
  }

  fetchPhotos(page: number): Observable<Todo[]> {
    let params = new HttpParams()
    params = params.append('client_id', '0bd7304d669c2a900ff77e181962efac03911ab095bbb9ed817a92323ea30d63')
    params = params.append('page', page.toString())
    // const params = new HttpParams().set('client_id', '0bd7304d669c2a900ff77e181962efac03911ab095bbb9ed817a92323ea30d63')
    // params = params.append('_limit', '4')
    // params = params.append('page', page)

    return this.http.get<Todo[]>('https://api.unsplash.com/photos', {
      // params: new HttpParams().set('Authorization', 'Client-ID 0bd7304d669c2a900ff77e181962efac03911ab095bbb9ed817a92323ea30d63')
      params
    })
    .pipe(delay(page !== 1 ? 3000 : 0))
  }

  removeTodo(id: number): Observable<void> {
    return this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`)
  }

  completeTodo(id: number): Observable<Todo> {
    return this.http.put<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      completed: true
    })
  }
}
