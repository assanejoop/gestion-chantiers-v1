// dossiers.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DossierService } from '../../dossier.service/services/services.component';
import { Dossier } from '../../models/dossier';
import { ProjectDetailHeaderComponent } from "../project-detail-header/project-detail-header.component";
@Component({
  selector: 'app-dossiers',
  templateUrl: './dossiers.component.html',
  standalone: true,
  imports: [CommonModule,]
})
export class DossiersComponent implements OnInit {
  dossiers: Dossier[] = [];

  constructor(private dossierService: DossierService) {}

  ngOnInit(): void {
    this.loadDossiers();
  }

  loadDossiers(): void {
    this.dossierService.getDossiers().subscribe({
      next: (data) => {
        this.dossiers = data;
      },
      error: (err) => {
        console.error('Error loading dossiers:', err);
      }
    });
  }
}