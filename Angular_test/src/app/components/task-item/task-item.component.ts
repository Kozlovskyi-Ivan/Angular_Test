import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
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

  constructor() { }

  ngOnInit(): void {
  }

  onEdit(task: Task): void {
    this.onEditTask.emit(task);
  }
  onDelete(task: Task): void {
    this.onDeleteTask.emit(task);
  }
  onToggle(task: Task): void {
    this.onToggleReminder.emit(task);
  }
}
