GET /maregraphe/getMaregraphe => obtenir la liste des maregraphe  
GET /maregrapheMeta/getMeta/3 => obtenir les métadonnées du marégraphe ayant l'id passé en paramètre  
GET /meta/getMetaId => obtenir les id des métadonnées  
GET /partenaire/getPartenaire => obtenir les partenaire  
POST /maregraphe/addMaregraphe/{id}&{libelle}&{lat}&{long} => ajouter un nouveau marégraphe   
POST /maregrapheMeta/addMeta/{id}&{meta}&{data} => ajouter une/des metadonnées au marégraphe passé en id  
POST /connexion/addUser/{user}&{password}&{fullName}&{mail} => ajouter un nouvel utilisateur  
UPDATE /maregrapheMeta/updateMeta/{id}&{meta} => modifier la metadonnées passée en paramètre du marégraphe passé en id  
UPDATE /meta/updateMeta/{id}&{description}&{ordre} => Modifier les types de métadonnées  
DELETE /maregrapheMeta/deleteAllMeta/{id} => supprimer TOUTE les metadonnées du marégraphe passé en paramètre  
DELETE /maregrapheMeta/deleteMeta/{id}&{meta} => supprimer la metadonnées passée en paramètre du marégraphe passé en id  
DELETE /meta/deleteMeta/{meta} => supprimer le type de métadonnée de la base de données  