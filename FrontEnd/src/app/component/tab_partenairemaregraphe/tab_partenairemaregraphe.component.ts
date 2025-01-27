import { Component, OnInit } from '@angular/core';
import { ApiPartenaireMaregrapheService } from '../../services/api_partenaire_maregraphe/api_partenaire_maregraphe.service';
import { APIChoixMaregrapheService } from '../../services/api_choix_maregraphe/api_choix_maregraphe.service';
import { ActivatedRoute, Data } from '@angular/router';
import { Maregraphe } from '../../class/Maregraphe';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { SharedServiceService } from 'src/app/services/shared_service/shared-service.service';
import { AuthService } from 'src/app/services/auth_service/auth.service';

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
  public dictMaregraphe: {[key: string]: number} = {};
  public listMaregraphe: Maregraphe[] = [];

  public sortData: {[key: string] : boolean} = {
    "id_maregraphe": true,
    "libelle" : false,
  };
  public triangleData: {[key: string] : string} = {
    "id_maregraphe": "▼",
    "libelle" : "▼",
  }

  public isAdmin: boolean = this.authService.isAdmin(localStorage.getItem("token")!);

  constructor(private ApiPartenaireMaregrapheService: ApiPartenaireMaregrapheService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private sharedService: SharedServiceService,
    private authService: AuthService,
  ) {
    this.formAddMaregraphe = this.formBuilder.group({
      maregraphe : "",
      ordre : "",
    })
    this.sharedService.setData("origine", "partenaire_maregraphe");
    this.sharedService.setData("id", String(this.id));
    this.sharedService.setData("partenaire", this.partenaire);
  }

  ngOnInit(): void {
    this.getData();
    this.getPotentialMaregraphe();
  }

  /**
   * Obtenir les marégraphes du partenaire
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
   * Obtenir les marégraphe qui ne sont pas assigné au partenaire
   */
  public async getPotentialMaregraphe(){
    await this.ApiPartenaireMaregrapheService.getMaregrapheForm(this.id).then((element: any) => {
      element.forEach((maregraphe: any) => {
        this.listMaregraphe.push(new Maregraphe(maregraphe.id_maregraphe, maregraphe.libelle, maregraphe.latitude, maregraphe.longitude))
        this.dictMaregraphe[maregraphe.libelle] = maregraphe.id_tdb;
      })
    }).catch((error: any) => {
      alert(error)
    })
  }

  /**
   * Trier le tableau de données en fonction de la colonne
   * @param {string} col - La colonne par laquelle trier
   */
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

  /**
   * Afficher le formulaire d'ajout de marégraphe
   */
  public async showAddMaregraphe(){
    document.getElementById("hide_form_add")!.style.display = "block";
  }

  /**
   * Assigner un marégraphe au partenaire
   */
  public async addMaregraphe(){
    const value = this.formAddMaregraphe.value;
    await this.ApiPartenaireMaregrapheService.addMaregraphe(this.id, this.dictMaregraphe[value.maregraphe], value.ordre).then((element: any) => {
      location.reload();
    }).catch((error: any) => {
      alert(error)
    })
  }

  /**
   * Fermer le formulaire d'ajout de marégraphe
   */
  public async annuler(){
    let form = document.getElementById("hide_form_add")?.style;
    if (form) form.display = 'none';
  }

  /**
   * Désassigner le marégraphe du partenaire
   * @param {number} idParte - L'ID du partenaire 
   * @param {number} idMare - L'ID du marégraphe 
   * @returns 
   */
  public async deleteMaregraphe(idParte: number, idMare: number){
    if(confirm("Voulez-vous vraiment supprimer cette métadonnée?")){
      await this.ApiPartenaireMaregrapheService.deleteMaregraphe(idParte, idMare).then(() => {
        location.reload()
      }).catch((error: any) => {
        alert(error)
      })      
    }
  }
}