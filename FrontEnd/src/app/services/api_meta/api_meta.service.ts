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
    return await lastValueFrom(this.http.get(this.baseUrl + "getMetaId"))
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
      let param = "addMeta/" + id + "&" + description + "&" + ordre
      return await lastValueFrom(this.http.post(this.baseUrl + param, null))
    }catch(error){
      console.log("Erreur lors de l'ajout du type de métadonnée")
      throw error
    }
  }
}

