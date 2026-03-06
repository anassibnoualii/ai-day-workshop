/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const collection = app.findCollectionByNameOrId("workshops")

  const guideMap = [
    { order: 2, fr: "/pb/guides/fr/atelier-1-agent-declaratif.md",     en: "/pb/guides/en/workshop-1-declarative-agent.md" },
    { order: 4, fr: "/pb/guides/fr/atelier-2-agent-conversationnel.md", en: "/pb/guides/en/workshop-2-conversational-agent.md" },
    { order: 7, fr: "/pb/guides/fr/atelier-3-agent-autonome.md",        en: "/pb/guides/en/workshop-3-autonomous-agent.md" },
  ]

  for (const entry of guideMap) {
    const records = app.findRecordsByFilter(collection, `order = ${entry.order}`, "", 1, 0)
    if (records.length === 0) continue

    const record = records[0]
    if (record.getString("guide_fr")) continue

    record.set("guide_fr", $filesystem.fileFromPath(entry.fr))
    record.set("guide_en", $filesystem.fileFromPath(entry.en))
    app.save(record)
  }
}, (app) => {
  const collection = app.findCollectionByNameOrId("workshops")
  const records = app.findAllRecords(collection)
  for (const record of records) {
    if (record.getString("guide_fr") || record.getString("guide_en")) {
      record.set("guide_fr", null)
      record.set("guide_en", null)
      app.save(record)
    }
  }
})
