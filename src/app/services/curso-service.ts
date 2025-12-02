import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz para representar la estructura del Curso que devuelve Spring Boot
export interface Curso {
  id: number;
  titulo: string;
  descripcion: string;
  url: string;
  plataformaId: number;
  tipo: string; // Usamos esto como el "Área" para la búsqueda
  duracion: string;
  nivel: string;
  rating: number;
  estudiantes: number;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  // URL base de tu backend de Spring Boot
  private readonly apiUrl = 'http://localhost:8080/api/cursos'; 

  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista de cursos destacados (top 3 por rating).
   * Endpoint: GET /api/cursos/destacados
   */
  getDestacados(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}/destacados`);
  }

  /**
   * Obtiene la lista de cursos recomendados según el texto ingresado por el usuario.
   * Endpoint: GET /api/cursos/recomendar?area={areaBuscada}
   * @param areaBuscada El texto ingresado en el campo de búsqueda (chatbot).
   */
  getRecomendaciones(areaBuscada: string): Observable<Curso[]> {
    // Codificamos el parámetro para manejar espacios y caracteres especiales
    const encodedArea = encodeURIComponent(areaBuscada);
    
    // El endpoint es /api/cursos/recomendar?area=...
    return this.http.get<Curso[]>(`${this.apiUrl}/recomendar?area=${encodedArea}`);
  }

  // Puedes añadir aquí otros métodos como getCursoById(id) o crearCurso(curso)
}