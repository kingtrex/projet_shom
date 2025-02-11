import { Component} from '@angular/core';
import { AuthService } from '../../services/auth_service/auth.service'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: false
})

export class HeaderComponent{

  constructor(private authservice: AuthService){}

  public async deconnexion(){
    this.authservice.logout();
  }
}
