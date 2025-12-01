import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service'; 
import { HttpErrorResponse } from '@angular/common/http'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  nombre: string = ''; 
  email: string = '';
  password: string = '';
  
  errorMessage: string | null = null;
  loading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService 
  ) {}

  onRegister() {
    this.errorMessage = null; 

    // Validación: Se verifican todos los campos
    if (!this.nombre || !this.email || !this.password) {
      this.errorMessage = 'Por favor completa todos los campos requeridos.';
      return; 
    }
    
    this.loading = true;

    // Llamada al backend usando el AuthService
    this.authService.register({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        console.log('Registro exitoso. ID:', response._id);
        this.router.navigate(['/login']); 
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Error de conexión. Asegúrate de que el servidor Node.js esté activo.';
        }
        console.error('Error de registro desde el servidor:', err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  // ESTA FUNCIÓN ESTABA MAL UBICADA Y AHORA ESTÁ DENTRO DE LA CLASE
  onGoogleSignIn(): void {
    this.errorMessage = null; 
    this.loading = true;

    this.authService.loginWithGoogle().subscribe({
        next: (response) => {
            // Éxito de autenticación en Firebase
            console.log('Autenticación con Google exitosa. Token:', response.idToken);
            this.router.navigate(['/dashboard']); 
        },
        error: (err) => {
            this.loading = false;
            // Maneja el error de Firebase (ej. usuario cerró el popup)
            this.errorMessage = 'Fallo en la autenticación con Google.';
            console.error('Error de Google Auth:', err);
        },
        complete: () => {
            this.loading = false;
        }
    });
  }
}