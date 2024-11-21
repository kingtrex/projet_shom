export class maregraphe{
    id_tdb:number;
    libelle:string;
    latitude:string;
    longitude:string;
    constructor(id_tdb:number,
        libelle:string,
        latitude:string,
        longitude:string){
            this.id_tdb = id_tdb;
            this.libelle = libelle;
            this.latitude = latitude;
            this.longitude = longitude;
        }
}