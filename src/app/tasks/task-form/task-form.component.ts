import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Task } from './../../models/task';
import { TaskPromiseService, TaskObservableService } from './..';

@Component({
  selector: 'task-form',
  templateUrl: 'task-form.component.html',
  styleUrls: ['task-form.component.css']
})
export class TaskFormComponent implements OnInit, OnDestroy {
  task: Task;
  private sub: Subscription[] = [];

  constructor(
    private tasksPromiseService: TaskPromiseService,
    private tasksObservableService: TaskObservableService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.task = new Task(null, '', null, null);

    const sub = this.route.params.subscribe(params => {
      const id = +params['id'];

      // NaN - for new task, id - for edit
      if (id) {
        // this.tasksPromiseService.getTask(id)
        //   .then(task => this.task = Object.assign({}, task))
        //   .catch((err) => console.log(err));
        const s = this.tasksObservableService.getTask(id)
          .subscribe(
            task => this.task = Object.assign({}, task),
            err => console.log(err)
          );
        this.sub.push(s);
      }
    });
    this.sub.push(sub);
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  saveTask() {
    let task = new Task(
      this.task.id,
      this.task.action,
      this.task.priority,
      this.task.estHours
    );

    const method = task.id ? 'updateTask' : 'createTask';
    this.tasksPromiseService[method](task)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.router.navigate(['home']);
  }
}
