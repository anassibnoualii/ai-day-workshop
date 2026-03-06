/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const collections = [
    {
      name: "event_state",
      fields: [
        { name: "session_name",           type: "text",   required: true },
        { name: "active_workshop_id",     type: "text",   required: false },
        { name: "timer_duration_seconds", type: "number", required: true },
        { name: "timer_started_at",       type: "number", required: false },
        { name: "timer_running",          type: "bool",   required: false },
        { name: "timer_paused_remaining", type: "number", required: false },
      ],
    },
    {
      name: "workshops",
      fields: [
        { name: "title_fr", type: "text",   required: true },
        { name: "title_en", type: "text",   required: true },
        { name: "status",   type: "text",   required: true },
        { name: "duration", type: "number", required: true },
        { name: "doc_url", type: "url",  required: false },
        { name: "guides", type: "json", required: false },
        { name: "order",  type: "number", required: true },
      ],
    },
    {
      name: "teams",
      fields: [
        { name: "name",    type: "text",   required: true },
        { name: "emoji",   type: "text",   required: false },
        { name: "slogan",  type: "text",   required: false },
        { name: "score",   type: "number", required: false },
        { name: "members", type: "json",   required: false },
      ],
    },
    {
      name: "challenge_cards",
      fields: [
        { name: "team_id",    type: "text",   required: false },
        { name: "card_id",    type: "text",   required: true },
        { name: "color",      type: "text",   required: true },
        { name: "points",     type: "number", required: true },
        { name: "title_fr",   type: "text",   required: false },
        { name: "title_en",   type: "text",   required: false },
        { name: "mission_fr", type: "text",   required: false },
        { name: "mission_en", type: "text",   required: false },
        { name: "status",     type: "text",   required: false },
        { name: "revealed_at",type: "date",   required: false },
      ],
    },
    {
      name: "score_history",
      fields: [
        { name: "team_id", type: "text",   required: true },
        { name: "delta",   type: "number", required: true },
        { name: "label",   type: "text",   required: false },
      ],
    },
    {
      name: "config",
      fields: [
        { name: "feedback_url",     type: "url",  required: false },
        { name: "feedback_enabled", type: "bool", required: false },
        { name: "global_docs",      type: "json", required: false },
      ],
    },
  ]

  for (const def of collections) {
    let collection = null
    try {
      collection = app.findCollectionByNameOrId(def.name)
    } catch (e) {
      // does not exist
    }

    if (!collection) {
      collection = new Collection({
        name: def.name,
        type: "base",
        listRule: "",
        viewRule: "",
        createRule: "",
        updateRule: "",
        deleteRule: "",
      })
    } else {
      collection.listRule = ""
      collection.viewRule = ""
      collection.createRule = ""
      collection.updateRule = ""
      collection.deleteRule = ""
    }

    for (const field of def.fields) {
      const existing = collection.fields.find((f) => f.name === field.name)
      if (!existing) {
        collection.fields.push(new Field({
          name: field.name,
          type: field.type,
          required: field.required || false,
        }))
      }
    }

    app.save(collection)
  }
}, (app) => {
  const names = ["config", "score_history", "challenge_cards", "teams", "workshops", "event_state"]
  for (const name of names) {
    try {
      const col = app.findCollectionByNameOrId(name)
      app.delete(col)
    } catch (e) {}
  }
})
