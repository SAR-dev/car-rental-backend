/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1602236899")

  // add field
  collection.fields.addAt(10, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_4287529994",
    "hidden": false,
    "id": "relation110690774",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "featuresIncluded",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(11, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_4287529994",
    "hidden": false,
    "id": "relation1429781869",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "featuresExcluded",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1602236899")

  // remove field
  collection.fields.removeById("relation110690774")

  // remove field
  collection.fields.removeById("relation1429781869")

  return app.save(collection)
})
