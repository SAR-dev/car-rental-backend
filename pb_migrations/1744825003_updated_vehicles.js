/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1602236899")

  // remove field
  collection.fields.removeById("text834498537")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "select3299191415",
    "maxSelect": 1,
    "name": "fuelType",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "PETROL",
      "DIESEL",
      "ELECTRIC",
      "HYBRID",
      "CNG",
      "LPG",
      "HYDROGEN",
      "ETHANOL",
      "BIODIESEL",
      "METHANOL",
      "PROPANE"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1602236899")

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text834498537",
    "max": 0,
    "min": 0,
    "name": "fuel",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("select3299191415")

  return app.save(collection)
})
