import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskBoardComponent } from "../task-board/task-board.component";
import { TeamListComponent } from '../team-list/team-list.component';
import { DocumentsComponent } from '../documents/documents.component';


interface ProjectInfo {
  title: string;
  status: {
    label: string;
    percentage: number;
  };
  tasks: {
    completed: number;
    total: number;
  };
  dueDate: string;
  budget: string;
}
@Component({
  selector: 'app-project-detail-header',
  standalone: true,
  imports: [CommonModule, 
    TaskBoardComponent,
    TeamListComponent,
    DocumentsComponent

  ],
  templateUrl: './project-detail-header.component.html',
  styleUrl: './project-detail-header.component.css'
})

export class ProjectDetailHeaderComponent implements OnInit {
  activeTab: string = 'presentation'; 
  projectInfo: ProjectInfo = {
    title: 'Construction d\'un immeuble résidentiel de 10 Étages',
    status: {
      label: 'En progression',
      percentage: 42.31
    },
    tasks: {
      completed: 33,
      total: 78
    },
    dueDate: '28 mars 2025',
    budget: 'Fcfa 700.000'
  };

  tabs = [
    { name: 'Présentation du projet', active: true, link: '#' },
    { name: 'Tâches', active: false, link: '#', highlight: true },
    { name: 'Équipe', active: false, link: '#' },
    { name: 'Lots et sous-traitants', active: false, link: '#' },
    { name: 'Documents', active: false, link: '#' },
    { name: 'Budget', active: false, link: '#' },
    { name: 'Stock', active: false, link: '#' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Vous pouvez ajouter du code d'initialisation ici si nécessaire
    // Par exemple, récupérer les données du projet depuis une API
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  }
