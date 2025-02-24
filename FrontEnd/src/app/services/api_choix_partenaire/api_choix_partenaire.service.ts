import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { SharedService } from '../shared_service/shared-service.service';

@Injectable({
  providedIn: 'root'
})
export class ApiChoixPartenaireService {
  private baseUrl = this.sharedService.getApiURL() + 'partenaire/'; 

  constructor(private http: HttpClient,
    private sharedService: SharedService,
  ) { }

  /**
   * Obtenir les informations des partenaires
   * @returns {Promise<any>} - Une promesse qui se résout avec les informations des partenaires
   * @throws Lève une erreur si la requête échoue
   */
  public async getData(): Promise<any> {
    try{
      return await lastValueFrom(this.http.get(this.baseUrl + "getPartenaire"));
    }catch(error: any){
      throw error.error.detail;
    }
  }

  /**
   * Ajouter un partenaire
   * @param {number} id - L'ID du partenaire 
   * @param {string} nom - Le nom du partenaire
   * @param {string} logo - Le logo du partenaire 
   * @param {string} url - L'URL du partenaire 
   * @returns {Promise<any>} - Une promesse qui se résout avec les informations de l'ajout
   * @throws Lève une erreur si la requête échoue
   */
  public async addPartenaire(id: string,
    nom: string,
    logo: string,
    url: string,
  ): Promise<any>{
    try{
      const param = "addPartenaire/" + id + "&" + nom + "&" + logo;
      return await lastValueFrom(this.http.post(this.baseUrl + param, {"url": url}));
    }catch(error: any){
      throw error.error.detail;
    }
  }

  /**
   * Trie les données en fonction de la colonne et de l'ordre spécifiés.
   * @param {string} col - La colonne par laquelle trier.
   * @param {boolean} order - L'ordre de tri (true pour ascendant, false pour descendant).
   * @returns {Promise<any>} - Une promesse qui se résout avec les données triées.
   * @throws Lève une erreur si la requête échoue.
   */
  public async sortData(col: string, order : boolean): Promise<any> {
    try {
        const param = "sort/" + col + "&" + order;
        return await lastValueFrom(this.http.get(this.baseUrl + param));
    } catch (error: any) {
        throw error.error.detail;
    }
  }

  /**
   * Met à jour les informations d'un partenaire.
   * @param {string} id - L'ID du partenaire.
   * @param {string} nom - Le nom du partenaire.
   * @param {string} logo - Le logo du partenaire.
   * @param {string} url - L'URL du partenaire.
   * @returns {Promise<any>} - Une promesse qui se résout avec les informations mises à jour du partenaire.
   * @throws Lève une erreur si la requête échoue.
   */
  public async updatePartenaire(id: string, nom: string, logo: string, url: string): Promise<any> {
    try {
        const param = "updatePartenaire/" + id + "&" + nom + "&" + logo;
        return await lastValueFrom(this.http.put(this.baseUrl + param, {"url": url}));
    } catch (error: any) {
        throw error.error.detail;
    }
  }

  /**
   * Supprime un partenaire par ID.
   * @param {number} id - L'ID du partenaire à supprimer.
   * @returns {Promise<any>} - Une promesse qui se résout avec le résultat de la suppression.
   * @throws Lève une erreur si la requête échoue.
   */
  public async deletePartenaire(id: number): Promise<any> {
    try {
        const param = "deletePartenaire/" + id;
        return await lastValueFrom(this.http.delete(this.baseUrl + param));
    } catch (error: any) {
        throw error.error.detail;
    }
  }
}
