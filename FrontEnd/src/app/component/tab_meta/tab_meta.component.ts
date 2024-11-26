import { Component, OnInit } from '@angular/core';
import { ApiMeta } from '../../services/api_meta/api_meta.service';
import { Data } from '@angular/router';
import { Meta } from '../../class/meta';

@Component({
  selector: 'app-tab-meta',
  templateUrl: './tab_meta.component.html',
  styleUrls: ['./tab_meta.component.css']
})


export class TabMetaComponent implements OnInit {
  errorMessage: string = '';
  isDataLoaded : boolean = false;
  donnees: any;

  constructor(private apiMeta: ApiMeta) {}

  ngOnInit(): void {
    this.getData();
  }

  public async getData(){
    console.log(this.apiMeta.getData())

    const data : any = await this.apiMeta.getData()
    console.log(data)
    const meta: Meta [] = []
    data.forEach((element : any) => {
      meta.push(new Meta(element.id, element.description));
    })
    this.donnees = meta;
    console.log(this.donnees);
    this.isDataLoaded = true;
  }
}