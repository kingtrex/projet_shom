import { Component, OnInit } from '@angular/core';
import { ApiService, DataResponse } from '../services/api.service';

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
    this.apiService.getData().subscribe({
      next: (result) => {
        this.data = result;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la récupération des données';
        console.error('Erreur:', error);
      },
    });
  }
}