// progress-report.component.ts - Compatible SSR avec données API
import { Component, Input, AfterViewInit, ElementRef, ViewChild, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { DahsboardService,PropertyIndicator } from '../../../../core/services/dahsboard.service';

interface ProgressItem {
  label: string;
  value: number;
  lastUpdated?: string;
}

@Component({
  selector: 'app-progess-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progess-report.component.html',
  styleUrl: './progess-report.component.css'
})
export class ProgressReportComponent implements OnInit, AfterViewInit {
  @Input() title: string = '';
  @Input() percentage: number = 0;
  @Input() iconName: string = '';
  @Input() chartId: string = 'progressChart';
  @Input() propertyId: number = 3; // ID de la propriété, peut être passé en Input
  @ViewChild('barChart') chartCanvas!: ElementRef<HTMLCanvasElement>;
  
  private chart: Chart | undefined;
  private isBrowser: boolean;

  // États de chargement et d'erreur
  isLoading: boolean = true;
  error: string | null = null;

  progressData: ProgressItem[] = [];

  // Mapping des noms de phases pour l'affichage
  private phaseDisplayNames: { [key: string]: string } = {
    'GROS_OEUVRE': 'Gros œuvre',
    'SECOND_OEUVRE': 'Second œuvre',
    'FINITION': 'Finition'
  };

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private dashboardService: DahsboardService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.loadIndicatorsData();
  }

  ngAfterViewInit(): void {
    // N'exécuter la création de Chart.js que côté navigateur et si les données sont chargées
    if (this.isBrowser && !this.isLoading && !this.error) {
      this.createChart();
    }
  }

  private loadIndicatorsData(): void {
    this.isLoading = true;
    this.error = null;
    
    this.dashboardService.getPropertyIndicators(this.propertyId).subscribe({
      next: (indicators: PropertyIndicator[]) => {
        // Transformation des données API en format utilisable par le graphique
        this.progressData = indicators.map(indicator => ({
          label: this.phaseDisplayNames[indicator.phaseName] || indicator.phaseName,
          value: indicator.progressPercentage,
          lastUpdated: indicator.lastUpdated
        }));
        
        this.isLoading = false;
        
        // Créer le graphique après le chargement des données (côté navigateur uniquement)
        if (this.isBrowser && this.chartCanvas) {
          setTimeout(() => this.createChart(), 0);
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des indicateurs:', error);
        this.error = 'Erreur lors du chargement des données';
        this.isLoading = false;
        
        // Données par défaut en cas d'erreur
        this.progressData = [
          { label: 'Gros œuvre', value: 0 },
          { label: 'Second œuvre', value: 0 },
          { label: 'Finition', value: 0 }
        ];
        
        if (this.isBrowser && this.chartCanvas) {
          setTimeout(() => this.createChart(), 0);
        }
      }
    });
  }

  private createChart(): void {
    // Vérification supplémentaire pour s'assurer que nous sommes dans un navigateur
    if (!this.isBrowser || !this.chartCanvas || this.progressData.length === 0) return;

    try {
      // Détruire le graphique existant s'il y en a un
      if (this.chart) {
        this.chart.destroy();
      }

      const ctx = this.chartCanvas.nativeElement.getContext('2d');
      if (!ctx) return;

      const labels = this.progressData.map(item => item.label);
      const data = this.progressData.map(item => item.value);
      
      // Couleurs dynamiques basées sur le pourcentage
      const backgroundColors = data.map(value => {
        if (value >= 80) return '#2ECC71'; // Vert pour > 80%
        if (value >= 50) return '#F39C12'; // Orange pour 50-79%
        if (value >= 20) return '#E74C3C'; // Rouge pour 20-49%
        return '#EAECF0'; // Gris pour < 20%
      });
      
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors.map(color => color),
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                stepSize: 20,
                callback: function(value) {
                  return value + '%';
                }
              }
            },
            x: {
              ticks: {
                maxRotation: 45,
                minRotation: 0
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const dataIndex = context.dataIndex;
                  const progressItem = this.progressData[dataIndex];
                  let tooltipText = `${context.parsed.y}%`;
                  
                  if (progressItem.lastUpdated) {
                    const date = new Date(progressItem.lastUpdated);
                    tooltipText += `\nMis à jour: ${date.toLocaleDateString('fr-FR')}`;
                  }
                  
                  return tooltipText;
                }
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Erreur lors de la création du graphique:', error);
    }
  }

  // Méthode pour rafraîchir les données
  refreshData(): void {
    this.loadIndicatorsData();
  }

  // Nettoyage lors de la destruction du composant
  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}