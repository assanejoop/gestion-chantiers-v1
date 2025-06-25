import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface PerformanceSummary {
  tauxMoyenAvancement: number;
  budgetConsomme: number;
  incidents: number;
  presenceMoyenne: number;
  tachesRetard: number;
  materiauxAlerte: number;
}

@Component({
  selector: 'app-performance-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './performance-summary.component.html',
  styleUrl: './performance-summary.component.css'
})
export class PerformanceSummaryComponent {
  @Input() summary: PerformanceSummary | null = null;

}
