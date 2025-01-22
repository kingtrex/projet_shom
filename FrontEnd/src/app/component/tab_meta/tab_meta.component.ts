import { Component, OnInit } from '@angular/core';
import { ApiMeta } from '../../services/api_meta/api_meta.service';
import { Meta } from '../../class/Meta';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tab-meta',
  templateUrl: './tab_meta.component.html',
  styleUrls: ['./tab_meta.component.css']
})


export class TabMetaComponent implements OnInit {
  public isDataLoaded : boolean = false;
  public donnees: Meta[] = [];

  public formAddMeta: FormGroup;
  public formModifMeta: FormGroup;

  public sortData: {[key: string] : boolean} = {
    "id" : true,
  }

  public triangleData: {[key: string] : string} = {
    "id" : "▼",
  }

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
   * Obtenir les métadonnées
   */
  public async getData(){
    await this.apiMeta.getData().then((element: any) => {
      element.forEach((meta: any) => {
        this.donnees.push(new Meta(meta.id, meta.description, meta.ordre));
      })
    }).catch((error: any) => {
      alert(error)
    });
    this.isDataLoaded = true;
  }

  /**
   * Afficher le formulaire d'ajout d'un type de métadonné
   */
  public async showAddMeta(){
    let form = document.getElementById("hide_form_add")?.style;
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
    await this.apiMeta.updateMeta(value.id, value.description, value.ordre).then(() => {
      location.reload()
    }).catch((error: any) => {
      alert(error)
    })
  }

  /**
   * Supprimer un type de métadonné
   * @param {string} meta - Le type de métadonné à supprimer 
   */
  public async deleteMeta(meta: string){
    if(confirm("Voulez-vous supprimer ce type de métadonné?")){
      await this.apiMeta.deleteMeta(meta).then(() => {
        location.reload();
      }).catch((error: any) => {
        alert(error);
      })      
    }
  }

  /**
   * Fermer le formulaire d'ajout d'un type de métadonné
   */
  public async annuler(){
    let form = document.getElementById("hide_form_add")?.style;
    if (form) form.display = 'none';
  }

  /**
   * Afficher le formulaire de modification d'une métadonnée
   * @param {string} idMeta - L'ID de la métadonnée 
   * @param {string} description - La description de la métadonnée 
   * @param {number} ordre - L'ordre de la métadonnée 
   */
  public async showModifForm(
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
   * Cacher le formulaire de modification d'une métadonnée
   */
  public async hideForm(){
    let form = document.getElementById("hide_form_modif")?.style;
    if (form) form.display = 'none';
  }

  /**
   * Trier le tableau de données en fonction de la colonne
   * @param {string} col - La colonne par laquelle trier 
   */
  public async sort(col: string){
    await this.apiMeta.sortData(col, this.sortData[col]).then((element: any) => {
      this.donnees = []
      element.forEach((meta: any) => {
        this.donnees.push(new Meta(meta.id, meta.description, meta.ordre))
      })
      this.sortData[col] = !this.sortData[col];
      this.triangleData[col] = this.sortData[col] ? "▼" : "▲";
    })
  }
}

