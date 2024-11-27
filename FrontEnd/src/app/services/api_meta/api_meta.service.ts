import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiMeta {
  private baseUrl = 'http://localhost:8000/meta/'; 
  constructor(private http: HttpClient) { }

  /**
   * Obtenir la liste des types de métadonnées dans la BDD
   * @returns JSON contenant la liste des types de métadonnées
   */
  public async getData(): Promise<any> {
    return await lastValueFrom(this.http.get(this.baseUrl + "getMetaId"))
  }

}

