import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UpdateTaskService } from 'src/app/services/updatе-task.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = 'Task Tracker';
  showAddTask!: boolean;
  subscription!: Subscription;

  constructor(private uiService: UiService, private updateTaskService: UpdateTaskService, private router: Router) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe(value => this.showAddTask = value);

    this.subscription = this.updateTaskService
      .onEditForm()
      .subscribe(() => this.showAddTask = true);
  }

  ngOnInit(): void {
  }

  toggleAddTask() {
    this.uiService.toggleAddTask(!this.showAddTask);
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }
}
