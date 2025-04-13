/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_911061254")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_fy2LbbVCxm` ON `kilometerPackages` (`title`)"
    ],
    "name": "kilometerPackages"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_911061254")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_fy2LbbVCxm` ON `kilometerPackage` (`title`)"
    ],
    "name": "kilometerPackage"
  }, collection)

  return app.save(collection)
})
