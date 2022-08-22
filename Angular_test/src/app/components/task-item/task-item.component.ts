import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
import { UpdateTaskService } from 'src/app/services/updatе-task.service';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;
  @Output() onEditTask: EventEmitter<Task> = new EventEmitter();
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();

  faTimes = faTimes;
  faEdit = faEdit;

  constructor(private updateTask:UpdateTaskService) { }

  ngOnInit(): void {
  }

  onEdit(task: Task): void {
    // this.onEditTask.emit(task);
    this.updateTask.callEditForm(task);
  }
  onDelete(task: Task): void {
    this.onDeleteTask.emit(task);
  }
  onToggle(task: Task): void {
    this.onToggleReminder.emit(task);
  }
}
