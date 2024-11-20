GET /maregraphe/getMaregraphe => obtenir la liste des maregraphe
GET /maregrapheMeta/getMeta/3 => obtenir les métadonnées du marégraphe ayant l'id passé en paramètre
GET /meta/getMetaId => obtenir les id des métadonnées
POST /maregrapheMeta/addMeta/{id}&{meta}&{data} => ajouter une/des metadonnées au marégraphe passé en id
UPDATE /maregrapheMeta/updateMeta/{id}&{meta} => modifier la metadonnées passée en paramètre du marégraphe passé en id
DELETE /maregrapheMeta/deleteMeta/{id}&{meta} => supprimer la metadonnées passée en paramètre du marégraphe passé en id
