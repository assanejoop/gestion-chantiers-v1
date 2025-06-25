import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProgressReportComponent } from "../../dashboard/progess-report/progess-report.component";
import { FormsModule } from '@angular/forms';

interface Album {
  id: number;
  title: string;
  date: string;
  photoCount: number;
  image: string;
  type: 'planning' | 'construction';
}

@Component({
  selector: 'app-status-report',
  standalone: true,
  imports: [CommonModule, ProgressReportComponent,FormsModule],
  templateUrl: './status-report.component.html',
  styleUrl: './status-report.component.css'
})

export class StatusReportComponent {
  activeTab: 'albums' | 'graphique' | 'tableau' = 'albums';


  pourcentages: string[] = ['0%', '10%', '20%', '30%', '40%', '50%', '60%', '66%', '70%', '80%', '90%', '100%'];

  lignes = [
    { etape: 'Gros œuvre', pourcentage: '66%', date: '04/03/2025' },
    { etape: 'Second œuvre', pourcentage: '60%', date: '11/05/2025' },
    { etape: 'Finition', pourcentage: '', date: '' }
  ];
  

  
  albums: Album[] = [
    {
      id: 1,
      title: 'Phase 1',
      date: '23/10/2024',
      photoCount: 3,
      image: 'assets/images/phase1-planning.jpg',
      type: 'planning'
    },
    {
      id: 2,
      title: 'Construction',
      date: '25/10/2024',
      photoCount: 5,
      image: 'assets/images/construction-site.jpg',
      type: 'construction'
    }
  ];




  setActiveTab(tab: 'albums' | 'graphique' | 'tableau') {
    this.activeTab = tab;
  }
  onAddClick(): void {
    console.log('Ajouter clicked');
    // Logique pour ajouter un nouvel élément
  }

  onAlbumAction(action: string, id: number) {
    // Implémentation de l'action
    console.log(`Action: ${action}, ID: ${id}`);
  }
}

 



  








      