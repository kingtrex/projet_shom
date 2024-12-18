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
    try{
      return await lastValueFrom(this.http.get(this.baseUrl + "getMetaId"));
    }catch(error: any){
      throw error.error.detail;
    }
    
  }

  /**
   * Appeler l'API pour ajouter la métadonnée dans la BDD
   * @param id string : identifiant de la méta
   * @param description string : description de la méta
   * @param ordre int : ordre de la méta
   * @returns validation de la requete
   */
  public async addMeta(id: string,
    description: string,
    ordre: number
  ): Promise<any>{
    try{
      let param = "addMeta/" + id + "&" + description + "&" + ordre;
      return await lastValueFrom(this.http.post(this.baseUrl + param, null));
    }catch(error: any){
      throw error.error.detail;
    }
  }

  /**
   * Modifier les informations d'une métadonnée dans la BDD
   * @param idMeta string : id de la métadonnée
   * @param description string : description de la métadonnée
   * @param ordre number : ordre de la métadonnée
   * @returns état de la requête
   */
  public async updateMeta(idMeta: string,
    description: string,
    ordre: number
  ){
    try{
      const param = "updateMeta/" + idMeta + "&" + description + "&" + ordre
      return await lastValueFrom(this.http.put(this.baseUrl + param, null))
    }catch(error: any){
      throw error.error.detail
    }
  }

  /**
   * Supprimer le type de métadonnée de la BDD
   * @param id string : l'identifiant du type de la métadonnée
   * @returns le status de la requête
   */
  public async deleteMeta(id: string): Promise<any>{
    try{
      let param = "deleteMeta/" + id;
      return await lastValueFrom(this.http.delete(this.baseUrl + param));
    }catch(error: any){
      throw error.error.detail;
    }
  }

  /**
   * Trier les colonnes
   * @param col string : nom de la colonne
   * @param order bool : true => ordre décroissant, false =>  ordre croissant
   * @returns 
   */
  public async sortData(col: string, order: boolean): Promise<Object>{
    try{
      const param = "sort/" + col + "&" + order
      return await lastValueFrom(this.http.get(this.baseUrl + param))
    }catch(error: any){
      throw error.error.detail;
    }
  }

  public async getMetaForm(id: number){
    try{
      const param = "getMetaForm/" + id
      return await lastValueFrom(this.http.get(this.baseUrl + param))
    }catch(error: any){
      throw error.error.detail;
    }
  }
}

