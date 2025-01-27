import { Component, OnInit } from '@angular/core';
import { ApiMeta } from '../../services/api_meta/api_meta.service';
import { Meta } from '../../class/Meta';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth_service/auth.service';

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

  public isAdmin: boolean = this.authService.isAdmin(localStorage.getItem("token")!);

  constructor(private apiMeta: ApiMeta,
    private formBuilder: FormBuilder,
    private authService: AuthService,
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
   * @brief Obtenir les différents types de métadonnées existants dans la BDD
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
   * @brief Afficher le formulaire d'ajout d'une metadonnée
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
   * Supprimer le type de métadonnée dans la base de donnée
   * @param meta string : Id du type de la métadonnée
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
   * @brief Fermer le formulaire d'ajout d'un type de métadonné
   */
  public async annuler(){
    let form = document.getElementById("hide_form_add")?.style;
    if (form) form.display = 'none';
  }



    /**
   * @brief ajouter une métadonnée au marégraphe
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
   * @brief fermer le formulaire de modification d'une métadonnée
   */
  public async hideForm(){
    let form = document.getElementById("hide_form_modif")?.style;
    if (form) form.display = 'none';
  }

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

