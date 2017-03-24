import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks.routing.module';

import {
  TaskListComponent,
  TaskComponent,
  TaskFormComponent,
  TaskArrayService,
  TaskPromiseService,
  TaskObservableService
} from '.';


@NgModule({
  declarations: [
    TaskListComponent,
    TaskComponent,
    TaskFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TasksRoutingModule
  ],
  providers: [
    TaskArrayService,
    TaskPromiseService,
    TaskObservableService
  ]
})
export class TasksModule {}
