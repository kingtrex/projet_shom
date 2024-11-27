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

  /**
   * Lancer le Processus d'authentification de l'utilisateur
   * @param username string : le login de l'utilisateur
   * @param password string : le mot de passe de l'utilisateur
   */
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

  /**
   * déconnecter l'utilisateur
   */
  public logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  /**
   * Vérifier si l'utilisateur est toujours connecté
   * @returns bool : si l'utilisateur est toujours connecté 
   */
  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.isTokenExpired(token) : false;
  }

  /**
   * Vérifier si le token a expirer ou non
   * @param token string : le token de l'utilisateur
   * @returns bool : si le token a expiré ou non
   */
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
