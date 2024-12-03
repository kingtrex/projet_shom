import { Component } from '@angular/core';
import { ApiChoixPartenaireService } from '../../services/api_choix_partenaire/api_choix_partenaire.service';
import { Data } from '@angular/router';
import { partenaire } from '../../class/partenaire';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tab-partenaire',
  templateUrl: './choix_partenaire.component.html',
  styleUrls: ['./choix_partenaire.component.css']
})

export class ChoixPartenaireComponent {
  errorMessage: string = '';
  isDataLoaded : boolean = false;
  donnees: any;

  public formAddPartenaire: any

  constructor(private apiChoixPartenaire: ApiChoixPartenaireService,
    private formBuilder: FormBuilder,
  ) {
    this.formAddPartenaire = this.formBuilder.group({
      id: "",
      nom: "",
      logo: "",
      url: "",
    })
  }

  ngOnInit(): void {
    this.getData();
  }

  /**
   * @brief Obtenir les différents partenaires
   */
  public async getData(){
    const data : any = await this.apiChoixPartenaire.getData()
    const meta: partenaire[] = [];
    data.forEach((element : any) => {
      meta.push(new partenaire(element.id, element.nom, element.logo, element.url));
    })
    this.donnees = meta;
    this.isDataLoaded = true;
  }


  /**
   * @brief Afficher le formulaire d'ajout d'un partenaire
   
  public async show_add_partenaire(){
    let form = document.getElementById("hide_form_add")?.style;
    if (form) form.display = 'block';
  }

  /**
   * Ajouter un nouveau partenaire dans la BDD
   
  public async addPartenaire(){
    const value = this.formAddPartenaire.value
    await this.apiChoixPartenaire.addPartenaire(value.id, value.nom, value.logo, value.url).then(() => {
      location.reload()
    })
  }

  /**
   * @brief fermer le formulaire d'ajout d'un partenaire
   
  public async annuler_add(){
    let form = document.getElementById("hide_form_add")?.style;
    if (form) form.display = 'none';
  }

  /**
   * @brief Afficher le formulaire de modification d'un partenaire
   *
  public async show_modif_partenaire(){
    let form = document.getElementById("hide_form_modif")?.style;
    if (form) form.display = 'block';
  }

  /**
   * @brief fermer le formulaire de modification d'un partenaire
   
  public async annuler_modif(){
    let form = document.getElementById("hide_form_modif")?.style;
    if (form) form.display = 'none';
  }
    */

}