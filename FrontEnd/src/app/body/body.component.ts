import { Component, OnInit } from '@angular/core';
import { ApiService, DataResponse } from '../services/api.service';
import { Data } from '@angular/router';
import { Metadonnee } from '../class/metadonnee';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})

export class BodyComponent implements OnInit {
  data: DataResponse | null = null;
  errorMessage: string = '';
  isDataLoaded : boolean = false;
  donnees: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getData();
  }

  public async getData(){
    console.log(this.apiService.getData())
    const data : any = await this.apiService.getData()
    console.log(data)
    const meta: Metadonnee[] = [];
    console.log(typeof(data))
    data.forEach((element : any) => {
      meta.push(new Metadonnee(element.id_maregraphe, element.id_meta, element.donnee, element.date_donnee));
    })
    this.donnees = meta;
    console.log(this.donnees);
    this.isDataLoaded = true;
  }
}