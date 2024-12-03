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
    url: number
  ): Promise<any>{
    try{
      let param = "addPartenaire/" + id + "&" + nom + "&" + logo + "&" + url;
      return await lastValueFrom(this.http.post(this.baseUrl + param, null));
    }catch(error: any){
      throw error.error.detail;
    }
  }
}
