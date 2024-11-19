import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



export interface DataResponse {
  id_maregraphe: number;
  id_meta: string;
  donnee: string;
  date_donnee: string;
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private baseUrl = 'http://localhost:8000/metadonnee/3';  // Remplace par l'URL de ton API FastAPI
//url d'origine : http://localhost:8000

  constructor(private http: HttpClient) {}
// Fonction pour récupérer les données de l'API

  getData(): Observable<DataResponse> {
    return this.http.get<DataResponse>(this.baseUrl);
  }

  /*
  // Exemple de méthode GET pour interroger FastAPI
  getItems(): Observable<any> {
    return this.http.get(`${this.baseUrl}/items`);
  }

  // Exemple de méthode POST
  addItem(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/items`, data);
  }
    */
}
