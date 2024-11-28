import { Component, OnInit } from '@angular/core';
import { ApiMeta } from '../../services/api_meta/api_meta.service';
import { Data } from '@angular/router';
import { Meta } from '../../class/meta';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tab-meta',
  templateUrl: './tab_meta.component.html',
  styleUrls: ['./tab_meta.component.css']
})


export class TabMetaComponent implements OnInit {
  errorMessage: string = '';
  isDataLoaded : boolean = false;
  donnees: any;

  public formAddMeta: FormGroup;
  public formModifMeta: FormGroup;

  constructor(private apiMeta: ApiMeta,
    private formBuilder: FormBuilder,
  ) {
    this.formAddMeta = this.formBuilder.group({
      id: "",
      description: "",
      ordre: "",
    })
    this.formModifMeta = this.formBuilder.group({
      id: "",
      description: "",
      ordre: "",
    })
  }

  ngOnInit(): void {
    this.getData();
  }

  /**
   * @brief Obtenir les différents types de métadonnées éxistants dans la BDD
   */
  public async getData(){
    const data : any = await this.apiMeta.getData();
    const meta: Meta [] = [];
    data.forEach((element : any) => {
      meta.push(new Meta(element.id, element.description, element.ordre));
    })
    this.donnees = meta;
    this.isDataLoaded = true;
  }

  /**
   * @brief Afficher le formulaire d'ajout d'une metadonnée
   */
  public async show_add_meta(){
    let form = document.getElementById("hide_form")?.style;
    if (form) form.display = 'block';
  }

  /**
   * Ajouter un type de métadonné dans la BDD
   */
  public async addMeta(){
    const value = this.formAddMeta.value
    await this.apiMeta.addMeta(value.id, value.description, value.ordre).then(() => {
      location.reload();
    }).catch((error: any) => {
      alert(error);
    })
  }

  /**
   * Modifier les informations d'une métadonnée
   */
  public async updateMeta(){
    const value = this.formModifMeta.value;
    console.log(value)
    await this.apiMeta.updateMeta(value.id, value.description, value.ordre).then(() => {
      location.reload()
    }).catch((error: any) => {
      alert(error)
    })
  }
  
  /**
   * Supprimer le type de métadonnée dans la base de donnée
   * @param meta string : Id du type de la métadonnée
   */
  public async deleteMeta(meta: string){
    if(!confirm("Voulez-vous supprimer ce type de métadonné?")){
      await this.apiMeta.deleteMeta(meta).then(() => {
        location.reload();
      }).catch((error: any) => {
        alert(error);
      })      
    }
  }

  /**
   * @brief Fermer le formulaire d'ajout d'un type de métadonné
   */
  public async annuler(){
    let form = document.getElementById("hide_form")?.style;
    if (form) form.display = 'none';
  }

    /**
   * @brief ajouter une métadonnée au marégraphe
   */
    public async show_modif_form(
      idMeta: string,
      description: string,
      ordre: number,
    ){
      this.formModifMeta.setValue({
        "id": idMeta,
        "description": description,
        "ordre": ordre
      })
      let form = document.getElementById("hide_form_modif")?.style;
      if (form) form.display = 'block';
    }

  /**
   * @brief fermer le formulaire d'ajout d'une métadonnée
   */
  public async hideForm(){
    let form = document.getElementById("hide_form_modif")?.style;
    if (form) form.display = 'none';
  }
}
