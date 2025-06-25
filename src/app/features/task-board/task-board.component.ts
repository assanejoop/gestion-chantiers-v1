// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';

// interface User {
//   id: number;
//   avatarUrl: string;
// }

// interface TaskTag {
//   name: string;
//   colorClass: string;
//   textColorClass: string;
// }

// interface Task {
//   id: number;
//   title: string;
//   description: string;
//   imageUrl?: string;
//   assignedUsers: User[];
//   additionalUsers: number;
//   tag: TaskTag;
//   comments: number;
//   attachments: number;
//   dueDate: string;
//   isDone?: boolean;
// }

// interface TaskColumn {
//   id: string;
//   title: string;
//   color: string;
//   count: number;
//   tasks: Task[];
// }

// @Component({
//   selector: 'app-task-board',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './task-board.component.html',
//   styleUrl: './task-board.component.scss'
// })
// export class TaskBoardComponent implements OnInit {
//   columns: TaskColumn[] = [];
//   users: User[] = [];

//   constructor() { }

//   ngOnInit(): void {
//     this.initializeUsers();
//     this.initializeTaskBoard();
//   }

//   private initializeUsers(): void {
//     // Dans un cas réel, ces données viendraient probablement d'une API mais pour l instant on adapte selon la maquette 
//     this.users = [
//       { id: 1, avatarUrl: '/assets/avatars/user1.jpg' },
//       { id: 2, avatarUrl: '/assets/avatars/user2.jpg' },
//       { id: 3, avatarUrl: '/assets/avatars/user3.jpg' },
//       { id: 4, avatarUrl: '/assets/avatars/user4.jpg' },
//       { id: 5, avatarUrl: '/assets/avatars/user5.jpg' }
//     ];
//   }

//   private initializeTaskBoard(): void {
//     // Définition des colonnes et tâches
//     this.columns = [
//       {
//         id: 'to-do',
//         title: 'À faire',
//         color: 'gray',
//         count: 4,
//         tasks: [
//           {
//             id: 1,
//             title: 'Commander les matériaux principaux',
//             description: "Cette étape consiste à préparer l'approvisionnement...",
//             assignedUsers: this.getRandomUsers(3),
//             additionalUsers: 4,
//             tag: { name: 'Approvisionnement', colorClass: 'bg-blue-50', textColorClass: 'text-blue-500' },
//             comments: 4,
//             attachments: 5,
//             dueDate: 'Lun, 24 mars'
//           },
//           {
//             id: 2,
//             title: "Planifier l'installation du chantier et des...",
//             description: "Mettre en place un plan d'installation détaillé...",
//             assignedUsers: this.getRandomUsers(3),
//             additionalUsers: 4,
//             tag: { name: 'Planification', colorClass: 'bg-yellow-50', textColorClass: 'text-yellow-500' },
//             comments: 4,
//             attachments: 5,
//             dueDate: 'Demain'
//           },
//           {
//             id: 3,
//             title: 'Préparation du site, vérification des éq...',
//             description: "Mettre en place un plan d'installation détaillé...",
//             assignedUsers: this.getRandomUsers(3),
//             additionalUsers: 4,
//             tag: { name: 'Mise en place', colorClass: 'bg-red-50', textColorClass: 'text-red-500' },
//             comments: 4,
//             attachments: 5,
//             dueDate: 'Lun, 24 mars'
//           }
//         ]
//       },
//       {
//         id: 'in-progress',
//         title: 'En construction',
//         color: 'yellow-400',
//         count: 2,
//         tasks: [
//           {
//             id: 4,
//             title: 'Coulage des fondations et installation...',
//             description: "L'une des premières étapes physiques de la...",
//             imageUrl: '/assets/images/imgdetail1.png',
//             assignedUsers: this.getRandomUsers(3),
//             additionalUsers: 4,
//             tag: { name: 'Gros Oeuvre', colorClass: 'bg-blue-50', textColorClass: 'text-blue-500' },
//             comments: 4,
//             attachments: 5,
//             dueDate: 'Demain'
//           },
//           {
//             id: 5,
//             title: 'Montage de la structure en béton arm...',
//             description: "Cette étape implique la construction de la st...",
//             imageUrl: '/assets/images/structure.jpg',
//             assignedUsers: this.getRandomUsers(3),
//             additionalUsers: 4,
//             tag: { name: 'Réseaux techniques', colorClass: 'bg-orange-50', textColorClass: 'text-orange-500' },
//             comments: 4,
//             attachments: 5,
//             dueDate: 'Demain'
//           }
//         ]
//       },
//       {
//         id: 'refection',
//         title: 'Travaux de réfection',
//         color: 'orange-400',
//         count: 3,
//         tasks: [
//           {
//             id: 6,
//             title: 'Vérification et ajustement des installation...',
//             description: "Ce travail consiste à tester les installations...",
//             imageUrl: '/assets/images/verification.jpg',
//             assignedUsers: this.getRandomUsers(3),
//             additionalUsers: 4,
//             tag: { name: 'Inspection', colorClass: 'bg-green-50', textColorClass: 'text-green-500' },
//             comments: 4,
//             attachments: 5,
//             dueDate: 'Demain'
//           },
//           {
//             id: 7,
//             title: 'Réparation des malfaçons détectées l...',
//             description: "Tout au long du processus, des inspections...",
//             assignedUsers: this.getRandomUsers(3),
//             additionalUsers: 4,
//             tag: { name: 'Validation', colorClass: 'bg-purple-50', textColorClass: 'text-purple-500' },
//             comments: 4,
//             attachments: 5,
//             dueDate: 'Terminé',
//             isDone: true
//           },
//           {
//             id: 8,
//             title: 'Correction des défauts dans la maçon...',
//             description: "Une fois la structure de base en place, on vé...",
//             imageUrl: '/assets/images/correction.jpg',
//             assignedUsers: this.getRandomUsers(3),
//             additionalUsers: 4,
//             tag: { name: 'Correction', colorClass: 'bg-pink-50', textColorClass: 'text-pink-500' },
//             comments: 4,
//             attachments: 5,
//             dueDate: 'Terminé',
//             isDone: true
//           }
//         ]
//       },
//       {
//         id: 'termine',
//         title: 'Termine',
//         color: 'green-400',
//         count: 3,
//         tasks: [
//           {
//             id: 7,
//             title: 'Vérification et ajustement des installation...',
//             description: "Ce travail consiste à tester les installations...",
//             imageUrl: '/assets/images/verification.jpg',
//             assignedUsers: this.getRandomUsers(3),
//             additionalUsers: 4,
//             tag: { name: 'Inspection', colorClass: 'bg-green-50', textColorClass: 'text-green-500' },
//             comments: 4,
//             attachments: 5,
//             dueDate: 'Demain'
//           },
//           {
//             id: 7,
//             title: 'Réparation des malfaçons détectées l...',
//             description: "Tout au long du processus, des inspections...",
//             assignedUsers: this.getRandomUsers(3),
//             additionalUsers: 4,
//             tag: { name: 'Validation', colorClass: 'bg-purple-50', textColorClass: 'text-purple-500' },
//             comments: 4,
//             attachments: 5,
//             dueDate: 'Terminé',
//             isDone: true
//           },
//           {
//             id: 8,
//             title: 'Correction des défauts dans la maçon...',
//             description: "Une fois la structure de base en place, on vé...",
//             imageUrl: '/assets/images/correction.jpg',
//             assignedUsers: this.getRandomUsers(3),
//             additionalUsers: 4,
//             tag: { name: 'Correction', colorClass: 'bg-pink-50', textColorClass: 'text-pink-500' },
//             comments: 4,
//             attachments: 5,
//             dueDate: 'Terminé',
//             isDone: true
//           }
//         ]
//       }
//     ];
    
//   }

//   private getRandomUsers(count: number): User[] {
//     // Simule la sélection aléatoire d'utilisateurs pour les tâches
//     const shuffled = [...this.users].sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, count);
//   }

//   // Méthodes pour la gestion des tâches
//   addTask(columnId: string): void {
//     // Implémenter la logique pour ajouter une tâche
//     console.log('Ajouter une tâche à la colonne:', columnId);
//   }

//   moveTask(taskId: number, fromColumnId: string, toColumnId: string): void {
//     // Implémenter la logique pour déplacer une tâche entre les colonnes
//     console.log(`Déplacer la tâche ${taskId} de ${fromColumnId} vers ${toColumnId}`);
//   }

//   markAsDone(taskId: number): void {
//     // Implémenter la logique pour marquer une tâche comme terminée
//     console.log('Marquer la tâche comme terminée:', taskId);
//   }

//   // Méthodes utilitaires pour l'interface
//   trackByColumnId(index: number, column: TaskColumn): string {
//     return column.id;
//   }

//   trackByTaskId(index: number, task: Task): number {
//     return task.id;
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// // import { TaskService } from '../../services/task.service';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { TaskService } from '../../core/services/task.service';

// interface User {
//   id: number;
//   avatarUrl: string;
// }

// interface TaskTag {
//   name: string;
//   colorClass: string;
//   textColorClass: string;
// }

// interface Task {
//   id: number;
//   title: string;
//   description: string;
//   priority: string;
//   status: string;
//   imageUrl?: string;
//   assignedUsers: User[];
//   additionalUsers: number;
//   tag: TaskTag;
//   comments: number;
//   attachments: number;
//   dueDate: string;
//   isDone?: boolean;
//   realEstateProperty?: any;
//   executors?: any[];
//   pictures?: string[];
//   startDate?: string;
//   endDate?: string;
// }

// interface TaskColumn {
//   id: string;
//   title: string;
//   color: string;
//   count: number;
//   tasks: Task[];
// }

// @Component({
//   selector: 'app-task-board',
//   standalone: true,
//   imports: [CommonModule, FormsModule,ReactiveFormsModule],
//   templateUrl: './task-board.component.html',
//   styleUrls: ['./task-board.component.scss']
// })
// export class TaskBoardComponent implements OnInit {
//   columns: TaskColumn[] = [];
//   users: User[] = [];
//   newTask: Partial<Task> = {};
//   isEditMode = false;
//   selectedTask: Task | null = null;
//   showTaskForm = false;

//   constructor(private taskService: TaskService) { }

//   ngOnInit(): void {
//     this.initializeUsers();
//     this.loadTasks();
//   }

//   private initializeUsers(): void {
//     // Mock users - in a real app, you'd fetch these from your API
//     this.users = [
//       { id: 1, avatarUrl: 'assets/images/av1.png' },
//       { id: 2, avatarUrl: 'assets/images/av2.png' },
//       { id: 3, avatarUrl: 'assets/images/av3.png' },
//       { id: 4, avatarUrl: 'assets/images/av4.png' }
//     ];
//   }

//   private loadTasks(): void {
//     this.taskService.getAllTasks().subscribe({
//       next: (apiTasks: any[]) => {
//         this.organizeTasks(apiTasks);
//       },
//       error: (err) => {
//         console.error('Error loading tasks:', err);
//         // Fallback to mock data if API fails (for demo purposes)
//         this.initializeTaskBoardWithMockData();
//       }
//     });
//   }

//   private organizeTasks(apiTasks: any[]): void {
//     // Transform API tasks to match our frontend structure
//     const transformedTasks = apiTasks.map(task => this.transformApiTask(task));

//     this.columns = [
//       {
//         id: 'todo',
//         title: 'À faire',
//         color: 'gray',
//         count: transformedTasks.filter(t => t.status === 'TODO').length,
//         tasks: transformedTasks.filter(t => t.status === 'TODO')
//       },
//       {
//         id: 'in-progress',
//         title: 'En construction',
//         color: 'yellow-400',
//         count: transformedTasks.filter(t => t.status === 'IN_PROGRESS').length,
//         tasks: transformedTasks.filter(t => t.status === 'IN_PROGRESS')
//       },
//       {
//         id: 'refection',
//         title: 'Travaux de réfection',
//         color: 'orange-400',
//         count: transformedTasks.filter(t => t.status === 'REFECTION').length,
//         tasks: transformedTasks.filter(t => t.status === 'REFECTION')
//       },
//       {
//         id: 'done',
//         title: 'Terminé',
//         color: 'green-400',
//         count: transformedTasks.filter(t => t.status === 'DONE').length,
//         tasks: transformedTasks.filter(t => t.status === 'DONE')
//       }
//     ];
//   }

//   private transformApiTask(apiTask: any): Task {
//     return {
//       id: apiTask.id,
//       title: apiTask.title,
//       description: apiTask.description,
//       priority: apiTask.priority,
//       status: apiTask.status,
//       assignedUsers: this.getRandomUsers(3),
//       additionalUsers: 4,
//       tag: this.getTagForTask(apiTask),
//       comments: 4, // Mock value
//       attachments: 5, // Mock value
//       dueDate: apiTask.endDate ? new Date(apiTask.endDate).toLocaleDateString() : 'N/A',
//       realEstateProperty: apiTask.realEstateProperty,
//       executors: apiTask.executors,
//       pictures: apiTask.pictures,
//       startDate: apiTask.startDate,
//       endDate: apiTask.endDate
//     };
//   }

//   private getTagForTask(task: any): TaskTag {
//     const tags: Record<string, TaskTag> = {
//       LOW: { name: 'Basse priorité', colorClass: 'bg-blue-50', textColorClass: 'text-blue-500' },
//       MEDIUM: { name: 'Priorité moyenne', colorClass: 'bg-yellow-50', textColorClass: 'text-yellow-500' },
//       HIGH: { name: 'Haute priorité', colorClass: 'bg-red-50', textColorClass: 'text-red-500' },
//       APPROVISIONNEMENT: { name: 'Approvisionnement', colorClass: 'bg-blue-50', textColorClass: 'text-blue-500' },
//       PLANIFICATION: { name: 'Planification', colorClass: 'bg-yellow-50', textColorClass: 'text-yellow-500' }
//     };

//     return tags[task.priority] || tags[task.tag] || { name: 'Tâche', colorClass: 'bg-gray-50', textColorClass: 'text-gray-500' };
//   }

//   private initializeTaskBoardWithMockData(): void {
//     // ... (keep your existing mock data initialization as fallback)
//   }

//   private getRandomUsers(count: number): User[] {
//     const shuffled = [...this.users].sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, count);
//   }

//   // CRUD Operations
//   openAddTaskForm(columnId: string): void {
//     this.newTask = { status: columnId.toUpperCase() };
//     this.isEditMode = false;
//     this.showTaskForm = true;
//   }

//   openEditTaskForm(task: Task): void {
//     this.selectedTask = task;
//     this.newTask = { ...task };
//     this.isEditMode = true;
//     this.showTaskForm = true;
//   }

//   saveTask(): void {
//     if (this.isEditMode && this.selectedTask) {
//       this.taskService.updateTask(this.selectedTask.id, this.newTask).subscribe({
//         next: () => {
//           this.loadTasks();
//           this.resetForm();
//         },
//         error: (err) => console.error('Error updating task:', err)
//       });
//     } else {
//       this.taskService.createTask(this.newTask).subscribe({
//         next: () => {
//           this.loadTasks();
//           this.resetForm();
//         },
//         error: (err) => console.error('Error creating task:', err)
//       });
//     }
//   }

//   deleteTask(taskId: number): void {
//     if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
//       this.taskService.deleteTask(taskId).subscribe({
//         next: () => this.loadTasks(),
//         error: (err) => console.error('Error deleting task:', err)
//       });
//     }
//   }

//   updateTaskStatus(task: Task, newStatus: string): void {
//     this.taskService.updateTaskStatus(task.id, newStatus).subscribe({
//       next: () => this.loadTasks(),
//       error: (err) => console.error('Error updating task status:', err)
//     });
//   }

//   resetForm(): void {
//     this.newTask = {};
//     this.selectedTask = null;
//     this.isEditMode = false;
//     this.showTaskForm = false;
//   }

//   // UI Helpers
//   getStatusColumnTitle(status: string): string {
//     const statusMap: Record<string, string> = {
//       'TODO': 'À faire',
//       'IN_PROGRESS': 'En construction',
//       'REFECTION': 'Travaux de réfection',
//       'DONE': 'Terminé'
//     };
//     return statusMap[status] || status;
//   }

//   trackByColumnId(index: number, column: TaskColumn): string {
//     return column.id;
//   }

//   trackByTaskId(index: number, task: Task): number {
//     return task.id;
//   }
// }
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil, finalize } from 'rxjs';
import { TaskService, TaskServiceError } from '../../core/services/task.service';
import { 
  Task, 
  TaskCreateRequest, 
  TaskUpdateRequest, 
  TaskPriority, 
  TaskStatus,
  Executor,
  RealEstateProperty,
  PaginatedResponse ,
  
} from '../../models/Task';

interface User {
  id: number;
  avatarUrl: string;
}

interface TaskTag {
  name: string;
  colorClass: string;
  textColorClass: string;
}

interface TaskDisplay extends Task {
  title: any;
  description: any;
  priority: any;
  startDate: any;
  endDate: any;
  realEstatePropertyId: any;
  executorIds: any;
  id: any;
  status: TaskStatus;
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
  tasks: TaskDisplay[];
}

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit, OnDestroy {

editTask(_t150: any) {
throw new Error('Method not implemented.');
}

errorMessage: any;
// currentTask: any;
getTasksByStatus: any;
closeTaskForm() {
throw new Error('Method not implemented.');
}

// selectedExecutorId: number | null = null;
// selectedFiles: File[] = [];

showModal = false;

  columns: TaskColumn[] = [];
  users: User[] = [];
  executors: Executor[] = [];
  realEstateProperties: RealEstateProperty[] = [];
  
  // Form data
  newTask: Partial<TaskCreateRequest> = {};
  updateTask: Partial<TaskUpdateRequest> = {};
  
  // UI state
  isEditMode = false;
  selectedTask: TaskDisplay | null = null;
  showTaskForm = false;
  loading = false;
  error: string | null = null;
  
  // Pagination
  currentPage = 1;
  pageSize = 50; // Large page size for kanban board
  totalTasks = 0;

  // File upload


  // Pour gérer la désinscription des observables
  private destroy$ = new Subject<void>();
successMessage: any;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.initializeUsers();
    this.loadInitialData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadInitialData(): void {
    this.loading = true;
    this.error = null;

    // Chargement séquentiel pour éviter les problèmes de concurrence
    this.loadExecutors();
  }

  private loadExecutors(): void {
    this.taskService.getExecutors()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          // Après le chargement des executors, charger les propriétés
          this.loadRealEstateProperties();
        })
      )
      .subscribe({
        next: (response) => {
          this.executors = response.data;
        },
        error: (error: TaskServiceError) => {
          console.error('Error loading executors:', error);
          this.error = error.message;
          // Continuer même en cas d'erreur
          this.loadRealEstateProperties();
        }
      });
  }

  private loadRealEstateProperties(): void {
    this.taskService.getRealEstateProperties()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          // Après le chargement des propriétés, charger les tâches
          this.loadTasks();
        })
      )
      .subscribe({
        next: (response) => {
          this.realEstateProperties = response.data;
        },
        error: (error: TaskServiceError) => {
          console.error('Error loading properties:', error);
          if (!this.error) { // Ne pas écraser une erreur précédente
            this.error = error.message;
          }
          // Continuer même en cas d'erreur
          this.loadTasks();
        }
      });
  }

  private loadTasks(): void {
    this.taskService.getAllTasks(this.currentPage, this.pageSize)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response: PaginatedResponse<Task>) => {
          this.totalTasks = response.total;
          this.organizeTasks(response.data);
          this.error = null; // Réinitialiser l'erreur en cas de succès
        },
        error: (error: TaskServiceError) => {
          console.error('Error loading tasks:', error);
          this.error = error.message;
          this.initializeEmptyColumns();
        }
      });
  }

  private initializeUsers(): void {
    // Mock users - remplacez par vos vraies données utilisateur
    this.users = [
      { id: 1, avatarUrl: 'assets/images/av1.png' },
      { id: 2, avatarUrl: 'assets/images/av2.png' },
      { id: 3, avatarUrl: 'assets/images/av3.png' },
      { id: 4, avatarUrl: 'assets/images/av4.png' }
    ];
  }

  private organizeTasks(apiTasks: Task[]): void {
    // Transform API tasks to display format
    const transformedTasks = apiTasks.map(task => this.transformApiTask(task));

    this.columns = [
      {
        id: 'TODO',
        title: 'À faire',
        color: 'gray',
        count: transformedTasks.filter(t => t.status === TaskStatus.TODO).length,
        tasks: transformedTasks.filter(t => t.status === TaskStatus.TODO)
      },
      {
        id: 'IN_PROGRESS',
        title: 'En construction',
        color: 'yellow-400',
        count: transformedTasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length,
        tasks: transformedTasks.filter(t => t.status === TaskStatus.IN_PROGRESS)
      },
      {
        id: 'REFECTION',
        title: 'Travaux de réfection',
        color: 'orange-400',
        count: transformedTasks.filter(t => t.status === TaskStatus.REFECTION).length,
        tasks: transformedTasks.filter(t => t.status === TaskStatus.REFECTION)
      },
      {
        id: 'DONE',
        title: 'Terminé',
        color: 'green-400',
        count: transformedTasks.filter(t => t.status === TaskStatus.DONE).length,
        tasks: transformedTasks.filter(t => t.status === TaskStatus.DONE)
      },
      {
        id: 'FINITION',
        title: 'Finition',
        color: 'blue-400',
        count: transformedTasks.filter(t => t.status === TaskStatus.FINITION).length,
        tasks: transformedTasks.filter(t => t.status === TaskStatus.FINITION)
      }
    ];
  }

  private initializeEmptyColumns(): void {
    this.columns = [
      { id: 'TODO', title: 'À faire', color: 'gray', count: 0, tasks: [] },
      { id: 'IN_PROGRESS', title: 'En construction', color: 'yellow-400', count: 0, tasks: [] },
      { id: 'REFECTION', title: 'Travaux de réfection', color: 'orange-400', count: 0, tasks: [] },
      { id: 'DONE', title: 'Terminé', color: 'green-400', count: 0, tasks: [] },
      { id: 'FINITION', title: 'Finition', color: 'blue-400', count: 0, tasks: [] }
    ];
  }

  private transformApiTask(apiTask: Task): TaskDisplay {
    return {
      id: apiTask.id!,
      ...apiTask,
      assignedUsers: this.getAssignedUsers(apiTask.executorIds),
      additionalUsers: Math.max(0, apiTask.executorIds.length - 3),
      tag: this.getTagForTask(apiTask),
      comments: 0, // À implémenter selon votre logique
      attachments: apiTask.pictures?.length || 0,
      dueDate: apiTask.endDate ? this.formatDate(apiTask.endDate) : 'N/A',
      isDone: apiTask.status === TaskStatus.DONE
    };
  }

  private getAssignedUsers(executorIds: number[]): User[] {
    // Map executor IDs to user avatars (adaptation selon votre logique)
    return executorIds.slice(0, 3).map(id => 
      this.users.find(user => user.id === id) || 
      { id, avatarUrl: 'assets/images/default-avatar.png' }
    );
  }

  private getTagForTask(task: Task): TaskTag {
    const priorityTags: Record<TaskPriority, TaskTag> = {
      [TaskPriority.LOW]: { 
        name: 'Basse priorité', 
        colorClass: 'bg-blue-50', 
        textColorClass: 'text-blue-500' 
      },
      [TaskPriority.MEDIUM]: { 
        name: 'Priorité moyenne', 
        colorClass: 'bg-yellow-50', 
        textColorClass: 'text-yellow-500' 
      },
      [TaskPriority.HIGH]: { 
        name: 'Haute priorité', 
        colorClass: 'bg-red-50', 
        textColorClass: 'text-red-500' 
      }
    };

    return priorityTags[task.priority] || { 
      name: 'Tâche', 
      colorClass: 'bg-gray-50', 
      textColorClass: 'text-gray-500' 
    };
  }

  private formatDate(dateString: string): string {
    try {
      // Assuming MM-DD-YYYY format from your model
      const [month, day, year] = dateString.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return date.toLocaleDateString('fr-FR');
    } catch {
      return dateString;
    }
  }

  // CRUD Operations
  openAddTaskForm(columnId: string): void {
    this.newTask = { 
      status: columnId as TaskStatus,
      priority: TaskPriority.MEDIUM,
      executorIds: [],
      realEstatePropertyId: this.realEstateProperties[0]?.id || 1
    };
    this.isEditMode = false;
    this.showTaskForm = true;
    this.selectedFiles = [];
  }

  openEditTaskForm(task: TaskDisplay): void {
    this.selectedTask = task;
    this.updateTask = {
      id: task.id!,
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      startDate: task.startDate,
      endDate: task.endDate,
      realEstatePropertyId: task.realEstatePropertyId,
      executorIds: [...task.executorIds]
    };
    this.isEditMode = true;
    this.showTaskForm = true;
    this.selectedFiles = [];
  }


  

  // openModal(task?: Task) {
  //   this.selectedTask = task ? this.transformApiTask(task) : this.createEmptyTaskDisplay();
  //   this.showModal = true;
  // }

  // openModal(task?: Task) {
  //   if (task) {
  //     this.isEditMode = true;
  //     this.updateTask = {
  //       id: task.id,
  //       title: task.title,
  //       description: task.description,
  //       priority: task.priority,
  //       startDate: task.startDate,
  //       endDate: task.endDate,
  //       realEstatePropertyId: task.realEstatePropertyId,
  //       executorIds: task.executorIds,
  //       status: task.status
  //     };
  //     this.selectedExecutorId = task.executorIds[0] || null;
  //   } else {
  //     this.isEditMode = false;
  //     this.newTask = {
  //       title: '',
  //       description: '',
  //       priority: TaskPriority.MEDIUM,
  //       startDate: this.getCurrentDate(),
  //       endDate: this.getCurrentDate(),
  //       realEstatePropertyId: this.realEstateProperties[0]?.id || 1,
  //       executorIds: [],
  //       status: TaskStatus.TODO
  //     };
  //     this.selectedExecutorId = null;
  //   }
  //   this.selectedFiles = [];
  //   this.error = null;
  //   this.showModal = true;
  // }
  
  closeModal() {
    this.showModal = false;
    this.selectedTask = null;
    this.selectedFiles = [];
    this.error = null;
  }
  
  onExecutorChange(executorId: number) {
    if (this.isEditMode) {
      this.updateTask.executorIds = executorId ? [executorId] : [];
    } else {
      this.newTask.executorIds = executorId ? [executorId] : [];
    }
  }
  
  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      this.selectedFiles = Array.from(files);
    }
  }
  
  onBackdropClick(event: Event) {
    // Fermer le modal seulement si on clique sur le backdrop
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
  
  // validateTaskForm(): boolean {
  //   if (this.isEditMode) {
  //     return !!(this.updateTask.title?.trim() && 
  //               this.updateTask.description?.trim() && 
  //               this.updateTask.priority && 
  //               this.updateTask.status);
  //   } else {
  //     return !!(this.newTask.title?.trim() && 
  //               this.newTask.description?.trim() && 
  //               this.newTask.priority && 
  //               this.newTask.status);
  //   }
  // }
  
  // resetForm() {
  //   this.closeModal();
  //   this.selectedFiles = [];
  //   this.selectedExecutorId = null;
  // }

  // Remplacez les propriétés newTask et updateTask par une seule propriété
currentTask: any = {
  id: null,
  title: '',
  description: '',
  priority: TaskPriority.MEDIUM,
  startDate: this.getCurrentDate(),
  endDate: this.getCurrentDate(),
  realEstatePropertyId: 1,
  executorIds: [],
  status: TaskStatus.TODO
};

selectedExecutorId: number | null = null;
selectedFiles: File[] = [];
// isEditMode: boolean = false;

// Méthode openModal corrigée
openModal(task?: Task) {
  if (task) {
    this.isEditMode = true;
    this.currentTask = {
      id: task.id,
      title: task.title,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      endDate: task.endDate,
      realEstatePropertyId: task.realEstatePropertyId,
      executorIds: [...task.executorIds],
      status: task.status
    };
    this.selectedExecutorId = task.executorIds[0] || null;
  } else {
    this.isEditMode = false;
    this.currentTask = {
      id: null,
      title: '',
      description: '',
      priority: TaskPriority.MEDIUM,
      startDate: this.getCurrentDate(),
      endDate: this.getCurrentDate(),
      realEstatePropertyId: this.realEstateProperties[0]?.id || 1,
      executorIds: [],
      status: TaskStatus.TODO
    };
    this.selectedExecutorId = null;
  }
  this.selectedFiles = [];
  this.error = null;
  this.showModal = true;
}

// Méthode onExecutorChange corrigée
// onExecutorChange(executorId: number) {
//   this.currentTask.executorIds = executorId ? [executorId] : [];
// }

// Méthode saveTask corrigée
saveTask(): void {
  if (!this.validateTaskForm()) {
    return;
  }

  this.loading = true;
  this.error = null;

  if (this.isEditMode && this.currentTask.id) {
    // Update existing task
    const updateRequest: TaskUpdateRequest = {
      id: this.currentTask.id,
      title: this.currentTask.title,
      description: this.currentTask.description,
      priority: this.currentTask.priority,
      startDate: this.currentTask.startDate,
      endDate: this.currentTask.endDate,
      realEstatePropertyId: this.currentTask.realEstatePropertyId,
      executorIds: this.currentTask.executorIds,
      status: this.currentTask.status
    };

    if (this.selectedFiles.length > 0) {
      updateRequest.pictures = this.selectedFiles;
    }

    this.taskService.updateTask(updateRequest)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.loadTasks();
          this.resetForm();
        },
        error: (error: TaskServiceError) => {
          this.error = error.message;
          console.error('Error updating task:', error);
        }
      });
  } else {
    // Create new task
    const createRequest: TaskCreateRequest = {
      title: this.currentTask.title || '',
      description: this.currentTask.description || '',
      priority: this.currentTask.priority || TaskPriority.MEDIUM,
      startDate: this.currentTask.startDate || this.getCurrentDate(),
      endDate: this.currentTask.endDate || this.getCurrentDate(),
      realEstatePropertyId: this.currentTask.realEstatePropertyId || 1,
      executorIds: this.currentTask.executorIds || [],
      pictures: this.selectedFiles.length > 0 ? this.selectedFiles : undefined,
      status: this.currentTask.status || TaskStatus.TODO,
    };

    this.taskService.createTask(createRequest)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.loadTasks();
          this.resetForm();
        },
        error: (error: TaskServiceError) => {
          this.error = error.message;
          console.error('Error creating task:', error);
        }
      });
  }
}

// Méthode validateTaskForm corrigée
validateTaskForm(): boolean {
  return !!(this.currentTask.title?.trim() && 
            this.currentTask.description?.trim() && 
            this.currentTask.priority && 
            this.currentTask.status);
}

// Autres méthodes restent inchangées
// closeModal() {
//   this.showModal = false;
//   this.selectedTask = null;
//   this.selectedFiles = [];
//   this.error = null;
// }

// onFileSelected(event: any) {
//   const files = event.target.files;
//   if (files) {
//     this.selectedFiles = Array.from(files);
//   }
// }

// onBackdropClick(event: Event) {
//   if (event.target === event.currentTarget) {
//     this.closeModal();
//   }
// }

resetForm() {
  this.closeModal();
  this.selectedFiles = [];
  this.selectedExecutorId = null;
}
  
  private createEmptyTaskDisplay(): TaskDisplay {
    const defaultTask: Task = {
      id: 0,
      title: '',
      description: '',
      priority: TaskPriority.MEDIUM,
      status: TaskStatus.TODO,
      startDate: this.getCurrentDate(),
      endDate: this.getCurrentDate(),
      realEstatePropertyId: this.realEstateProperties[0]?.id || 1,
      executorIds: []
    };
    
    return this.transformApiTask(defaultTask);
  }
  // closeModal() {
  //   this.selectedTask = null;
  //   this.showModal = false;
  // }
  // saveTask(): void {
  //   if (!this.validateTaskForm()) {
  //     return;
  //   }

  //   this.loading = true;
  //   this.error = null;

  //   if (this.isEditMode && this.selectedTask && this.updateTask.id) {
  //     // Update existing task
  //     if (this.selectedFiles.length > 0) {
  //       this.updateTask.pictures = this.selectedFiles;
  //     }
      
  //     this.taskService.updateTask(this.updateTask as TaskUpdateRequest)
  //       .pipe(
  //         takeUntil(this.destroy$),
  //         finalize(() => {
  //           this.loading = false;
  //         })
  //       )
  //       .subscribe({
  //         next: (response) => {
  //           this.loadTasks();
  //           this.resetForm();
  //         },
  //         error: (error: TaskServiceError) => {
  //           this.error = error.message;
  //           console.error('Error updating task:', error);
  //         }
  //       });
  //   } else {
  //     // Create new task


      
  //     const createRequest: TaskCreateRequest = {
  //       title: this.newTask.title || '',
  //       description: this.newTask.description || '',
  //       priority: this.newTask.priority || TaskPriority.MEDIUM,
  //       startDate: this.newTask.startDate || this.getCurrentDate(),
  //       endDate: this.newTask.endDate || this.getCurrentDate(),
  //       realEstatePropertyId: this.newTask.realEstatePropertyId || 1,
  //       executorIds: this.newTask.executorIds || [],
  //       pictures: this.selectedFiles.length > 0 ? this.selectedFiles : undefined,
  //       status: this.newTask.status || TaskStatus.TODO,
  //     };

  //     this.taskService.createTask(createRequest)
  //       .pipe(
  //         takeUntil(this.destroy$),
  //         finalize(() => {
  //           this.loading = false;
  //         })
  //       )
  //       .subscribe({
  //         next: (response) => {
  //           this.loadTasks();
  //           this.resetForm();
  //         },
  //         error: (error: TaskServiceError) => {
  //           this.error = error.message;
  //           console.error('Error creating task:', error);
  //         }
  //       });
  //   }
  // }

  deleteTask(taskId: number): void {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      return;
    }

    this.loading = true;
    
    this.taskService.deleteTask(taskId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.loadTasks();
        },
        error: (error: TaskServiceError) => {
          this.error = error.message;
          console.error('Error deleting task:', error);
        }
      });
  }

  updateTaskStatus(task: TaskDisplay, newStatus: TaskStatus): void {
    this.taskService.updateTaskStatus(task.id!, newStatus)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {
          this.loadTasks();
        },
        error: (error: TaskServiceError) => {
          this.error = error.message;
          console.error('Error updating task status:', error);
        }
      });
  }

  // File handling
  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  uploadImages(taskId: number, files: File[]): void {
    this.taskService.uploadTaskImages(taskId, files)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {
          console.log('Images uploaded successfully:', response.data);
          this.loadTasks(); // Recharger les tâches pour mettre à jour l'affichage
        },
        error: (error: TaskServiceError) => {
          console.error('Error uploading images:', error);
          this.error = error.message;
        }
      });
  }

  // public validateTaskForm(): boolean {
  //   if (this.isEditMode) {
  //     if (!this.updateTask.title?.trim()) {
  //       this.error = 'Le titre est requis';
  //       return false;
  //     }
  //     if (!this.updateTask.description?.trim()) {
  //       this.error = 'La description est requise';
  //       return false;
  //     }
  //   } else {
  //     if (!this.newTask.title?.trim()) {
  //       this.error = 'Le titre est requis';
  //       return false;
  //     }
  //     if (!this.newTask.description?.trim()) {
  //       this.error = 'La description est requise';
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  // resetForm(): void {
  //   this.newTask = {};
  //   this.updateTask = {};
  //   this.selectedTask = null;
  //   this.isEditMode = false;
  //   this.showTaskForm = false;
  //   this.selectedFiles = [];
  //   this.error = null;
  // }

  // Utility methods
  private getCurrentDate(): string {
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const year = now.getFullYear();
    return `${month}-${day}-${year}`;
  }

  clearError(): void {
    this.error = null;
  }

  // Méthodes de rechargement manuel
  refreshTasks(): void {
    this.loadTasks();
  }

  refreshAll(): void {
    this.loadInitialData();
  }

  // UI Helpers
  getStatusColumnTitle(status: string): string {
    const statusMap: Record<string, string> = {
      'TODO': 'À faire',
      'IN_PROGRESS': 'En construction',
      'REFECTION': 'Travaux de réfection',
      'DONE': 'Terminé',
      'FINITION': 'Finition'
    };
    return statusMap[status] || status;
  }

  getExecutorName(executorId: number): string {
    const executor = this.executors.find(e => e.id === executorId);
    return executor?.name || `Exécuteur ${executorId}`;
  }

  getPropertyName(propertyId: number): string {
    const property = this.realEstateProperties.find(p => p.id === propertyId);
    return property?.name || `Propriété ${propertyId}`;
  }

  getPriorityLabel(priority: TaskPriority): string {
    const labels: Record<TaskPriority, string> = {
      [TaskPriority.LOW]: 'Basse',
      [TaskPriority.MEDIUM]: 'Moyenne',
      [TaskPriority.HIGH]: 'Haute'
    };
    return labels[priority];
  }

  trackByColumnId(index: number, column: TaskColumn): string {
    return column.id;
  }

  trackByTaskId(index: number, task: TaskDisplay): number {
    return task.id!;
  }

  // Drag and drop
  onDragStart(event: DragEvent, task: TaskDisplay): void {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', task.id!.toString());
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent, targetStatus: TaskStatus): void {
    event.preventDefault();
    
    if (event.dataTransfer) {
      const taskId = parseInt(event.dataTransfer.getData('text/plain'));
      const task = this.findTaskById(taskId);
      
      if (task && task.status !== targetStatus) {
        this.updateTaskStatus(task, targetStatus);
      }
    }
  }

  private findTaskById(taskId: number): TaskDisplay | undefined {
    for (const column of this.columns) {
      const task = column.tasks.find(t => t.id === taskId);
      if (task) return task;
    }
    return undefined;
  }
}