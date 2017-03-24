import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import './../../rxjs-extensions';

import { Task } from './../../models/task';

@Injectable()
export class TaskObservableService {
  private tasksUrl = 'http://localhost:3000/tasks';

  constructor(
    private http: Http
  ) {}

  getTasks(): Observable<Task[]> {
    return this.http.get(this.tasksUrl)
            .map( this.handleData )
            .catch( this.handleError );
  }

  getTask(id: number) {
     return this.http.get(`${this.tasksUrl}/${id}`)
            .map( this.handleData )
            .catch(this.handleError);
  }

  updateTask(task: Task) {

  }

  createTask(task: Task) {

  }

  deleteTask(task: Task) {

  }

  private handleData(response: Response) {
    const body = response.json();
    return body || {};
  }

  private handleError(error: any) {
    const errMsg = (error.message)
                    ? error.message
                    : error.status
                        ? `${error.status} - ${error.statusText}`
                        : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
