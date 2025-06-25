import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';


export interface CriticalTask {
  nom: string;
  echeance: string;
  status: string;
  jours: number;
}

@Component({
  selector: 'app-critical-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './critical-task.component.html',
  styleUrl: './critical-task.component.css'
})
export class CriticalTaskComponent {
  @Input() tasks: CriticalTask[] = [];

  

  getStatusColor(status: string): string {
    switch (status) {
    
      case 'En retard': return 'bg-red-500';
      case 'Urgent': return 'bg-[#F39C12]';
      case 'À jour': return 'bg-[#2ECC71]';
      default: return 'bg-[#2ECC71]';
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'En retard': return 'bg-red-500 text-white rounded-full';
      case 'Urgent': return 'bg-[#F39C12] text-white rounded-full';
      case 'À jour': return 'bg-[#2ECC71] text-white  rounded-full';
      default: return 'bg-[#2ECC71]  text-white rounded-full';
    }
  }

}
