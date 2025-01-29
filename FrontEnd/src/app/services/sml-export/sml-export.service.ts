import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SMLExportService {

  private baseUrl = "http://localhost:8000/exportSml/"; 
  constructor(private http: HttpClient) { }

  public async exportMeta(idMare: number, nomMaregraphe: string): Promise<void> {
    try{
      await lastValueFrom(this.http.get(this.baseUrl + "exportMeta/" + idMare + "&" + nomMaregraphe, {responseType: "blob"})).then((response: any) => {
        console.log(response);
        const blob = new Blob([response], { type: 'application/xml' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'sensor_example.sml'; // Nom du fichier
        link.click();
        window.URL.revokeObjectURL(url); // Libérer l'URL après utilisation
      });
    }catch(error: any){
      console.log(error)
      throw error;
    }
  }
}
