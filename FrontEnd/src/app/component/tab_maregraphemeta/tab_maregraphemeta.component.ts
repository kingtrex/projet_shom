import { Component, OnInit } from '@angular/core';
import { ApiMaregraphemeta } from '../../services/api_maregraphemeta/api_maregraphemeta.service';
import { Data } from '@angular/router';
import { maregrapheMeta } from '../../class/maregraphemeta';
@Component({
  selector: 'app-tab-maregraphemeta',
  templateUrl: './tab_maregraphemeta.component.html',
  styleUrls: ['./tab_maregraphemeta.component.css']
})

export class TabMaregraphemetaComponent implements OnInit {

  errorMessage: string = '';
  isDataLoaded : boolean = false;
  donnees: any;
  id_maregraphe: number;
  constructor(private apiMaregrapheMeta: ApiMaregraphemeta) {
    let tab = document.location.pathname.split('/');
    this.id_maregraphe = parseInt(tab[tab.length-1]);
    console.log(this.id_maregraphe);
  }

  ngOnInit(): void {
    this.getData();
  }

  public async getData(){
    console.log(this.apiMaregrapheMeta.getData(this.id_maregraphe))

    const data : any = await this.apiMaregrapheMeta.getData(this.id_maregraphe)
    console.log(data)
    const meta: maregrapheMeta[] = [];
    console.log(typeof(data))
    data.forEach((element : any) => {
      meta.push(new maregrapheMeta(element.id_maregraphe, element.id_meta, element.donnee, element.date_donnee));
    })
    this.donnees = meta;
    console.log(this.donnees);
    this.isDataLoaded = true;
  }

  public async add_meta(){
    console.log("coin");
    let form = document.getElementById("hide_form")?.style;
    if (form) {
    form.display = 'block';
    }
  }

  public async annuler(){
    console.log("coin");
    let form = document.getElementById("hide_form")?.style;
    if (form) {
    form.display = 'none';
    }
  }
}