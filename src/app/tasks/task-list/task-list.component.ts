import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from './../../rxjs-extensions';

import { Task } from './../../models/task';
import { TaskPromiseService, TaskObservableService } from './../';

@Component({
  selector: 'task-list',
  templateUrl: 'task-list.component.html',
  styleUrls: ['task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Array<Task>;
  errorMessage: string;
  private sub: Subscription[] = [];

  constructor(
    private tasksService: TaskPromiseService,
    private taskObservableService: TaskObservableService,
    private router: Router
  ) { }

  ngOnInit() {
    const sub = this.taskObservableService.getTasks()
      .subscribe(
        tasks => this.tasks = tasks,
        error => this.errorMessage = <any>error
      );
    this.sub.push(sub);
  }

  ngOnDestroy() {
    this.sub.forEach(sub => sub.unsubscribe());
  }


  createTask() {
    const link = ['add'];
    this.router.navigate(link);
  }


  completeTask(task: Task): void {
    task.done = true;
    this.tasksService.updateTask(task);
    
  }

  deleteTask(task: Task) {
    this.tasksService.deleteTask(task)
      .then(() => this.tasks = this.tasks.filter(t => t !== task))
      .catch(err => console.log(err));

    this.
  }

}
