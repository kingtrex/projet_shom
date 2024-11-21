import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';



export interface DataResponse {
  id_maregraphe: number;
  id_meta: string;
  donnee: string;
  date_donnee: string;
}

@Injectable({
  providedIn: 'root'
})

export class ApiMaregraphemeta {
  private baseUrl = 'http://localhost:8000/maregrapheMeta'; 

  constructor(private http: HttpClient) {}
// Fonction pour récupérer les données de l'API

  public async getData(): Promise<any> {
    return await lastValueFrom(this.http.get(this.baseUrl + "getMeta/3"))
  }

}
