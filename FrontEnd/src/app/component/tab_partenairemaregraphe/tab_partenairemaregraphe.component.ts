import { Component, OnInit } from '@angular/core';
import { ApiPartenaireMaregrapheService } from '../../services/api_partenaire_maregraphe/api_partenaire_maregraphe.service';
import { ActivatedRoute, Data } from '@angular/router';
import { maregraphe } from '../../class/maregraphe';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tab-partenairemaregraphe',
  templateUrl: './tab_partenairemaregraphe.component.html',
  styleUrls: ['./tab_partenairemaregraphe.component.css']
})
export class TabPartenaireMaregrapheComponent {
  errorMessage: string = '';
  isDataLoaded : boolean = false;
  donnees: any;
  id: number = +this.route.snapshot.paramMap.get('id')!;
  public formAddMaregraphe: any;
  constructor(private ApiPartenaireMaregrapheService: ApiPartenaireMaregrapheService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.formAddMaregraphe = this.formBuilder.group({
      idMaregraphe: "",
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
    await this.ApiPartenaireMaregrapheService.getData(this.id).then((data: any) => {
      const mare: maregraphe[] = [];
      data.forEach((element : any) => {
        mare.push(new maregraphe(element.id, element.libelle, element.latitude, element.longitude));
      })
      this.donnees = mare;
      this.isDataLoaded = true;      
    }).catch((error: any) => {
      alert(error)
    })

  }
}