import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  exp: number; // Timestamp UNIX
  username: string;
  admin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = "http://localhost:8000/";

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Lancer une requête pour se connecter
   * @param {string} username - Le nom d'utilisateur 
   * @param {string} password - Le mot de passe 
   * @returns {Promise<any>} - Une promesse qui se résout avec les informations de connexion
   * @throws Lève une erreur si la requête échoue
   */
  public async login(username: string, password: string): Promise<any>{
    try{
      const response = await lastValueFrom(
        this.http.post<{access_token: string}>(this.apiURL + "connexion/token", {username: username, password: password})
      );
      localStorage.setItem("token", response.access_token)
      this.router.navigate(["/tabChoixMaregraphe"])
    }catch(error){
      return error
    }
  }


  /**
   * Deconnecter l'utilisateur
   */
  public logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  /**
   * Vérifier si l'utilisateur est connecté
   * @returns bool : si l'utilisateur est connecté ou non
   */
  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.isTokenExpired(token) : false;
  }

  /**
   * Vérifier si le token a expirer ou non
   * @param {string} token - Le token à vérifier
   * @returns {boolean} - Si le token a expiré ou non
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

  public isAdmin(token: string): boolean {
    try {
      const data = jwtDecode<TokenPayload>(token);
      return data.admin
    } catch (error) {
      throw error
    }
  }
}
