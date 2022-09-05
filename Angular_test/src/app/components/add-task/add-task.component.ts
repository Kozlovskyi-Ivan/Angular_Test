import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { Task, TaskType } from 'src/app/Task';
import { UpdateTaskService } from 'src/app/services/updatе-task.service';
import { TaskService } from 'src/app/services/task.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  // @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  // @Output() onEditTask: EventEmitter<Task> = new EventEmitter();
  @Output() onFormSubmit: EventEmitter<any> = new EventEmitter();
  @Output() onFormError:EventEmitter<HttpErrorResponse> = new EventEmitter();

  id?: number;
  name!: string;
  comments!: string;
  taskTypeId!: number;
  reminder: boolean = false;

  showAddTask!: boolean;
  submitBtnText: string = "Save Task";
  selTaskTypes!: TaskType[];

  subscription: Subscription;

  constructor(private uiService: UiService, private updateTaskService: UpdateTaskService, private taskService: TaskService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe(value => this.toggleForm(value));

    this.subscription = this.updateTaskService
      .onEditForm()
      .subscribe((task) => { this.bindFormOnEdit(task); });

    this.subscription = this.taskService
      .getTaskTypes()
      .subscribe((taskTypes) => this.bindSelTaskTypes(taskTypes));
  }

  onSubmit() {
    if (!this.name || !this.comments) {
      alert('Please add a task!');
      return;
    }

    const newTask = this.createTask();

    newTask.id == null
      ? this.addTask(newTask)
      : this.updateTask(newTask);

    this.cleanForm();

  }

  addTask(task:Task){
    this.taskService.addTask(task).subscribe({
      next:()=>{
        this.onFormSubmit.emit();
      },
      error:(error)=>{
        this.onFormError.emit(error);
      }
    });
  }

  updateTask(task:Task){
    this.taskService.updateTask(task).subscribe({
      next:()=>{
        this.onFormSubmit.emit();
      },
      error:(error)=>{
        this.onFormError.emit(error);
      }
    })
  }

  bindFormOnEdit(task: Task) {
    this.id = task.id;
    this.name = task.name;
    this.comments = task.comments;
    this.taskTypeId= task.taskTypeId;
    this.reminder = task.reminder;

    this.showAddTask = true;
    this.switchBtnText(true);
  }

  bindSelTaskTypes(taskTypes: TaskType[]) {
    this.selTaskTypes = taskTypes;
    this.taskTypeId = taskTypes[0].id;
  }

  toggleForm(showForm: boolean) {
    if (!showForm)
      this.cleanForm();
    this.showAddTask = showForm;

    this.switchBtnText(false);
  }

  cleanForm(): void {
    this.id = undefined;
    this.name = '';
    this.comments = '';
    this.reminder = false;

    this.switchBtnText(false);
  }

  createTask(): Task {
      return {
        id: this.id,
        name: this.name,
        comments: this.comments,
        reminder: this.reminder,
        taskTypeId: this.taskTypeId
      }
  }

  switchBtnText(isEdit: boolean): void {
    this.submitBtnText = isEdit == true ? "Update Task" : "Save Task";
  }

}
