import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiPartenaireMaregrapheService {
  private baseUrl = 'http://localhost:8000/partenaireMaregraphe/'; 

  constructor(private http: HttpClient) {}

  /**
   * Obtenir les marégraphe d'un partenaire
   * @param {number} id - L'ID du partenaire
   * @returns {Promise<any>} - Une promesse qui se résout avec les informations des marégraphe
   * @throws Lève une erreur si la requête échoue
   */
  public async getData(id: number): Promise<any> {
    try{
      return await lastValueFrom(this.http.get(this.baseUrl + "getMaregraphe/"+ id));
    }catch(error: any){
      throw error.error.detail;
    }
  }

  /**
   * Trie les données pour un partenaire spécifique.
   * @param {number} id_partenaire - L'identifiant du partenaire.
   * @param {string} col - La colonne par laquelle trier les données.
   * @param {boolean} ordre - L'ordre de tri (true pour descendant, false pour ascendant).
   * @returns {Promise<Object>} - Une promesse qui résout l'objet trié.
   * @throws {any} - Lance une erreur si la requête échoue.
   */
  public async sortData(id_partenaire: number, col: string, ordre: boolean): Promise<Object> {
      try {
          const param = "sort/" + id_partenaire + "&" + col + "&" + ordre;
          return await lastValueFrom(this.http.get(this.baseUrl + param));
      } catch (error: any) {
          throw error.error.detail;
      }
  }

  /**
   * Ajouter un marégraphe à un partenaire
   * @param {number} id_partenaire - L'ID du partenaire
   * @param {number} id_maregraphe - L'ID du marégraphe
   * @param {numbet} ordre - L'ordre du marégraphe 
   * @returns {Promise<any>} - Une promesse qui se résout avec les informations de l'ajout
   * @throws Lève une erreur si la requête échoue
   */
  public async addMaregraphe(id_partenaire: number, id_maregraphe: number, ordre: number): Promise<any>{
    try{
      let param = "addMaregraphe/" + id_partenaire + "&" + id_maregraphe + "&" + ordre;
      return await lastValueFrom(this.http.post(this.baseUrl + param, null));
    }catch(error: any){
      throw error.error.detail;
    }
  }

  /**
   * Supprimer le marégraphe d'un partenaire
   * @param {number} idParte - L'ID du partenaire 
   * @param {number} idMare - L'ID du marégraphe 
   * @returns {Promise<any>} - Une promesse qui se résout avec les informations de la suppression
   * @throws Lève une erreur si la requête échoue
   */
  public async deleteMaregraphe(idParte: number, idMare: number): Promise<any>{
    try{
      let param = "deleteMare/" + idParte + "&" + idMare;
      return await lastValueFrom(this.http.delete(this.baseUrl + param));
    }catch(error: any){
      throw error.error.detail;
    }
  }

  /**
   * Obtenire les marégraphe qui ne sont pas affilié à un partenaire
   * @param {number} id - L'ID du partenaire 
   * @returns {Promise<any>} - Une promesse qui se résout avec les informations des marégraphe non affilié
   * @throws Lève une erreur si la requête échoue
   */
    public async getMaregrapheForm(id: number): Promise<any>{
      try{
        return await lastValueFrom(this.http.get(this.baseUrl + "getMaregrapheForm/" + id));
      }catch(error: any){
        throw error.error.detail;
      }
    }
}
