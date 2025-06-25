// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-statistique',
//   standalone: true,
//   imports: [],
//   templateUrl: './statistique.component.html',
//   styleUrl: './statistique.component.css'
// })
// export class StatistiqueComponent {

  
// }
import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart, ChartConfiguration, ChartType } from 'chart.js/auto';

interface StatsData {
  materialsUsed: number;
  ordersPlaced: number;
  deliveriesReceived: number;
  alertsTriggered: number;
}

interface CategoryData {
  label: string;
  percentage: number;
  color: string;
}

interface MaterialData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}


@Component({
  selector: 'app-statistique',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './statistique.component.html',
  styleUrl: './statistique.component.css'
})
export class StatistitqueComponent implements OnInit, AfterViewInit {
  @ViewChild('categoryChart', { static: false }) categoryChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('evolutionChart', { static: false }) evolutionChartRef!: ElementRef<HTMLCanvasElement>;

  categoryChart!: Chart;
  evolutionChart!: Chart;
  selectedPeriod = 'current';

  statsData: StatsData = {
    materialsUsed: 780,
    ordersPlaced: 25,
    deliveriesReceived: 22,
    alertsTriggered: 3
  };

  categoryData: CategoryData[] = [
    { label: 'Béton', percentage: 35, color: '#4285F4' },
    { label: 'Plomberie', percentage: 25, color: '#34A853' },
    { label: 'Structure', percentage: 20, color: '#FBBC04' },
    { label: 'Finition', percentage: 10, color: '#4ECDC4' },
    { label: 'Autres', percentage: 10, color: '#9E9E9E' }
  ];

  topMaterials: MaterialData[] = [
    { name: 'Ciment', value: 150, percentage: 45, color: '#9C88FF' },
    { name: 'Acier', value: 340, percentage: 100, color: '#FF6B9D' },
    { name: 'Briques', value: 80, percentage: 24, color: '#FFD93D' },
    { name: 'Peinture', value: 50, percentage: 15, color: '#6BCF7F' },
    { name: 'PVC', value: 50, percentage: 15, color: '#4ECDC4' }
  ];

  monthlyEvolutionData = {
    labels: ['Jan', 'Fév', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil'],
    data: [120, 128, 135, 142, 155, 160, 170]
  };

  ngOnInit(): void {
    // Initialisation des données
  }

  ngAfterViewInit(): void {
    this.initCategoryChart();
    this.initEvolutionChart();
  }

  private initCategoryChart(): void {
    const ctx = this.categoryChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'doughnut' as ChartType,
      data: {
        labels: this.categoryData.map(item => item.label),
        datasets: [{
          data: this.categoryData.map(item => item.percentage),
          backgroundColor: this.categoryData.map(item => item.color),
          borderWidth: 0,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        // cutout: '60%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return `${context.label}: ${context.parsed}%`;
              }
            }
          }
        }
      }
    };

    this.categoryChart = new Chart(ctx, config);
  }

  private initEvolutionChart(): void {
    const ctx = this.evolutionChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'line' as ChartType,
      data: {
        labels: this.monthlyEvolutionData.labels,
        datasets: [{
          data: this.monthlyEvolutionData.data,
          borderColor: '#FF6B47',
          backgroundColor: 'rgba(255, 107, 71, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#FF6B47',
          pointBorderColor: '#FF6B47',
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            border: {
              display: false
            }
          },
          y: {
            beginAtZero: false,
            min: 110,
            max: 180,
            grid: {
              color: '#f0f0f0'
            },
            border: {
              display: false
            },
            ticks: {
              stepSize: 10
            }
          }
        },
        elements: {
          point: {
            hoverRadius: 8
          }
        }
      }
    };

    this.evolutionChart = new Chart(ctx, config);
  }

  onPeriodChange(): void {
    // Logic pour changer les données selon la période sélectionnée
    console.log('Période sélectionnée:', this.selectedPeriod);
    // Vous pouvez ici faire un appel API pour récupérer les nouvelles données
    // et mettre à jour les graphiques
  }

  private updateCharts(): void {
    // Méthode pour mettre à jour les graphiques avec de nouvelles données
    if (this.categoryChart) {
      this.categoryChart.update();
    }
    if (this.evolutionChart) {
      this.evolutionChart.update();
    }
  }

  ngOnDestroy(): void {
    if (this.categoryChart) {
      this.categoryChart.destroy();
    }
    if (this.evolutionChart) {
      this.evolutionChart.destroy();
    }
  }
}