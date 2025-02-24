export class Maregraphe{
    id_tdb: number;
    libelle: string;
    latitude: number;
    longitude: number;
    ordre: number = 0; 
    constructor(id_tdb:number,
        libelle:string,
        latitude:number,
        longitude:number,
        ordre:number = -1){
            this.id_tdb = id_tdb;
            this.libelle = libelle;
            this.latitude = latitude;
            this.longitude = longitude;
            this.ordre = ordre;
        }
    
}