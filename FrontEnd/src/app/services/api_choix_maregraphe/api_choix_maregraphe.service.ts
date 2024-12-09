import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class APIChoixMaregrapheService {
  private baseUrl = 'http://localhost:8000/maregraphe/'; 
  constructor(private http: HttpClient) {}

  /**
   * Obtenir la liste des marégraphe dans la BDD
   * @returns JSON contenant la liste des marégraphe 
   */
  public async getData(): Promise<any> {
    try{
      return await lastValueFrom(this.http.get(this.baseUrl + "getMaregraphe"));
    }catch(error: any){
      throw error.error.details;
    }
  }


  /**
   * Appeler l'API pour ajouter la métadonnée dans la BDD
   * @param id_maregraphe string : identifiant de la méta
   * @param ville string : description de la méta
   * @param latitude int : latitude du marégraphe
   * @param longitude int : longitude du marégraphe
   * @returns validation de la requete
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
   Supprimer le type de métadonnée de la BDD
   @param id_maregraphe string : l'identifiant du type de la métadonnée
   @returns le status de la requête
  
  public async deleteMaregraphe(id_maregraphe: string): Promise<any>{
    try{
      let param = "deleteMaregraphe/" + id_maregraphe;
      return await lastValueFrom(this.http.delete(this.baseUrl + param));
    }catch(error: any){
      throw error.error.detail;
    }
  }
**/
}
