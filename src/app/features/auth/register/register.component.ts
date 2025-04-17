import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  implements OnInit {


  
    profileForm: FormGroup;
    currentStep: number = 1;
    selectedImage: string | null = null;
    imageFile: File | null = null;
    
    // Liste des postes pour le menu déroulant
    jobTitles: string[] = [
      'Directeur de projet',
      'Chef de chantier',
      'Architecte',
      'Ingénieur',
      'Conducteur de travaux',
      'Ouvrier qualifié',
      'Entrepreneur',
      'Responsable sécurité',
      'Administrateur',
      'Autre'
    ];
  
    constructor(
      private fb: FormBuilder,
      private router: Router
    ) {
      this.profileForm = this.fb.group({
        fullName: ['', Validators.required],
        companyName: ['', Validators.required],
        jobTitle: ['', Validators.required]
      });
    }
  
    ngOnInit(): void {
      // Initialisation supplémentaire si nécessaire
    }
  
    nextStep(): void {
      if (this.currentStep === 1 && this.profileForm.valid) {
        this.currentStep = 2;
      }
    }
  
    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.imageFile = input.files[0];
        
        // Création d'une URL pour l'aperçu de l'image
        const reader = new FileReader();
        reader.onload = () => {
          this.selectedImage = reader.result as string;
        };
        reader.readAsDataURL(this.imageFile);
      }
    }
  
    onSubmit(): void {
      // Combiner les données du formulaire avec l'image sélectionnée
      const profileData = {
        ...this.profileForm.value,
        profileImage: this.imageFile
      };
      
      console.log('Profil complet soumis:', profileData);
      
      // Envoyer les données au service approprié
      // ...
      
      // Redirection vers le tableau de bord ou la page suivante
      this.router.navigate(['/dashboard/projects']);
    }
    navigateToLogin(): void {
      this.router.navigate(['/login']);
    }
  }