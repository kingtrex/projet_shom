import { Component, OnInit } from '@angular/core';
import { ApiMaregraphemeta } from '../../services/api_maregraphemeta/api_maregraphemeta.service';
import { ActivatedRoute, Data } from '@angular/router';
import { maregrapheMeta } from '../../class/maregraphemeta';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-tab-maregraphemeta',
  templateUrl: './tab_maregraphemeta.component.html',
  styleUrls: ['./tab_maregraphemeta.component.css']
})

export class TabMaregraphemetaComponent implements OnInit {

  errorMessage: string = '';
  isDataLoaded : boolean = false;
  donnees: any;
  id_maregraphe: number = +this.route.snapshot.paramMap.get('id')!;
  ville_maregraphe: string = this.route.snapshot.paramMap.get('ville')!;
  public formAddMeta: any;
  constructor(private apiMaregrapheMeta: ApiMaregraphemeta,
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

  }

  /**
   * @biref Obtenir les métadonnées du marégraphe
   */
  public async getData(){
    await this.apiMaregrapheMeta.getData(this.id_maregraphe).then((data: any) => {
      const meta: maregrapheMeta[] = [];
      data.forEach((element : any) => {
        meta.push(new maregrapheMeta(element.id_maregraphe, element.id_meta, element.donnee, element.date_donnee));
      })
      this.donnees = meta;
      this.isDataLoaded = true;      
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

  public async deleteMeta(idMare: number, idMeta: string){
    if(!confirm("Voulez-vous vraiment supprimer cette métadonnée?")) return
    await this.apiMaregrapheMeta.deleteMeta(idMare, idMeta).then(() => {
      location.reload()
    }).catch((error: any) => {
      alert(error)
    })
  }
}