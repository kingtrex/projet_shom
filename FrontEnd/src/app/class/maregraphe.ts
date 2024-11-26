export class maregraphe{
    id_tdb:number;
    libelle:string;
    latitude:number;
    longitude:number;
    constructor(id_tdb:number,
        libelle:string,
        latitude:number,
        longitude:number){
            this.id_tdb = id_tdb;
            this.libelle = libelle;
            this.latitude = latitude;
            this.longitude = longitude;
        }
}