import { Component, OnInit } from '@angular/core';
import { ApiMeta } from '../../services/api_meta/api_meta.service';
import { Data } from '@angular/router';
import { Meta } from '../../class/meta';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tab-meta',
  templateUrl: './tab_meta.component.html',
  styleUrls: ['./tab_meta.component.css']
})


export class TabMetaComponent implements OnInit {
  errorMessage: string = '';
  isDataLoaded : boolean = false;
  donnees: any;

  public formAddMeta: any
  constructor(private apiMeta: ApiMeta,
    private formBuilder: FormBuilder,
  ) {
    this.formAddMeta = this.formBuilder.group({
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
    const data : any = await this.apiMeta.getData()
    const meta: Meta [] = []
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
      location.reload()
    })
  }

  /**
   * @brief Fermer le formulaire d'ajout d'un type de métadonné
   */
  public async annuler(){
    let form = document.getElementById("hide_form")?.style;
    if (form) form.display = 'none';
  }
}
