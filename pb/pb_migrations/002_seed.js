/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const seeds = {
    event_state: [
      {
        session_name: "Salle Principale — Journee complete",
        active_workshop_id: "",
        timer_duration_seconds: 2700,
        timer_running: false,
      },
    ],
    workshops: [
      { title_fr: "Icebreaker & Intro",                title_en: "Icebreaker & Intro",                status: "pending", duration: 1800, order: 1 },
      { title_fr: "Atelier 1 — Agent Declaratif",      title_en: "Workshop 1 — Declarative Agent",    status: "pending", duration: 2700, order: 2 },
      { title_fr: "Pause",                             title_en: "Break",                              status: "pending", duration: 900,  order: 3 },
      { title_fr: "Atelier 2 — Agent Conversationnel", title_en: "Workshop 2 — Conversational Agent", status: "pending", duration: 2700, order: 4 },
      { title_fr: "Discours / Keynote",                title_en: "Keynote",                            status: "pending", duration: 3600, order: 5 },
      { title_fr: "Dejeuner",                          title_en: "Lunch",                              status: "pending", duration: 3600, order: 6 },
      { title_fr: "Atelier 3 — Agent Autonome",        title_en: "Workshop 3 — Autonomous Agent",     status: "pending", duration: 4500, order: 7 },
      { title_fr: "Awards & Feedback",                 title_en: "Awards & Feedback",                  status: "pending", duration: 1800, order: 8 },
    ],
    config: [
      {
        feedback_url: "",
        feedback_enabled: false,
        global_docs: [],
      },
    ],
  }

  for (const [collectionName, records] of Object.entries(seeds)) {
    const collection = app.findCollectionByNameOrId(collectionName)
    const existing = app.findAllRecords(collection)

    if (existing.length > 0) {
      continue
    }

    for (const data of records) {
      const record = new Record(collection)
      for (const [key, value] of Object.entries(data)) {
        record.set(key, value)
      }
      app.save(record)
    }
  }
}, (app) => {
  const collections = ["config", "workshops", "event_state"]
  for (const name of collections) {
    try {
      const col = app.findCollectionByNameOrId(name)
      const records = app.findAllRecords(col)
      for (const record of records) {
        app.delete(record)
      }
    } catch (e) {}
  }
})
