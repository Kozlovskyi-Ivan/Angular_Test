import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Task, TaskType } from 'src/app/Task';

const httpOptions={
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = "https://localhost:7156/api";

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl+'/TaskNotes');
  }

  getTaskTypes():Observable<TaskType[]>{
    return this.http.get<TaskType[]>(this.apiUrl+'/TaskTypes');
  }

  deleteTask(task:Task):Observable<Task>{
    const url=`${this.apiUrl}/TaskNotes/${task.id}`;
    return this.http.delete<Task>(url);
  }
  
  updateTaskReminder(task:Task):Observable<Task>{
    const url=`${this.apiUrl}/TaskNotes/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }

  addTask(task:Task):Observable<Task>{
    return this.http.post<Task>(this.apiUrl+'/TaskNotes', task, httpOptions);
  }
}
