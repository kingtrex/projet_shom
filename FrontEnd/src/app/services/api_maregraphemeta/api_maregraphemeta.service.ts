import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})

export class ApiMaregraphemeta {
  private baseUrl = 'http://localhost:8000/maregrapheMeta/'; 

  constructor(private http: HttpClient) {}

  /**
   * Obtenir les métadonnées du marégraphe passé en paramètre dans la base de données
   * @param id number: identifiant du marégraphe
   * @returns JSON contenant les métadonnées du marégraphe
   */
  public async getData(id: number): Promise<any> {
    try{
      return await lastValueFrom(this.http.get(this.baseUrl + "getMeta/"+ id));
    }catch(error: any){
      throw error.error.detail;
    }
  }

  /**
   * Supprimer une métadonnée d'un marégraphe
   * @param idMare int : l'identifiant du marégraphe
   * @param idMeta string : l'identifiant de la métadonnée
   * @returns la réponse de l'API
   */
  public async deleteMeta(idMare: number, idMeta: string): Promise<any>{
    try{
      let param = "deleteMeta/" + idMare + "&" + idMeta;
      return await lastValueFrom(this.http.delete(this.baseUrl + param));
    }catch(error: any){
      throw error.error.detail;
    }
  }
}
