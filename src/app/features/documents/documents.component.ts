import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Document {
  name: string;
  thumbnail: string;
}

interface Person {
  name: string;
  role: string;
  avatar: string;
}

interface File {
  name: string;
  selected: boolean;
  createdBy: Person;
  size: string;
  date: string;
  lastModified: string;
}

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  recentActivities: Document[] = [
    {
      name: 'Dossier d\'Assurance Chantier.doc',
      thumbnail: 'assets/images/doc1.png'
    },
    {
      name: 'Autorisation d\'occupation du domaine public.pdf',
      thumbnail: 'assets/images/doc2.png'
    },
    {
      name: 'Notes de Calcul Structurelles.xls',
      thumbnail: 'assets/images/doc3.png'
    },
    {
      name: 'Plans d\'Exécution.xls',
      thumbnail: 'assets/images/doc4.png'
    }
  ];

  recentFiles: File[] = [
    {
      name: 'Étude de Sol et Géotechnique.doc',
      selected: true,
      createdBy: {
        name: 'Lamine Niang',
        role: 'Chef de chantier',
       avatar: 'assets/images/av2.svg'
      },
      size: '675 MB',
      date: 'Mar 7, 2025',
      lastModified: 'Mai 6, 2025'
    },
    {
      name: 'Fiches de Suivi des Travaux.pdf',
      selected: true,
      createdBy: {
        name: 'Amine Sene',
        role: 'Chef de chantier',
        avatar: 'assets/images/av9.svg'
      },
      size: '208 MB',
      date: 'Mar 11, 2025',
      lastModified: 'Mai 4, 2025'
    },
    {
      name: 'Fiches de Contrôle Qualité.xls',
      selected: false,
      createdBy: {
        name: 'Aziz Diop',
        role: 'Chef de chantier',
        avatar: 'assets/images/av1.svg'
      },
      size: '18 MB',
      date: 'Mar 28, 2025',
      lastModified: 'Mai 3, 2025'
    },
    {
      name: 'Certificat de Conformité.doc',
      selected: false,
      createdBy: {
        name: 'Alpha Dieye',
        role: 'Chef de chantier',
       avatar: 'assets/images/av3.png'
      },
      size: '30 MB',
      date: 'Mar 30, 2025',
      lastModified: 'Mai 2, 2025'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  toggleFileSelection(file: File): void {
    file.selected = !file.selected;
  }
}