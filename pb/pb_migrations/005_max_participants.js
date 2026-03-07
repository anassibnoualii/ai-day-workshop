/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const collection = app.findCollectionByNameOrId("config")

  const existing = collection.fields.find((f) => f.name === "session_id")
  if (!existing) {
    collection.fields.push(new Field({
      name: "session_id",
      type: "text",
      required: false,
    }))
    app.save(collection)
  }

  const records = app.findAllRecords(collection)
  for (const record of records) {
    if (!record.get("session_id")) {
      record.set("session_id", "AG3NT26M")
      app.save(record)
    }
  }
}, (app) => {})
