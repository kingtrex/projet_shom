import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth_service/auth.service';


@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
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
  public async onSubmit(){
    const value = this.formLogin.value;
    console.log(value);
    await this.authService.login(value.login, value.password);
  }
}
