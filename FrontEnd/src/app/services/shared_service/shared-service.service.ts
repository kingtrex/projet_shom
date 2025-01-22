import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  /**
   * Ajouter une valeur dans le sessionStorage
   * @param {string} key - La clé de la donnée 
   * @param {string} data - La donnée à ajouter 
   */
  public setData(key: string, data: string): void{
    sessionStorage.setItem(key, data);
  }

  /**
   * Obtenir une valeur du sessionStorage
   * @param {string} key - La clé de la donnée 
   * @returns {string | null} - La donnée correspondant à la clé
   */
  public getData(key: string): string | null{
    return sessionStorage.getItem(key) === undefined ? null : sessionStorage.getItem(key);
  }

  /**
   * Supprimer une valeur du sessionStorage
   * @param {string} key - La clé de la donnée à supprimer 
   */
  public deleteData(key: string): void{
    sessionStorage.removeItem(key);
  }

  /**
   * Afficher les données du sessionStorage
   */
  public showData(): void{
    console.log(sessionStorage);
  }
}
