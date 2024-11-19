GET /maregraphe => obtenir la liste des maregraphe
GET /metadonnee?{id} => obtenir les métadonnées du marégraphe ayant l'id passé en paramètre
POST /addMeta?{id} => ajouter une/des metadonnées au marégraphe passé en id
UPDATE /updateMeta?{id}&{meta} => modifier la metadonnées passée en paramètre du marégraphe passé en id
DELETE /deleteMeta?{id}&{meta} => supprimer la metadonnées passée en paramètre du marégraphe passé en id
