export class MaregrapheMeta{
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
            const date = new Date(date_donnee);
      
            // Extraire les composantes de la date
            const day = date.getDate().toString().padStart(2, '0'); // Jour (2 chiffres)
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mois (2 chiffres)
            const year = date.getFullYear(); // Année
            const hours = date.getHours().toString().padStart(2, '0'); // Heures (2 chiffres)
            const minutes = date.getMinutes().toString().padStart(2, '0'); // Minutes (2 chiffres)
            const seconds = date.getSeconds().toString().padStart(2, '0'); // Secondes (2 chiffres)
            this.date_donnee = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        }
}