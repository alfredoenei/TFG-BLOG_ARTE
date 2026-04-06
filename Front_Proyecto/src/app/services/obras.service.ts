import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Obra } from '../models/obra';

export interface ObrasResponse {
  results: Obra[];
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ObrasService {
  private apiUrl = 'http://localhost:3000/api/obras';

  constructor(private http: HttpClient) {}

  // Listado general (paginado)
  // Ahora admite filtros opcionales vía query params
  getObras(params?: Record<string, any>): Observable<ObrasResponse> {
    let httpParams = new HttpParams();

    // Construimos los parámetros solo si existen
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === undefined) return;

        const v = String(value).trim();
        if (!v) return;

        httpParams = httpParams.set(key, v);
      });
    }

    return this.http.get<ObrasResponse>(this.apiUrl, {
      params: httpParams,
    });
  }

  // Detalle por id (para /store/:id)
  getObraById(id: string): Observable<Obra> {
    return this.http.get<Obra>(`${this.apiUrl}/${id}`);
  }

  // Colecciones 1 / 2 / 3
  getObrasColeccion(n: 1 | 2 | 3): Observable<ObrasResponse> {
    return this.http.get<ObrasResponse>(`${this.apiUrl}${n}`);
  }

  // Alias para compatibilidad
  getObras1(): Observable<ObrasResponse> {
    return this.getObrasColeccion(1);
  }

  getObras2(): Observable<ObrasResponse> {
    return this.getObrasColeccion(2);
  }

  getObras3(): Observable<ObrasResponse> {
    return this.getObrasColeccion(3);
  }
}
