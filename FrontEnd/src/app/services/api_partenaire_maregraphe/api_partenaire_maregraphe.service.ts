import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiPartenaireMaregrapheService {
  private baseUrl = 'http://localhost:8000/partenaire/'; 

  constructor(private http: HttpClient) {}

  /**
   * Obtenir les métadonnées du marégraphe passé en paramètre dans la base de données
   * @param id number: identifiant du marégraphe
   * @returns JSON contenant les métadonnées du marégraphe
   */
  public async getData(id_tdb: number): Promise<any> {
    try{
      return await lastValueFrom(this.http.get(this.baseUrl + "getPartenaireMaregraphe/"+ id_tdb));
    }catch(error: any){
      throw error.error.detail;
    }
  }
}
