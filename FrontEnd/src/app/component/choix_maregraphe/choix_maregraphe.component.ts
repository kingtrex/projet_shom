import { Component } from '@angular/core';
import { APIChoixMaregrapheService } from '../../services/api_choix_maregraphe/api_choix_maregraphe.service';
import { Data } from '@angular/router';
import { Maregraphe } from '../../class/Maregraphe';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-choix-maregraphe',
  templateUrl: './choix_maregraphe.component.html',
  styleUrls: ['./choix_maregraphe.component.css']
})

export class ChoixMaregrapheComponent {
  public errorMessage: string = '';
  public isDataLoaded : boolean = false;
  public donnees: Maregraphe[] = [];

  public formAddMaregraphe: any;

  public sortData: {[key: string] : boolean} = {
    "id_tdb": true,
    "libelle" : false,
  };
  public triangleData: {[key: string] : string} = {
    "id_tdb": "▼",
    "libelle" : "▼",
  }
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
    data.forEach((element : any) => {
      this.donnees.push(new Maregraphe(element.id_tdb, element.libelle, element.latitude, element.longitude));
    })
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
   * Ajouter un nouveau marégraphe dans la BDD
   */
  public async addMaregraphe(){
    const value = this.formAddMaregraphe.value
    await this.apiChoixMaregraphe.addMaregraphe(value.id_maregraphe, value.ville, value.latitude, value.longitude).then(() => {
      location.reload()
    })
  }

  /**
   * @brief fermer le formulaire d'ajout d'un marégraphe
   */
  public async annuler_add(){
    let form = document.getElementById("hide_form_add")?.style;
    if (form) form.display = 'none';
  }

  /**
   * @brief Afficher le formulaire de modification d'un marégraphe
   */
  public async show_modif_maregraphe(){
    let form = document.getElementById("hide_form_modif")?.style;
    if (form) form.display = 'block';
  }

  /**
   * @brief fermer le formulaire de modification d'un marégraphe
   */
  public async annuler_modif(){
    let form = document.getElementById("hide_form_modif")?.style;
    if (form) form.display = 'none';
  }

  public async sort(col: string){
    const data : any = await this.apiChoixMaregraphe.sortData(col, this.sortData[col]);
    data.forEach((element : any) => {
      this.donnees.push(new Maregraphe(element.id_tdb, element.libelle, element.latitude, element.longitude));
    })
    this.sortData[col] = !this.sortData[col];
    this.triangleData[col] = this.sortData[col] ? "▼" : "▲";
    this.donnees = data;
  }
}
