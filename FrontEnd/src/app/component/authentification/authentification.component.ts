import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth_service/auth.service';


@Component({
    selector: 'app-authentification',
    templateUrl: './authentification.component.html',
    styleUrls: ['./authentification.component.css'],
    standalone: false
})
export class AuthentificationComponent {

  public formLogin: any

  constructor(protected formBuilder: FormBuilder,
    protected authService: AuthService,
  ){
    this.formLogin = this.formBuilder.group({
      login: "",
      password: "",
    })
  }

  /**
   * @brief lancer la connexion
   */
  public async onSubmit(){
    const value = this.formLogin.value;
    await this.authService.login(value.login, value.password).then(() => {
      const element = document.getElementById("error")
      element?.classList.remove("hide")
    }).catch((error: any) => {
      alert(error)
    })
  }
}
