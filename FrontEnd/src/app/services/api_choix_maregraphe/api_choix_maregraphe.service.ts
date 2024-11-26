import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class APIChoixMaregrapheService {
  private baseUrl = 'http://localhost:8000/maregraphe/'; 

  constructor(private http: HttpClient) {}
// Fonction pour récupérer les données de l'API

  public async getData(id: number): Promise<any> {
    return await lastValueFrom(this.http.get(this.baseUrl + "getMaregraphe"))
  }
}
