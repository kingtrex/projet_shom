import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Maregraphe } from 'src/app/class/Maregraphe';


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
  public async getData(): Promise<Object> {
    try{
      return await lastValueFrom(this.http.get(this.baseUrl + "getMaregraphe"));
    }catch(error: any){
      throw error.error.details;
    }
  }

  /**
   * Appeler l'API pour réorganiser les données 
   * @param col string : le nom de la colonne qui sera utilisée
   * @param order bool : true => ordre décroissant, false =>  ordre croissant
   * @returns 
   */
  public async sortData(col: string, order: boolean): Promise<Object>{
    try{
      return await lastValueFrom(this.http.get(this.baseUrl + "sort/" + col + "&" + order))
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

  public async updateMaregraphe(idMaregraphe : number,
    ville: string,
    latitude: number,
    longitude: number,
  ){
    try{
      const param = "updateMaregraphe/" + idMaregraphe + "&" + ville + "&" + latitude + "&" + longitude
      return await lastValueFrom(this.http.put(this.baseUrl + param, null))
    }catch(error: any){
      throw error.error.detail;
    }
  }
  /**
   Supprimer le marégraphe de la BDD
   @param id_maregraphe string : l'identifiant du marégraphe
   @returns le status de la requête
  */
  public async deleteMaregraphe(id_maregraphe: number): Promise<any>{
    try{
      let param = "deleteMaregraphe/" + id_maregraphe;
      return await lastValueFrom(this.http.delete(this.baseUrl + param));
    }catch(error: any){
      throw error.error.detail;
    }
  }

    /**
   * Obtenir les marégraphe qui ne sont pas déjà assigné au partenanire
   * @param id number : id du partenaire
   * @returns 
   */
    public async getMaregrapheForm(id: number){
      try{
        return await lastValueFrom(this.http.get(this.baseUrl + "getMaregrapheForm/" + id));
      }catch(error: any){
        throw error.error.detail;
      }
    }
}
