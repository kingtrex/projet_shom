import { Component } from '@angular/core';
import { APIChoixMaregrapheService } from '../../services/api_choix_maregraphe/api_choix_maregraphe.service';
import { Data } from '@angular/router';
import { maregraphe } from '../../class/maregraphe';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-choix-maregraphe',
  templateUrl: './choix_maregraphe.component.html',
  styleUrls: ['./choix_maregraphe.component.css']
})
export class ChoixMaregrapheComponent {
  errorMessage: string = '';
  isDataLoaded : boolean = false;
  donnees: any;

  public formAddMaregraphe: any

  constructor(private apiChoixMaregraphe: APIChoixMaregrapheService,
    private formBuilder: FormBuilder,
  ) {
    this.formAddMaregraphe = this.formBuilder.group({
      id_maregraphe: "",
      ville: "",
      latitude: "",
      longitude: "",
    })
  }

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

  
  /**
   * @brief Afficher le formulaire d'ajout d'un marégraphe
   */
  public async show_add_maregraphe(){
    let form = document.getElementById("hide_form_add")?.style;
    if (form) form.display = 'block';
  }

  /**
   * Ajouter un type de métadonné dans la BDD
   */
  public async addMaregraphe(){
    const value = this.formAddMaregraphe.value
    await this.apiChoixMaregraphe.addMaregraphe(value.id_maregraphe, value.ville, value.latitude, value.longitude).then(() => {
      location.reload()
    })
  }

  /**
   * @brief fermer le formulaire d'ajout d'une métadonnée
   */
  public async annuler_add(){
    let form = document.getElementById("hide_form_add")?.style;
    if (form) form.display = 'none';
  }

  /**
   * @brief ajouter une métadonnée au marégraphe
   */
  public async show_modif_maregraphe(){
    let form = document.getElementById("hide_form_modif")?.style;
    if (form) form.display = 'block';
  }

  /**
   * @brief fermer le formulaire d'ajout d'une métadonnée
   */
  public async annuler_modif(){
    let form = document.getElementById("hide_form_modif")?.style;
    if (form) form.display = 'none';
  }
}
