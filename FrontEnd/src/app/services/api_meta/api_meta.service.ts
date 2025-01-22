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
   * Obtenir la liste des métadonnées
   * @returns {Promise<any>} - Une promesse qui se résout avec les informations des métadonnées
   * @throws Lève une erreur si la requête échoue
   */
  public async getData(): Promise<any> {
    try{
      return await lastValueFrom(this.http.get(this.baseUrl + "getMetaId"));
    }catch(error: any){
      throw error.error.detail;
    }
    
  }

  /**
   * Ajouter un nouveaut type de métadonnée
   * @param {string} id - L'ID de la métadonnée 
   * @param {string} description - La description de la métadonnée 
   * @param {number} ordre - L'ordre de la métadonnée 
   * @returns {Promise<any>} - Une promesse qui se résout avec les informations de l'ajout
   * @throws Lève une erreur si la requête échoue
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
   * Modifier une métadonnée
   * @param {string} idMeta - L'ID de la métadonnée 
   * @param {string} description - La nouvelle description de la métadonnée 
   * @param {number} ordre - Le nouvel ordre de la métadonnée 
   * @returns {Promise<any>} - Une promesse qui se résout avec les informations de la modification 
   * @throws Lève une erreur si la requête échoue
   */
  public async updateMeta(idMeta: string,
    description: string,
    ordre: number
  ): Promise<any>{
    try{
      const param = "updateMeta/" + idMeta + "&" + description + "&" + ordre
      return await lastValueFrom(this.http.put(this.baseUrl + param, null))
    }catch(error: any){
      throw error.error.detail
    }
  }

  /**
   * Supprimer une métadonnée
   * @param {number} id - L'ID de la métadonnée
   * @returns {Promise<any>} - Une promesse qui se résout avec les informations de la suppression
   * @throws Lève une erreur si la requête échoue
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
   * Trier les métadonnées
   * @param {string} col - La colonne par laquelle trier 
   * @param {boolean} order - L'ordre de tri (true pour descendant, false pour ascendant) 
   * @returns {Promise<Object>} - Une promesse qui retourne les métadonnées triées
   * @throws Lève une erreur si la requête échoue
   */
  public async sortData(col: string, order: boolean): Promise<Object>{
    try{
      const param = "sort/" + col + "&" + order
      return await lastValueFrom(this.http.get(this.baseUrl + param))
    }catch(error: any){
      throw error.error.detail;
    }
  }
}