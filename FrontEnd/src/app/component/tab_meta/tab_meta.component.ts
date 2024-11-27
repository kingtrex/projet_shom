import { Component, OnInit } from '@angular/core';
import { ApiMeta } from '../../services/api_meta/api_meta.service';
import { Data } from '@angular/router';
import { Meta } from '../../class/meta';

@Component({
  selector: 'app-tab-meta',
  templateUrl: './tab_meta.component.html',
  styleUrls: ['./tab_meta.component.css']
})


export class TabMetaComponent implements OnInit {
  errorMessage: string = '';
  isDataLoaded : boolean = false;
  donnees: any;

  constructor(private apiMeta: ApiMeta) {}

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
      meta.push(new Meta(element.id, element.description));
    })
    this.donnees = meta;
    this.isDataLoaded = true;
  }

  /**
   * @brief Ajouter un nouveau type de métadonnée
   */
  public async add_meta(){
    let form = document.getElementById("hide_form")?.style;
    if (form) form.display = 'block';
  }

  /**
   * @brief Fermer le formulaire d'ajout d'un type de métadonné
   */
  public async annuler(){
    let form = document.getElementById("hide_form")?.style;
    if (form) form.display = 'none';
  }
}
