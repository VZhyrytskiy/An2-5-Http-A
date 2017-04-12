import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Task } from './../../models/task';
import { TaskArrayService, TaskPromiseService, TaskObservableService } from './../';

@Component({
  templateUrl: 'task-list.component.html',
  styleUrls: ['task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Array<Task>;
  errorMessage: string;
  private sub: Subscription[] = [];

  constructor(
    private router: Router,
    private taskArrayService: TaskArrayService,
    private taskPromiseService: TaskPromiseService,
    private taskObservableService: TaskObservableService)
  { }

  ngOnInit() {
    const sub = this.taskObservableService.getTasks()
      .subscribe(
        tasks => this.tasks = tasks,
        error => this.errorMessage = <any>error
      );
    this.sub.push(sub);
  }

  ngOnDestroy() {
    this.sub.forEach(s => s.unsubscribe());
  }


  createTask() {
    const link = ['add'];
    this.router.navigate(link);
  }


  completeTask(task: Task): void {
    task.done = true;
    this.taskPromiseService.updateTask(task);
  }

  deleteTask(task: Task) {
    this.taskPromiseService.deleteTask(task)
      .then(() => this.tasks = this.tasks.filter(t => t !== task))
      .catch(err => console.log(err));
  }

}
