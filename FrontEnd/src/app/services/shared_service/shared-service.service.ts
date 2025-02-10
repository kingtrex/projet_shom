import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private apiURL: string = "http://localhost:8000/";

  constructor() { }

  public getApiURL(): string{
    return this.apiURL;
  }
  /**
   * Ajouter une valeur dans le sessionStorage
   * @param {string} key - La clé de la donnée 
   * @param {string} data - La donnée à ajouter 
   */
  public async setData(key: string, data: string): Promise<void>{
    sessionStorage.setItem(key, data);
  }

  /**
   * Obtenir une valeur du sessionStorage
   * @param {string} key - La clé de la donnée 
   * @returns {string | null} - La donnée correspondant à la clé
   */
  public getData(key: string): string{
    return sessionStorage.getItem(key) === null ? "" : sessionStorage.getItem(key)!;
  }

  /**
   * Supprimer une valeur du sessionStorage
   * @param {string} key - La clé de la donnée à supprimer 
   */
  public async deleteData(key: string): Promise<void>{
    sessionStorage.removeItem(key);
  }
}

