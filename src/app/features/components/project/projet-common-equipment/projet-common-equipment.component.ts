import { Component, OnInit } from '@angular/core';
import { EquipementCommun } from '../../../../models/projet';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projet-common-equipment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projet-common-equipment.component.html',
  styleUrl: './projet-common-equipment.component.css'
})


export class ProjetCommonEquipmentComponent implements OnInit {
  equipementsCommuns: EquipementCommun[] = [
    {
      nom: 'Hall d\'entrée',
      description: 'Espace d\'accueil de l\'immeuble',
      icone: 'door'
    },
    {
      nom: 'Escaliers et ascenseurs',
      description: 'Zones permettant d\'accéder aux différents niveaux',
      icone: 'stairs'
    },
    {
      nom: 'Couloirs',
      description: 'Espaces de circulation entre les différentes unités',
      icone: 'hallway'
    },
    {
      nom: 'Jardins ou terrasses partagés',
      description: 'Espaces extérieurs accessibles à tous',
      icone: 'garden'
    }
  ];

  constructor() { }

  ngOnInit(): void { }
}