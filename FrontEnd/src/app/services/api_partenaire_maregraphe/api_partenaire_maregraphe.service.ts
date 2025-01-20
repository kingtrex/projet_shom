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

  public async sortData(id_partenaire: number, col: string, ordre: boolean): Promise<Object>{
    try{
      const param = "partenaireMaregraphe/sort/" + id_partenaire + "&" + col + "&" + ordre
      return await lastValueFrom(this.http.get(this.baseUrl + param))
    }catch(error: any){
      throw error.error.detail;
    }
  }

  public async addMaregraphe(id_partenaire: number, id_maregraphe: number, ordre: number): Promise<any>{
    try{
      let param = "addMaregraphePartenaire/" + id_partenaire + "&" + id_maregraphe + "&" + ordre;
      return await lastValueFrom(this.http.post(this.baseUrl + param, null));
    }catch(error: any){
      throw error.error.detail;
    }
  }

  /**
   * Supprimer une métadonnée d'un marégraphe
   * @param idParte int : l'identifiant du partenaire
   * @param idMare int : l'identifiant du marégraphe
   * @returns la réponse de l'API
   */
  public async deleteMaregraphe(idParte: number, idMare: number): Promise<any>{
    try{
      let param = "deleteMare/" + idParte + "&" + idMare;
      return await lastValueFrom(this.http.delete(this.baseUrl + param));
    }catch(error: any){
      throw error.error.detail;
    }
  }
}
