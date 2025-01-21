import { Component } from '@angular/core';
import { ApiChoixPartenaireService } from '../../services/api_choix_partenaire/api_choix_partenaire.service';
import { Data } from '@angular/router';
import { Partenaire } from '../../class/Partenaire';
import { Form, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tab-partenaire',
  templateUrl: './choix_partenaire.component.html',
  styleUrls: ['./choix_partenaire.component.css']
})

export class ChoixPartenaireComponent {
  errorMessage: string = '';
  isDataLoaded : boolean = false;
  donnees: any;

  public formAddPartenaire: FormGroup;
  public formModifPartenaire: FormGroup;

  public sortData: {[key: string] : boolean} = {
    "id": true,
    "nom" : false,
  };
  public triangleData: {[key: string] : string} = {
    "id": "▼",
    "nom" : "▼",
  }

  constructor(private apiChoixPartenaire: ApiChoixPartenaireService,
    private formBuilder: FormBuilder,
  ) {
    this.formAddPartenaire = this.formBuilder.group({
      id: "",
      nom: "",
      logo: "",
      url: "",
    })
    this.formModifPartenaire = this.formBuilder.group({
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
    const meta: Partenaire[] = [];
    data.forEach((element : any) => {
      meta.push(new Partenaire(element.id, element.nom, element.logo, element.url));
    })
    this.donnees = meta;
    this.isDataLoaded = true;
  }

  /**
   *  @brief Afficher le formulaire de modification d'un partenaire*
   */ 
  public async showModifPartenaire(id: number, nom: string, logo: string, url: string){
    this.formModifPartenaire.setValue({
      id: id,
      nom: nom,
      logo: logo,
      url: url,
    })
    let form = document.getElementById("hide_form_modif")?.style;
    if (form) form.display = 'block';
  }

  public async modifPartenaire(){
    const value = this.formModifPartenaire.value
    await this.apiChoixPartenaire.updatePartenaire(value.id, value.nom, value.logo, value.url).then(() => {
      location.reload()
    }).catch((error: any) => {
      alert(error)
    })
  }

   /** @brief fermer le formulaire de modification d'un partenaire  */
   
  public async annulerModif(){
    let form = document.getElementById("hide_form_modif")?.style;
    if (form) form.display = 'none';
  }

  public async sort(col: string){
    await this.apiChoixPartenaire.sortData(col, this.sortData[col]).then((element: any) => {
      this.donnees = []
      element.forEach((partenaire: any) => {
        this.donnees.push(new Partenaire(partenaire.id, partenaire.nom, partenaire.logo, partenaire.url))
      })
      this.sortData[col] = !this.sortData[col];
      this.triangleData[col] = this.sortData[col] ? "▼" : "▲";
    }).catch((error: any) => {
      alert(error)
    })
  }
}