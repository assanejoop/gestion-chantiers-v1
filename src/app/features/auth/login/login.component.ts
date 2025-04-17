import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ], 
})
export class LoginComponent implements OnInit {
  activeTab: 'connexion' | 'inscription' = 'connexion';
  showPassword = false;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Initialisation supplémentaire si nécessaire
  }
  navigateToRegister(): void {
    this.router.navigateByUrl('/register'); // Alternative plus directe
  }

  setActiveTab(tab: 'connexion' | 'inscription'): void {
    this.activeTab = tab;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      // Logique de connexion à implémenter
      console.log('Formulaire soumis:', this.loginForm.value);
      // this.router.navigate(['/dashboard']);
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      this.loginForm.markAllAsTouched();
    }
  }
  
}