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
   * Obtenir les métadonnées d'un marégraphe
   * @param {number} id - L'ID du marégraphe 
   * @returns {Promise<any>} - Une promesse qui se résout avec les informations des métadonnées
   * @throws Lève une erreur si la requête échoue
   */
  public async getData(id: number): Promise<any> {
    try{
      return await lastValueFrom(this.http.get(this.baseUrl + "getMeta/"+ id));
    }catch(error: any){
      throw error.error.detail;
    }
  }

  /**
   * Ajouter une métadonnée à un marégraphe
   * @param {number} idMare - L'ID du marégraphe 
   * @param {string} idMeta - L'ID de la métadonnée 
   * @param {number | string} meta - La valeur de la métadonnée 
   * @returns {Promise<any>} - Une promesse qui se résout avec les informations de l'ajout
   * @throws Lève une erreur si la requête échoue
   */
  public async addMeta(idMare: number, idMeta: string, meta: number | string): Promise<any>{
    try{
      const param = "addMeta/" + idMare + "&" + idMeta + "&" + meta;
      return await lastValueFrom(this.http.post(this.baseUrl + param, null))
    }catch(error: any){
      throw error.error.detail
    }
  }

  /**
   * Modifier une métadonnée d'un marégraphe
   * @param {number} idMaregraphe - L'ID du marégraphe
   * @param {string} idMeta - L'ID de la métadonnée
   * @param {string} description - La nouvelle description de la métadonnée
   * @returns {Promise<any>} - Une promesse qui se résout avec les informations de la modification
   * @throws Lève une erreur si la requête échoue
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
   * @param {number} idMare - L'ID du marégraphe 
   * @param {string} idMeta - L'ID de la métadonnée 
   * @returns {Promise<any>} - Une promesse qui se résout avec les informations de la suppression
   * @throws Lève une erreur si la requête échoue
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
   * Trier les métadonnées d'un marégraphe
   * @param {number} id - L'ID du marégraphe 
   * @param {string} col - La colonne à trier
   * @param {boolean} order - L'ordre du tri: true pour décroissant, false pour croissant 
   * @returns {Promise<any>} - Une promesse qui se résout avec les informations triées
   * @throws Lève une erreur si la requête échoue
   */
  public async sortData(id: number, col: string, order: boolean): Promise<any>{
    try{
      const param = "sort/" + id + "&" + col + "&" + order
      return await lastValueFrom(this.http.get(this.baseUrl + param))
    }catch(error: any){
      throw error.error.detail;
    }
  }

  
  /**
   * Obtenir les Métadonnées non utilisées par un marégraphe
   * @param {number} id - L'ID du marégraphe 
   * @returns {Promise<any>} - Une promesse qui se résout avec les informations des métadonnées non utilisées
   * @throws Lève une erreur si la requête échoue
   */
  public async getMetaForm(id: number): Promise<any>{
    try{
      const param = "getMetaForm/" + id
      return await lastValueFrom(this.http.get(this.baseUrl + param))
    }catch(error: any){
      throw error.error.detail;
    }
  }
}