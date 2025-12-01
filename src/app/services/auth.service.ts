import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, map } from 'rxjs'; 
// Importamos solo lo necesario para Google Auth
import { Auth, GoogleAuthProvider, signInWithPopup, UserCredential } from '@angular/fire/auth';

// Define las interfaces...
interface RegisterData { email: string; password: string; }
interface RegisterResponse { _id: string; email: string; message: string; }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:5000/api/auth'; 

  constructor(private http: HttpClient, private auth: Auth) { } 

  // 1. Método de registro local (sin cambios)
  register(data: RegisterData): Observable<RegisterResponse> {
    const url = `${this.apiUrl}/register`;
    return this.http.post<RegisterResponse>(url, data);
  }

  /**
   * 2. Inicia sesión con Google.
   */
  loginWithGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider();
    
    // Convertimos la Promesa de signInWithPopup a un Observable
    return from(signInWithPopup(this.auth, provider)).pipe(
      map((result: UserCredential) => {
        // Obtenemos el token de la credencial
        const idToken = (result.user as any).accessToken; 
        
        if (!idToken) {
          throw new Error("No se pudo obtener el token de acceso de Google.");
        }
        
        return { idToken };
      })
    );
  }
}