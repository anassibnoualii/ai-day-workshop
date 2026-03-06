/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  let collection = null
  try {
    collection = app.findCollectionByNameOrId("participants")
  } catch (e) {}

  if (!collection) {
    collection = new Collection({
      name: "participants",
      type: "base",
      listRule: "",
      viewRule: "",
      createRule: "",
      updateRule: "",
      deleteRule: "",
    })
  }

  const fields = [
    { name: "username", type: "text", required: true },
    { name: "validated", type: "bool", required: false },
  ]

  for (const field of fields) {
    const existing = collection.fields.find((f) => f.name === field.name)
    if (!existing) {
      collection.fields.push(new Field(field))
    }
  }

  app.save(collection)
}, (app) => {
  try {
    const col = app.findCollectionByNameOrId("participants")
    app.delete(col)
  } catch (e) {}
})
