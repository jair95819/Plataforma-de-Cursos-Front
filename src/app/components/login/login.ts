import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // 1. Importar HttpClient

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onLogin() {
    if (this.email && this.password) {
      
      // Preparamos el JSON
      const credenciales = {
        email: this.email,
        password: this.password // Este debe coincidir con lo que espera el AuthController en Java
      };

      // 4. Petición POST al backend
      this.http.post('http://localhost:8080/api/auth/login', credenciales)
        .subscribe({
          next: (response: any) => {
            console.log('Login exitoso:', response);
            
            // 5. GUARDAR SESIÓN (Básico para MVP)
            // Guardamos el objeto usuario en el navegador para saber que está logueado
            localStorage.setItem('usuario', JSON.stringify(response));
            
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            console.error('Error login:', error);
            alert('Credenciales incorrectas. Intenta de nuevo.');
          }
        });

    } else {
      alert('Por favor ingresa correo y contraseña');
    }
  }
}