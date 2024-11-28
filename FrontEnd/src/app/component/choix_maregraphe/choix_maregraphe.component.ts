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

  /**
   * @brief Obtenir les différents marégraphes
   */
  public async getData(){
    const data : any = await this.apiChoixMaregraphe.getData()
    const meta: maregraphe[] = [];
    data.forEach((element : any) => {
      meta.push(new maregraphe(element.id_tdb, element.libelle, element.latitude, element.longitude));
    })
    this.donnees = meta;
    this.isDataLoaded = true;
  }

  public async add_meta(){
    console.log("coin");
    let form = document.getElementById("hide_form")?.style;
    if (form) form.display = 'block';
  }

  /**
   * @brief fermer le formulaire d'ajout d'une métadonnée
   */
  public async annuler(){
    let form = document.getElementById("hide_form")?.style;
    if (form) form.display = 'none';
  }
}
