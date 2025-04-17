import { Component } from '@angular/core';
import { HeaderComponent } from "../../core/components/header/header.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';
import { ProjectsComponent } from "../projects/projects.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
