/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1602236899")

  // add field
  collection.fields.addAt(13, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1754157276",
    "hidden": false,
    "id": "relation1332028747",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "vehicleOptions",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1602236899")

  // remove field
  collection.fields.removeById("relation1332028747")

  return app.save(collection)
})
