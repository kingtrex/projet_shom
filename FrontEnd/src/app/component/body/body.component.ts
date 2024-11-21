import { Component, OnInit } from '@angular/core';
import { ApiMaregraphemeta, DataResponse } from '../../services/api_maregraphemeta/api_maregraphemeta.service';
import { Data } from '@angular/router';
import { maregrapheMeta } from '../../class/maregraphemeta';

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

  constructor(private apiMaregrapheMeta: ApiMaregraphemeta) {}

  ngOnInit(): void {
    this.getData();
  }

  public async getData(){
    console.log(this.apiMaregrapheMeta.getData())

    const data : any = await this.apiMaregrapheMeta.getData()
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
}
