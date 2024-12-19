import { Component, OnInit } from '@angular/core';
import { ApiMaregraphemeta } from '../../services/api_maregraphemeta/api_maregraphemeta.service';
import { ApiMeta } from '../../services/api_meta/api_meta.service';
import { ActivatedRoute, Data } from '@angular/router';
import { MaregrapheMeta } from 'src/app/class/Maregraphemeta';
import { Meta } from 'src/app/class/Meta';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-tab-maregraphemeta',
  templateUrl: './tab_maregraphemeta.component.html',
  styleUrls: ['./tab_maregraphemeta.component.css']
})

export class TabMaregraphemetaComponent implements OnInit {

  public isDataLoaded : boolean = false;
  public donnees: MaregrapheMeta[] = [];
  public id_maregraphe: number = +this.route.snapshot.paramMap.get('id')!;
  public ville_maregraphe: string = this.route.snapshot.paramMap.get('ville')!;
  public formAddMeta: any;
  public metadonnees: Meta[] = [];

  public sortData: {[key: string] : boolean} = {
    "id_meta" : true,
    "date_donnee" : false,
  };

  public triangleData: {[key: string] : string} = {
    "id_meta" : "▼",
    "date_donnee" : "▼"
  } 
  constructor(private apiMaregrapheMeta: ApiMaregraphemeta,
    private apiMeta: ApiMeta,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.formAddMeta = this.formBuilder.group({
      idMeta: "",
      data: "",
    })
  }

  ngOnInit(): void {
    this.getData();
    this.getMeta();

  }

  /**
   * @biref Obtenir les métadonnées du marégraphe
   */
  public async getData(){
    await this.apiMaregrapheMeta.getData(this.id_maregraphe).then((data: any) => {
      data.forEach((element : any) => {
        this.donnees.push(new MaregrapheMeta(element.id_maregraphe, element.id_meta, element.donnee, element.date_donnee));
      })
      this.isDataLoaded = true;      
    }).catch((error: any) => {
      alert(error)
    })

  }

  public async getMeta(){
    await this.apiMeta.getMetaForm(this.id_maregraphe).then((data: any) => {
      data.forEach((element : any) => {
        this.metadonnees.push(new Meta(element.id, element.description, element.ordre));
      })
      this.isDataLoaded = true;  
      console.log(this.metadonnees);  
    }).catch((error: any) => {
      alert(error)
    })
  }


  /**
   * @brief ajouter une métadonnée au marégraphe
   */
  public async show_add_meta(){
    let form = document.getElementById("hide_form")?.style;
    if (form) form.display = 'block';
  }

  /**
   * Ajouter une métadonné pour le marégraphe
   */
  public async addMeta(){
    const value = this.formAddMeta.value ;
    await this.apiMaregrapheMeta.addMeta(this.id_maregraphe, value.idMeta, value.data).then(() => {
      location.reload()
    }).catch((error: any) =>{
      this.formAddMeta.reset()
      alert(error);
    })
  }
  
  /**
   * @brief fermer le formulaire d'ajout d'une métadonnée
   */
  public async annuler(){
    let form = document.getElementById("hide_form")?.style;
    if (form) form.display = 'none';
  }

  /**
   * Supprimer une métadonnée du marégraphe
   * @param idMare number : identifiant du marégraphe
   * @param idMeta string : identifiant de la métadonné
   * @returns 
   */
  public async deleteMeta(idMare: number, idMeta: string){
    if(!confirm("Voulez-vous vraiment supprimer cette métadonnée?")) return
    await this.apiMaregrapheMeta.deleteMeta(idMare, idMeta).then(() => {
      location.reload()
    }).catch((error: any) => {
      alert(error)
    })
  }

  /**
   * Trier les colonne du tableau
   * @param col string : nom de la colonne
   */
  public async sort(col: string){
    await this.apiMaregrapheMeta.sortData(this.id_maregraphe, col, this.sortData[col]).then((element: any) => {
      this.donnees = []
      element.forEach((meta: any) => {
        this.donnees.push(new MaregrapheMeta(meta.id_maregraphe, meta.id_meta, meta.donnee, meta.date_donnee))
      })
      this.sortData[col] = !this.sortData[col];
      this.triangleData[col] = this.sortData[col] ? "▼" : "▲";
    })
  }
}