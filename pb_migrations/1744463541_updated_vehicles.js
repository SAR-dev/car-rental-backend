/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1602236899")

  // add field
  collection.fields.addAt(14, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3771834741",
    "hidden": false,
    "id": "relation3075073395",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "vehicleTypes",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1602236899")

  // remove field
  collection.fields.removeById("relation3075073395")

  return app.save(collection)
})
