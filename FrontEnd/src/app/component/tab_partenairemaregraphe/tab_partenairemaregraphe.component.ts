import { Component, OnInit } from '@angular/core';
import { ApiPartenaireMaregrapheService } from '../../services/api_partenaire_maregraphe/api_partenaire_maregraphe.service';
import { ActivatedRoute, Data } from '@angular/router';
import { Maregraphe } from '../../class/Maregraphe';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tab-partenairemaregraphe',
  templateUrl: './tab_partenairemaregraphe.component.html',
  styleUrls: ['./tab_partenairemaregraphe.component.css']
})
export class TabPartenaireMaregrapheComponent implements OnInit{

  public isDataLoaded : boolean = false;
  public donnees: Maregraphe[] = [];
  public id: number = +this.route.snapshot.paramMap.get('id')!;
  public partenaire: string = this.route.snapshot.paramMap.get('partenaire')!;
  public formAddMaregraphe: FormGroup;
  public formModifMaregraphe: FormGroup;
  

  public sortData: {[key: string] : boolean} = {
    "id_maregraphe": true,
    "libelle" : false,
  };
  public triangleData: {[key: string] : string} = {
    "id_maregraphe": "▼",
    "libelle" : "▼",
  }

  constructor(private ApiPartenaireMaregrapheService: ApiPartenaireMaregrapheService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.formAddMaregraphe = this.formBuilder.group({
      id_maregraphe: "",
      ville: "",
      latitude: "",
      longitude: "",
    })
    this.formModifMaregraphe = this.formBuilder.group({
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
   * @biref Obtenir les métadonnées du marégraphe
   */
  public async getData(){
    await this.ApiPartenaireMaregrapheService.getData(this.id).then((element: any) => {
      element.forEach((maregraphe: any) => {
        this.donnees.push(new Maregraphe(maregraphe.id_maregraphe, maregraphe.libelle, maregraphe.latitude, maregraphe.longitude))
      })
      this.isDataLoaded = true;      
    }).catch((error: any) => {
      alert(error)
    })
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
  /*
  public async addMaregraphe(){
    const value = this.formAddMaregraphe.value
    await this.apiChoixMaregraphe.addMaregraphe(value.id_maregraphe, value.ville, value.latitude, value.longitude).then(() => {
      location.reload()
    }).catch((error: any) => {
      alert(error);
    })
  }
*/
  /**
   * @brief fermer le formulaire d'ajout d'un marégraphe
   */
  public async annuler(){
    let form = document.getElementById("hide_form_add")?.style;
    if (form) form.display = 'none';
  }

  public async sort(col: string){
    await this.ApiPartenaireMaregrapheService.sortData(this.id, col, this.sortData[col]).then((element: any) => {
      this.donnees = []
      element.forEach((maregraphe: any) => {
        this.donnees.push(new Maregraphe(maregraphe.id_maregraphe, maregraphe.libelle, maregraphe.latitude, maregraphe.longitude))
      })
      this.sortData[col] = !this.sortData[col];
      this.triangleData[col] = this.sortData[col] ? "▼" : "▲";
    }).catch((error: any) => {
      alert(error)
    })
  }

  
}