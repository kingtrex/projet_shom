export class maregrapheMeta{
    id_maregraphe:number;
    id_meta:string;
    donnee:string;
    date_donnee:string;
    constructor(id_maregraphe:number,
        id_meta:string,
        donnee:string,
        date_donnee:string){
            this.id_maregraphe = id_maregraphe;
            this.id_meta = id_meta;
            this.donnee = donnee;
            this.date_donnee = date_donnee;
        }
}