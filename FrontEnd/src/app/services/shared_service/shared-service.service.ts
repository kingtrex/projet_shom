import { Injectable } from '@angular/core';
import { AuthService } from '../auth_service/auth.service';
@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {


  constructor(private authService: AuthService) { }
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
    if(this.authService.isLoggedIn()){
      return sessionStorage.getItem(key) === null ? "" : sessionStorage.getItem(key)!;
    }else{
      return "";
    }
  }

  /**
   * Supprimer une valeur du sessionStorage
   * @param {string} key - La clé de la donnée à supprimer 
   */
  public async deleteData(key: string): Promise<void>{
    sessionStorage.removeItem(key);
  }
}

