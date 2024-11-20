GET /maregraphe => obtenir la liste des maregraphe
GET /maregrapheMeta/{id} => obtenir les métadonnées du marégraphe ayant l'id passé en paramètre
GET /getMeta/ => obtenir les id des métadonnées
POST /addMaregrapheMeta/{id}&{meta}&{data} => ajouter une/des metadonnées au marégraphe passé en id
UPDATE /updateMaregrapheMeta/{id}&{meta} => modifier la metadonnées passée en paramètre du marégraphe passé en id
DELETE /deleteMaregrapheMeta/{id}&{meta} => supprimer la metadonnées passée en paramètre du marégraphe passé en id
