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
   * Ajouter une métadonnée au marégraphe
   * @param idMare number : id du marégraphe
   * @param idMeta number : id de la métadonnée
   * @param meta number | string : data de la métadonnée
   * @returns 
   */
  public async addMeta(idMare: number, idMeta: number, meta: number | string): Promise<any>{
    try{
      const param = "addMeta/" + idMare + "&" + idMeta + "&" + meta;
      return await lastValueFrom(this.http.post(this.baseUrl + param, null))
    }catch(error: any){
      throw error.error.detail
    }
  }

  /**
   * Modifier les informations d'une métadonnée de marégraphe
   * @param idMeta string : id de la métadonnée
   * @param description string : description de la métadonnée
   * @returns état de la requête
   */
  public async updateMetaMare(idMaregraphe: number,
    idMeta: string,
    description: string
  ){
    try{
      const param = "updateMeta/" + idMaregraphe + "&" + idMeta + "&" + description
      return await lastValueFrom(this.http.put(this.baseUrl + param, null))
    }catch(error: any){
      throw error.error.detail
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

  /**
   * Appeler l'API pour réobtenir les données avec un tri
   * @param id number: id du marégraphe
   * @param col string : id de la métadonnée
   * @param order bool : true => ordre décroissant, false =>  ordre croissant
   * @returns 
   */
  public async sortData(id: number, col: string, order: boolean): Promise<any>{
    try{
      const param = "sort/" + id + "&" + col + "&" + order
      return await lastValueFrom(this.http.get(this.baseUrl + param))
    }catch(error: any){
      throw error.error.detail;
    }
  }

}
