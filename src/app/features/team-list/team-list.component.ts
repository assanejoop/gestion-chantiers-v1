import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamMember {
  name: string;
  role: string;
  phone: string;
  address: string;
  email: string;
  avatar: string;
}

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  teamMembers: TeamMember[] = [
    {
      name: 'Alpha Dieye',
      role: 'Maître d\'ouvrage',
      phone: '706458792',
      address: 'Medina, Dakar',
      email: 'contact@immobilieralpha.sn',
      avatar: 'assets/images/av3.png'
    },
    {
      name: 'Maguette Ndiaye',
      role: 'Maître d\'œuvre',
      phone: '777178294',
      address: 'Yoff,Dakar',
      email: 'maguette@gmail.com',
      avatar: 'assets/images/av6.png'
    },
    {
      name: 'Aziz Diop',
      role: 'Ouvier',
      phone: '786547890',
      address: 'Grand Mbao, Rufisque',
      email: 'aziz@gmail.com',
      avatar: 'assets/images/av1.svg'
    },
    {
      name: 'Lamine Niang',
      role: 'Chef de chantier',
      phone: '776453281',
      address: 'Thiaroye, Dakr',
      email: 'lamine@gmail.com',
      avatar: 'assets/images/av2.svg'
    },
    {
      name: 'Youssoupha Dieme',
      role: 'Ouvrier',
      phone: '775431629',
      address: 'Medina, Dakar',
      email: 'youssoupha@gmail.com',
      avatar: 'assets/images/av9.svg'
    },
    {
      name: 'Abdoulaye Gueye',
      role: 'Ouvier',
      phone: '785643654',
      address: 'Pikine, Dakar',
      email: 'abdoulaye@gmail.com',
      avatar: 'assets/images/av3.png'
    },
    {
      name: 'Amine Sene',
      role: 'Ouvrier',
      phone: '765348907',
      address: 'Fass, Dakar',
      email: 'amine@gmail.com',
      avatar: 'assets/images/av9.svg'
    }
  ];

  currentPage = 1;
  totalPages = 2;
  
  constructor() { }

  ngOnInit(): void {
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}