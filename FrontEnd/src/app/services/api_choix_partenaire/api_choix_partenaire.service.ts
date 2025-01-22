import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiChoixPartenaireService {
  private baseUrl = 'http://localhost:8000/partenaire/'; 
  constructor(private http: HttpClient) { }
  public async getData(): Promise<any> {
    try{
      return await lastValueFrom(this.http.get(this.baseUrl + "getPartenaire"));
    }catch(error: any){
      throw error.error.details;
    }
  }

  /**
   * Appeler l'API pour ajouter le partenaire dans la BDD
   * @param id number : identifiant du partenaire
   * @param nom string : description du partenaire
   * @param logo string : chemin du logo du partenaire
   * @param url string : url du site du partenaire
   * @returns validation de la requete
   */
  public async addPartenaire(id: string,
    nom: string,
    logo: number,
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
   * Appeler l'API pour récupérer les données avec un tri
   * @param col string : nom de la colonne
   * @param order bool : true => ordre décroissant, false =>  ordre croissant
   * @returns 
   */
  public async sortData(col: string, order : boolean): Promise<any>{
    try{
      const param = "sort/" + col + "&" + order
      return await lastValueFrom(this.http.get(this.baseUrl + param))
    }catch(error: any){
      throw error.error.detail;
    }
  }

  public async updatePartenaire(id: string, nom: string, logo: string, url: string): Promise<any>{
    try{
      const param = "updatePartenaire/" + id + "&" + nom + "&" + logo 
      return await lastValueFrom(this.http.put(this.baseUrl + param, {"url": url}));
    }catch(error: any){
      throw error.error.detail;
    }
  }

  public async deletePartenaire(id: number): Promise<any>{
    try{
      const param = "deletePartenaire/" + id
      return await lastValueFrom(this.http.delete(this.baseUrl + param));
    }catch(error: any){
      throw error.error.detail;
    }
  }
}
