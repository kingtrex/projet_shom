import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';

export interface DataResponse {
  id:string;
  description:string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiMeta {
  private baseUrl = 'http://localhost:8000/meta/'; 
  constructor(private http: HttpClient) { }

  public async getData(): Promise<any> {
    return await lastValueFrom(this.http.get(this.baseUrl + "getMetaId"))
  }

}

