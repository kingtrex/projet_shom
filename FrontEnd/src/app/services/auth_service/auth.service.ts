import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  exp: number; // Timestamp UNIX
  sub: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = "http://localhost:8000/";

  constructor(private http: HttpClient, private router: Router) { }

  public async login(username: string, password: string){
    try{
      const response = await lastValueFrom(
        this.http.post<{access_token: string}>(this.apiURL + "connexion/token", {username: username, password: password})
      );
      localStorage.setItem("token", response.access_token)
      this.router.navigate(["/tabChoixMaregraphe"])
    }catch(error){
      console.log("error login: " + error);
      throw error
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.isTokenExpired(token) : false;
  }

  public isTokenExpired(token: string): boolean {
    try {
      const { exp } = jwtDecode<TokenPayload>(token);
      const now = Math.floor(Date.now() / 1000); // Temps actuel en secondes
      return exp < now; // Expiré si la date actuelle dépasse la date d'expiration
    } catch (e) {
      console.error('Invalid token:', e);
      return true;
    }
  }
  
}
function jwt_decode<T>(token: string): { exp: any; } {
  throw new Error('Function not implemented.');
}
