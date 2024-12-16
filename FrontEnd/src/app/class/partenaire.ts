export class Partenaire{
    id:number;
    nom:string;
    logo: string;
    url: string;
    constructor(id:number,
        nom:string,
        logo: string,
        url: string){
            this.id = id;
            this.nom = nom;
            this.logo = logo;
            this.url = url;
        }
}
