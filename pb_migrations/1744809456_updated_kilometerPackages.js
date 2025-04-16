/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_911061254")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_LR9HZZ2ZjY` ON `vehiclePackages` (\n  `vehicle`,\n  `title`\n)"
    ],
    "name": "vehiclePackages"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1602236899",
    "hidden": false,
    "id": "relation461431942",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "vehicle",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_911061254")

  // update collection data
  unmarshal({
    "indexes": [],
    "name": "kilometerPackages"
  }, collection)

  // remove field
  collection.fields.removeById("relation461431942")

  return app.save(collection)
})
