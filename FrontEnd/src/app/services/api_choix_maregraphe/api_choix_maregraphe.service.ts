import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared_service/shared-service.service';

@Injectable({
  providedIn: 'root'
})
export class APIChoixMaregrapheService {
  private baseUrl = this.sharedService.getApiURL() + 'maregraphe/'; 

  constructor(private http: HttpClient,
    private sharedService: SharedService
  ) {}

  /**
   * Obtenir la liste des marégraphes dans la BDD.
   * @returns {Promise<Object>} - Une promesse qui se résout avec un JSON contenant la liste des marégraphes.
   * @throws Lève une erreur si la requête échoue.
   */
  public async getData(): Promise<Object> {
    try {
      return await lastValueFrom(this.http.get(this.baseUrl + "getMaregraphe"));
    } catch (error: any) {
      throw error.error.details;
    }
  }

  /**
   * Trie les données des marégraphes en fonction de la colonne et de l'ordre spécifiés.
   * @param {string} col - La colonne par laquelle trier.
   * @param {boolean} order - L'ordre de tri (true pour ascendant, false pour descendant).
   * @returns {Promise<any>} - Une promesse qui se résout avec les données triées.
   * @throws Lève une erreur si la requête échoue.
   */
  public async sortData(col: string, order: boolean): Promise<any> {
    try {
      const param = "sort/" + col + "&" + order;
      return await lastValueFrom(this.http.get(this.baseUrl + param));
    } catch (error: any) {
      throw error.error.details;
    }
  }

  /**
   * Ajouter un marégraphe dans la BDD.
   * @param {number} id_maregraphe - L'ID du marégraphe.
   * @param {string} ville - La ville du marégraphe.
   * @param {number} latitude - La latitude du marégraphe.
   * @param {number} longitude - La longitude du marégraphe.
   * @returns validation de la requete
   * @throws Lève une erreur si la requête échoue.
   */
  public async addMaregraphe(id_maregraphe: string,
    ville: string,
    latitude: number,
    longitude: number
  ): Promise<any>{
    try{
      let param = "addMaregraphe/" + id_maregraphe + "&" + ville + "&" + latitude + "&" + longitude;
      return await lastValueFrom(this.http.post(this.baseUrl + param, null));
    }catch(error: any){
      throw error.error.detail;
    }
  }

  /**
   * Met à jour les informations d'un marégraphe.
   * @param {string} id - L'ID du marégraphe.
   * @param {string} nom - Le nom du marégraphe.
   * @param {number} latitude - La latitude du marégraphe.
   * @param {number} longitude - La longitude du marégraphe.
   * @returns {Promise<any>} - Une promesse qui se résout avec les informations mises à jour du marégraphe.
   * @throws Lève une erreur si la requête échoue.
   */
  public async updateMaregraphe(id: string, nom: string, latitude: number, longitude: number): Promise<any> {
    try {
      const param = "updateMaregraphe/" + id + "&" + nom + "&" + latitude + "&" + longitude;
      return await lastValueFrom(this.http.put(this.baseUrl + param, {}));
    } catch (error: any) {
      throw error.error.details;
    }
  }

  /**
   * Supprime un marégraphe par ID.
   * @param {number} id - L'ID du marégraphe à supprimer.
   * @returns {Promise<any>} - Une promesse qui se résout avec le résultat de la suppression.
   * @throws Lève une erreur si la requête échoue.
   */
  public async deleteMaregraphe(id: number): Promise<any> {
    try {
      const param = "deleteMaregraphe/" + id;
      return await lastValueFrom(this.http.delete(this.baseUrl + param));
    } catch (error: any) {
      throw error.error.details;
    }
  }

}
