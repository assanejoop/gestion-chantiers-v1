import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',


  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  showProjects: boolean = false;
  // menuItems = [
  //   { path: '/features/dashboard', label: 'Dashboard', icon: 'dashboard' },
  //   { path: '/features/humanresources', label: 'Human Resources', icon: 'people' },
  //   { path: '/features/financial', label: 'Financial', icon: 'attach_money' },
  //   { path: '/features/communication', label: 'Communication', icon: 'message' },
  //   { path: '/features/settings', label: 'Settings', icon: 'settings' },
  //   { path: '/features/projects', label: 'Projects', icon: 'work' }
  // ];

  toggleProjects(): void {
    this.showProjects = !this.showProjects;
  }
}