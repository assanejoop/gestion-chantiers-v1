import { Injectable } from '@angular/core';
import { Chart, ChartConfiguration, ChartTypeRegistry } from 'chart.js/auto';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() {}

  // Méthode pour créer un graphique en anneau (doughnut)
  createDoughnutChart(
    ctx: HTMLCanvasElement, 
    value: number, 
    color: string = '#f97316',
    backgroundColor: string = '#e2e8f0'
  ): Chart {
    return new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [value, 100 - value],
          backgroundColor: [
            color,
            backgroundColor
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        }
      }
    });
  }

  // Méthode pour créer un graphique en barres
  createBarChart(
    ctx: HTMLCanvasElement, 
    labels: string[], 
    data: number[], 
    colors: string[] = ['#4ade80', '#f59e0b', '#e2e8f0'],
    maxValue: number = 100
  ): Chart {
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors,
          borderWidth: 0,
          borderRadius: 4,
          barThickness: 40
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: maxValue,
            ticks: {
              stepSize: maxValue / 5
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  // Méthode pour créer un graphique en ligne
  createLineChart(
    ctx: HTMLCanvasElement, 
    labels: string[], 
    data: number[], 
    lineColor: string = '#f97316',
    fillColor: string = 'rgba(249, 115, 22, 0.1)',
    maxValue: number = 6
  ): Chart {
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          borderColor: lineColor,
          backgroundColor: fillColor,
          borderWidth: 2,
          pointBackgroundColor: lineColor,
          pointRadius: 4,
          tension: 0.2,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: maxValue,
            ticks: {
              stepSize: 1
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  // Méthode pour nettoyer un graphique existant
  destroyChart(chart: Chart | undefined): void {
    if (chart) {
      chart.destroy();
    }
  }
}