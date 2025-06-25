// import { CommonModule } from '@angular/common';
// import { Component, inject, Input } from '@angular/core';
// import { DahsboardService } from '../../../../core/services/dahsboard.service';
// import { AuthService } from '../../../auth/services/auth.service';

// export interface ProjectPhoto {
//   url: string;
//   titre: string;
//   date: string;
//   photo: string;
  
// }

// @Component({
//   selector: 'app-photo-project',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './photo-project.component.html',
//   styleUrl: './photo-project.component.css'
// })
// export class PhotoProjectComponent {
  
//   @Input() photos: ProjectPhoto[] = [];

//   private dashboardService = inject(DahsboardService);
//   private authService = inject(AuthService);
// pickture: any;

//   ngOnInit(): void {
//     this.authService.getCurrentUser().subscribe({
//       next: (user) => {
//         if (!user?.id) {
//           console.error('Utilisateur non connecté');
//           return;
//         }

//         const promoterId = user.id;

//         this.dashboardService.getRecentProgressAlbums(promoterId).subscribe({
//           next: (data: ProjectPhoto[]) => {
//             this.photos = data;
//           },
//           error: (err) => {
//             console.error('Erreur lors du chargement des photos :', err);
//           }
//         });
//       },
//       error: (err) => {
//         console.error('Erreur lors de la récupération de l’utilisateur :', err);
//       }
//     });
//   }
// }

import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { DahsboardService } from '../../../../core/services/dahsboard.service';
import { AuthService } from '../../../auth/services/auth.service';

export interface ProjectPhoto {
  url: string;
  titre: string;
  date: string;
  photo: string;
}

@Component({
  selector: 'app-photo-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo-project.component.html',
  styleUrl: './photo-project.component.css'
})
export class PhotoProjectComponent implements OnInit {
  @Input() photos: ProjectPhoto[] = [];
  
  private dashboardService = inject(DahsboardService);
  private authService = inject(AuthService);
  
  isLoading = false;
  error: string | null = null;

  ngOnInit(): void {
    this.loadPhotos();
  }

  private loadPhotos(): void {
    this.isLoading = true;
    this.error = null;

    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        if (!user?.id) {
          this.error = 'Utilisateur non connecté';
          this.isLoading = false;
          return;
        }

        const promoterId = user.id;
        this.dashboardService.getRecentProgressAlbums(promoterId).subscribe({
          next: (data: ProjectPhoto[]) => {
            this.photos = data || [];
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Erreur lors du chargement des photos :', err);
            this.error = 'Erreur lors du chargement des photos';
            this.isLoading = false;
          }
        });
      },
      error: (err) => {
        // console.error('Erreur lors de la récupération de l'utilisateur :', err);
        this.error = 'Erreur de connexion utilisateur';
        this.isLoading = false;
      }
    });
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    // Image de fallback en cas d'erreur
    img.src = 'assets/images/placeholder-image.png';
  }

  retryLoad(): void {
    this.loadPhotos();
  }
}

