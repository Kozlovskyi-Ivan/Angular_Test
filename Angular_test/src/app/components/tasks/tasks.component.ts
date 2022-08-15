import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';
import { PopUpModalService } from 'src/app/services/pop-up-modal.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  errDialogTitle: string= "Error";
  errDialogTest: string= "Error";
  tasks: Task[] = [];
  faTimes = faTimes;

  constructor(private taskService: TaskService, private popupservice: PopUpModalService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks);
  }

  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe({
        next:()=>(this.tasks = this.tasks.filter(t => t.id !== task.id)),
        error:(error)=>{
          this.openErrDialog(`Error code:${error.status}`,"Item has not been deleted");
        }
      });
  }

  toggleReminder(task: Task) {
    task.reminder=!task.reminder;
    this.taskService
      .updateTaskReminder(task)
      .subscribe({
        next:()=>(this.tasks = this.tasks),
        error:(error)=>{
          this.openErrDialog(`Error code:${error.status}`,"Item's status has not been changed");
        }
      });
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe({
      next: (task) => (this.tasks.push(task)),
      error: (error) => {
        this.openErrDialog(`Error code:${error.status}`,"Item has not been added");
      }
    });
  }

  editTask(task: Task) {
    // task.reminder=!task.reminder;
    // this.taskService
    //   .updateTaskReminder(task)
    //   .subscribe({
    //     next:()=>(this.tasks = this.tasks),
    //     error:(error)=>{
    //       this.openErrDialog(`Error code:${error.status}`,"Item's status has not been changed");
    //     }
    //   });
  }

  openErrDialog(errTitle:string, errText:string){
    this.errDialogTitle=errTitle;
    this.errDialogTest=errText;
    this.openModal('error-dialog');
  }
  
  openModal(id: string) {
    this.popupservice.open(id);
  }

  closeModal(id: string) {
    this.popupservice.close(id);
  }
}
