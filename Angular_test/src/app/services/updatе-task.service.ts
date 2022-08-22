import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from '../Task';

@Injectable({
  providedIn: 'root'
})
export class UpdateTaskService {

  private editTask = new Subject<Task>();

  constructor() { }

  callEditForm(task:Task){
    this.editTask.next(task);
  }

  onEditForm():Observable<any>{
    return this.editTask.asObservable();
  }
}
