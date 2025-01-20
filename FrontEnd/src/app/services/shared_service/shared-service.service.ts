import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  public setData(key: string, data: string): void{
    sessionStorage.setItem(key, data);
  }

  public getData(key: string): string | null{
    return sessionStorage.getItem(key) === undefined ? "" : sessionStorage.getItem(key);
  }

  public deleteData(key: string): void{
    sessionStorage.removeItem(key);
  }

  public showData(): void{
    console.log(sessionStorage);
  }
}
