import {Injectable} from '@angular/core'
import {HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http'
import {Observable} from 'rxjs'

export interface Todo {
  completed: boolean
  title: string
  id?: number
}

const clientId = 'Client-ID 0bd7304d669c2a900ff77e181962efac03911ab095bbb9ed817a92323ea30d63'

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
    params = params.append('page', page.toString())
    params = params.append('per_page', '30')

    return this.http.get<Todo[]>('https://api.unsplash.com/photos', {params})
  }

  getPhoto(id: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(`https://api.unsplash.com/photos/${id}`)
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

export class PhotoInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const cloned = req.clone({
      headers: req.headers.append('Authorization', clientId)
    })

    return next.handle(cloned)
  }
}
