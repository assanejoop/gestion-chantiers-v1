import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  avatarUrl: string;
}

interface TaskTag {
  name: string;
  colorClass: string;
  textColorClass: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  assignedUsers: User[];
  additionalUsers: number;
  tag: TaskTag;
  comments: number;
  attachments: number;
  dueDate: string;
  isDone?: boolean;
}

interface TaskColumn {
  id: string;
  title: string;
  color: string;
  count: number;
  tasks: Task[];
}

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss'
})
export class TaskBoardComponent implements OnInit {
  columns: TaskColumn[] = [];
  users: User[] = [];

  constructor() { }

  ngOnInit(): void {
    this.initializeUsers();
    this.initializeTaskBoard();
  }

  private initializeUsers(): void {
    // Dans un cas réel, ces données viendraient probablement d'une API mais pour l instant on adapte selon la maquette 
    this.users = [
      { id: 1, avatarUrl: '/assets/avatars/user1.jpg' },
      { id: 2, avatarUrl: '/assets/avatars/user2.jpg' },
      { id: 3, avatarUrl: '/assets/avatars/user3.jpg' },
      { id: 4, avatarUrl: '/assets/avatars/user4.jpg' },
      { id: 5, avatarUrl: '/assets/avatars/user5.jpg' }
    ];
  }

  private initializeTaskBoard(): void {
    // Définition des colonnes et tâches
    this.columns = [
      {
        id: 'to-do',
        title: 'À faire',
        color: 'gray',
        count: 4,
        tasks: [
          {
            id: 1,
            title: 'Commander les matériaux principaux',
            description: "Cette étape consiste à préparer l'approvisionnement...",
            assignedUsers: this.getRandomUsers(3),
            additionalUsers: 4,
            tag: { name: 'Approvisionnement', colorClass: 'bg-blue-50', textColorClass: 'text-blue-500' },
            comments: 4,
            attachments: 5,
            dueDate: 'Lun, 24 mars'
          },
          {
            id: 2,
            title: "Planifier l'installation du chantier et des...",
            description: "Mettre en place un plan d'installation détaillé...",
            assignedUsers: this.getRandomUsers(3),
            additionalUsers: 4,
            tag: { name: 'Planification', colorClass: 'bg-yellow-50', textColorClass: 'text-yellow-500' },
            comments: 4,
            attachments: 5,
            dueDate: 'Demain'
          },
          {
            id: 3,
            title: 'Préparation du site, vérification des éq...',
            description: "Mettre en place un plan d'installation détaillé...",
            assignedUsers: this.getRandomUsers(3),
            additionalUsers: 4,
            tag: { name: 'Mise en place', colorClass: 'bg-red-50', textColorClass: 'text-red-500' },
            comments: 4,
            attachments: 5,
            dueDate: 'Lun, 24 mars'
          }
        ]
      },
      {
        id: 'in-progress',
        title: 'En construction',
        color: 'yellow-400',
        count: 2,
        tasks: [
          {
            id: 4,
            title: 'Coulage des fondations et installation...',
            description: "L'une des premières étapes physiques de la...",
            imageUrl: '/assets/images/imgdetail1.png',
            assignedUsers: this.getRandomUsers(3),
            additionalUsers: 4,
            tag: { name: 'Gros Oeuvre', colorClass: 'bg-blue-50', textColorClass: 'text-blue-500' },
            comments: 4,
            attachments: 5,
            dueDate: 'Demain'
          },
          {
            id: 5,
            title: 'Montage de la structure en béton arm...',
            description: "Cette étape implique la construction de la st...",
            imageUrl: '/assets/images/structure.jpg',
            assignedUsers: this.getRandomUsers(3),
            additionalUsers: 4,
            tag: { name: 'Réseaux techniques', colorClass: 'bg-orange-50', textColorClass: 'text-orange-500' },
            comments: 4,
            attachments: 5,
            dueDate: 'Demain'
          }
        ]
      },
      {
        id: 'refection',
        title: 'Travaux de réfection',
        color: 'orange-400',
        count: 3,
        tasks: [
          {
            id: 6,
            title: 'Vérification et ajustement des installation...',
            description: "Ce travail consiste à tester les installations...",
            imageUrl: '/assets/images/verification.jpg',
            assignedUsers: this.getRandomUsers(3),
            additionalUsers: 4,
            tag: { name: 'Inspection', colorClass: 'bg-green-50', textColorClass: 'text-green-500' },
            comments: 4,
            attachments: 5,
            dueDate: 'Demain'
          },
          {
            id: 7,
            title: 'Réparation des malfaçons détectées l...',
            description: "Tout au long du processus, des inspections...",
            assignedUsers: this.getRandomUsers(3),
            additionalUsers: 4,
            tag: { name: 'Validation', colorClass: 'bg-purple-50', textColorClass: 'text-purple-500' },
            comments: 4,
            attachments: 5,
            dueDate: 'Terminé',
            isDone: true
          },
          {
            id: 8,
            title: 'Correction des défauts dans la maçon...',
            description: "Une fois la structure de base en place, on vé...",
            imageUrl: '/assets/images/correction.jpg',
            assignedUsers: this.getRandomUsers(3),
            additionalUsers: 4,
            tag: { name: 'Correction', colorClass: 'bg-pink-50', textColorClass: 'text-pink-500' },
            comments: 4,
            attachments: 5,
            dueDate: 'Terminé',
            isDone: true
          }
        ]
      },
      {
        id: 'termine',
        title: 'Termine',
        color: 'green-400',
        count: 3,
        tasks: [
          {
            id: 7,
            title: 'Vérification et ajustement des installation...',
            description: "Ce travail consiste à tester les installations...",
            imageUrl: '/assets/images/verification.jpg',
            assignedUsers: this.getRandomUsers(3),
            additionalUsers: 4,
            tag: { name: 'Inspection', colorClass: 'bg-green-50', textColorClass: 'text-green-500' },
            comments: 4,
            attachments: 5,
            dueDate: 'Demain'
          },
          {
            id: 7,
            title: 'Réparation des malfaçons détectées l...',
            description: "Tout au long du processus, des inspections...",
            assignedUsers: this.getRandomUsers(3),
            additionalUsers: 4,
            tag: { name: 'Validation', colorClass: 'bg-purple-50', textColorClass: 'text-purple-500' },
            comments: 4,
            attachments: 5,
            dueDate: 'Terminé',
            isDone: true
          },
          {
            id: 8,
            title: 'Correction des défauts dans la maçon...',
            description: "Une fois la structure de base en place, on vé...",
            imageUrl: '/assets/images/correction.jpg',
            assignedUsers: this.getRandomUsers(3),
            additionalUsers: 4,
            tag: { name: 'Correction', colorClass: 'bg-pink-50', textColorClass: 'text-pink-500' },
            comments: 4,
            attachments: 5,
            dueDate: 'Terminé',
            isDone: true
          }
        ]
      }
    ];
    
  }

  private getRandomUsers(count: number): User[] {
    // Simule la sélection aléatoire d'utilisateurs pour les tâches
    const shuffled = [...this.users].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Méthodes pour la gestion des tâches
  addTask(columnId: string): void {
    // Implémenter la logique pour ajouter une tâche
    console.log('Ajouter une tâche à la colonne:', columnId);
  }

  moveTask(taskId: number, fromColumnId: string, toColumnId: string): void {
    // Implémenter la logique pour déplacer une tâche entre les colonnes
    console.log(`Déplacer la tâche ${taskId} de ${fromColumnId} vers ${toColumnId}`);
  }

  markAsDone(taskId: number): void {
    // Implémenter la logique pour marquer une tâche comme terminée
    console.log('Marquer la tâche comme terminée:', taskId);
  }

  // Méthodes utilitaires pour l'interface
  trackByColumnId(index: number, column: TaskColumn): string {
    return column.id;
  }

  trackByTaskId(index: number, task: Task): number {
    return task.id;
  }
}