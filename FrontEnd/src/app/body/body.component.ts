import { Component, OnInit } from '@angular/core';
import { ApiService, DataResponse } from '../services/api.service';
import { Data } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})

export class BodyComponent implements OnInit {
  data: DataResponse | null = null;
  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Récupérer les données lors de l'initialisation du composant
    // this.apiService.getData().subscribe({
    //   next: (result : DataResponse) => {
    //     this.data = result;
    //   },
    //   error: (error: any) => {
    //     this.errorMessage = 'Erreur lors de la récupération des données';
    //     console.error('Erreur:', error);
    //   },
    // });
    this.getData();
  }

  public async getData(){
    console.log(this.apiService.getData())
    const data : any = await this.apiService.getData()
    console.log(data)
    console.log(typeof(data))
    data.forEach((element : any) => {
      console.log(element)
    })
  }
}