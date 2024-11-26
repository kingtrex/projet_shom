import { Component } from '@angular/core';
import { APIChoixMaregrapheService } from '../../services/api_choix_maregraphe/api_choix_maregraphe.service';
import { Data } from '@angular/router';
import { maregraphe } from '../../class/maregraphe';

@Component({
  selector: 'app-choix-maregraphe',
  templateUrl: './choix_maregraphe.component.html',
  styleUrls: ['./choix_maregraphe.component.css']
})
export class ChoixMaregrapheComponent {
  errorMessage: string = '';
  isDataLoaded : boolean = false;
  donnees: any;


  constructor(private apiChoixMaregraphe: APIChoixMaregrapheService) {}

  ngOnInit(): void {
    this.getData();
  }

  public async getData(){
    console.log(this.apiChoixMaregraphe.getData())

    const data : any = await this.apiChoixMaregraphe.getData()
    console.log(data)
    const meta: maregraphe[] = [];
    console.log(typeof(data))
    data.forEach((element : any) => {
      meta.push(new maregraphe(element.id_tdb, element.libelle, element.latitude, element.longitude));
    })
    this.donnees = meta;
    console.log(this.donnees);
    this.isDataLoaded = true;
  }
}
