import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})

export class ApiMaregraphemeta {
  private baseUrl = 'http://localhost:8000/maregrapheMeta/'; 

  constructor(private http: HttpClient) {}

  /**
   * Obtenir les métadonnées du marégraphe passé en paramètre dans la base de données
   * @param id number: identifiant du marégraphe
   * @returns JSON contenant les métadonnées du marégraphe
   */
  public async getData(id: number): Promise<any> {
    return await lastValueFrom(this.http.get(this.baseUrl + "getMeta/"+ id))
  }

  
  public async deleteMeta(idMare: number, idMeta: string){
    try{
      let param = "deleteMeta/" + idMare + "&" + idMeta
      return await lastValueFrom(this.http.delete(this.baseUrl + param))
    }catch(error){
      throw error
    }
  }
}
