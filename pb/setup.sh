#!/bin/bash
set -e

PB_URL="${1:-http://127.0.0.1:8090}"
ADMIN_EMAIL="${2:-admin@agentday.com}"
ADMIN_PASSWORD="${3:-adminadmin123}"
CONTAINER="${4:-pb-agentday}"

echo "PocketBase setup: $PB_URL"
echo "Admin: $ADMIN_EMAIL"
echo ""

echo "Step 1: Creating superuser..."
docker exec "$CONTAINER" /pb/pocketbase superuser upsert "$ADMIN_EMAIL" "$ADMIN_PASSWORD" --dir=/pb/pb_data 2>/dev/null \
  || docker exec "$CONTAINER" /pb/pocketbase superuser create "$ADMIN_EMAIL" "$ADMIN_PASSWORD" --dir=/pb/pb_data 2>/dev/null \
  || echo "(superuser may already exist)"

echo "Step 2: Authenticating..."
AUTH=$(curl -s -X POST "$PB_URL/api/collections/_superusers/auth-with-password" \
  -H "Content-Type: application/json" \
  -d "{\"identity\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}")
TOKEN=$(echo "$AUTH" | grep -o '"token":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "ERROR: Could not authenticate."
  exit 1
fi

echo "Authenticated."
H="Authorization: Bearer $TOKEN"
C="Content-Type: application/json"

ID_FIELD='{"name":"id","type":"text","system":true,"required":true,"primaryKey":true,"autogeneratePattern":"[a-z0-9]{15}","min":15,"max":15,"pattern":"^[a-z0-9]+$","hidden":false}'

echo ""
echo "Step 3: Creating collections..."
for name in event_state workshops teams challenge_cards config score_history; do
  echo "  $name"
  curl -s -X POST "$PB_URL/api/collections" -H "$H" -H "$C" \
    -d "{\"name\":\"$name\",\"type\":\"base\",\"listRule\":\"\",\"viewRule\":\"\",\"createRule\":\"\",\"updateRule\":\"\",\"deleteRule\":\"\"}" > /dev/null 2>&1 || true
done

echo ""
echo "Step 4: Adding fields to collections..."

echo "  event_state"
curl -s -X PATCH "$PB_URL/api/collections/event_state" -H "$H" -H "$C" -d "{\"fields\":[$ID_FIELD,
  {\"name\":\"session_name\",\"type\":\"text\",\"required\":true},
  {\"name\":\"active_workshop_id\",\"type\":\"text\"},
  {\"name\":\"timer_duration_seconds\",\"type\":\"number\",\"required\":true},
  {\"name\":\"timer_started_at\",\"type\":\"number\"},
  {\"name\":\"timer_running\",\"type\":\"bool\"},
  {\"name\":\"timer_paused_remaining\",\"type\":\"number\"}
],\"listRule\":\"\",\"viewRule\":\"\",\"createRule\":\"\",\"updateRule\":\"\",\"deleteRule\":\"\"}" > /dev/null

echo "  workshops"
curl -s -X PATCH "$PB_URL/api/collections/workshops" -H "$H" -H "$C" -d "{\"fields\":[$ID_FIELD,
  {\"name\":\"title_fr\",\"type\":\"text\",\"required\":true},
  {\"name\":\"title_en\",\"type\":\"text\",\"required\":true},
  {\"name\":\"status\",\"type\":\"text\",\"required\":true},
  {\"name\":\"duration\",\"type\":\"number\",\"required\":true},
  {\"name\":\"doc_url\",\"type\":\"url\"},
  {\"name\":\"order\",\"type\":\"number\",\"required\":true}
],\"listRule\":\"\",\"viewRule\":\"\",\"createRule\":\"\",\"updateRule\":\"\",\"deleteRule\":\"\"}" > /dev/null

echo "  teams"
curl -s -X PATCH "$PB_URL/api/collections/teams" -H "$H" -H "$C" -d "{\"fields\":[$ID_FIELD,
  {\"name\":\"name\",\"type\":\"text\",\"required\":true},
  {\"name\":\"emoji\",\"type\":\"text\"},
  {\"name\":\"slogan\",\"type\":\"text\"},
  {\"name\":\"score\",\"type\":\"number\"},
  {\"name\":\"members\",\"type\":\"json\"}
],\"listRule\":\"\",\"viewRule\":\"\",\"createRule\":\"\",\"updateRule\":\"\",\"deleteRule\":\"\"}" > /dev/null

echo "  challenge_cards"
curl -s -X PATCH "$PB_URL/api/collections/challenge_cards" -H "$H" -H "$C" -d "{\"fields\":[$ID_FIELD,
  {\"name\":\"team_id\",\"type\":\"text\"},
  {\"name\":\"card_id\",\"type\":\"text\",\"required\":true},
  {\"name\":\"color\",\"type\":\"text\",\"required\":true},
  {\"name\":\"points\",\"type\":\"number\",\"required\":true},
  {\"name\":\"title_fr\",\"type\":\"text\"},
  {\"name\":\"title_en\",\"type\":\"text\"},
  {\"name\":\"mission_fr\",\"type\":\"text\"},
  {\"name\":\"mission_en\",\"type\":\"text\"},
  {\"name\":\"status\",\"type\":\"text\"},
  {\"name\":\"revealed_at\",\"type\":\"date\"}
],\"listRule\":\"\",\"viewRule\":\"\",\"createRule\":\"\",\"updateRule\":\"\",\"deleteRule\":\"\"}" > /dev/null

echo "  score_history"
curl -s -X PATCH "$PB_URL/api/collections/score_history" -H "$H" -H "$C" -d "{\"fields\":[$ID_FIELD,
  {\"name\":\"team_id\",\"type\":\"text\",\"required\":true},
  {\"name\":\"delta\",\"type\":\"number\",\"required\":true},
  {\"name\":\"label\",\"type\":\"text\"}
],\"listRule\":\"\",\"viewRule\":\"\",\"createRule\":\"\",\"updateRule\":\"\",\"deleteRule\":\"\"}" > /dev/null

echo "  config"
curl -s -X PATCH "$PB_URL/api/collections/config" -H "$H" -H "$C" -d "{\"fields\":[$ID_FIELD,
  {\"name\":\"feedback_url\",\"type\":\"url\"},
  {\"name\":\"feedback_enabled\",\"type\":\"bool\"},
  {\"name\":\"global_docs\",\"type\":\"json\"}
],\"listRule\":\"\",\"viewRule\":\"\",\"createRule\":\"\",\"updateRule\":\"\",\"deleteRule\":\"\"}" > /dev/null

echo ""
echo "Step 5: Seeding data..."

collection_count() {
  curl -s "$PB_URL/api/collections/$1/records?perPage=1" 2>/dev/null | grep -o '"totalItems":[0-9]*' | cut -d: -f2
}

rec() {
  curl -s -X POST "$PB_URL/api/collections/$1/records" -H "$H" -H "$C" -d "$2" > /dev/null 2>&1
}

COUNT=$(collection_count "event_state")
if [ "${COUNT:-0}" = "0" ]; then
  rec "event_state" '{"session_name":"Salle Principale — Journee complete","active_workshop_id":"","timer_duration_seconds":2700,"timer_running":false}'
  echo "  event_state: seeded"
else
  echo "  event_state: exists ($COUNT)"
fi

COUNT=$(collection_count "workshops")
if [ "${COUNT:-0}" = "0" ]; then
  rec "workshops" '{"title_fr":"Icebreaker & Intro","title_en":"Icebreaker & Intro","status":"pending","duration":1800,"order":1}'
  rec "workshops" '{"title_fr":"Atelier 1 — Agent Declaratif","title_en":"Workshop 1 — Declarative Agent","status":"pending","duration":2700,"order":2}'
  rec "workshops" '{"title_fr":"Pause","title_en":"Break","status":"pending","duration":900,"order":3}'
  rec "workshops" '{"title_fr":"Atelier 2 — Agent Conversationnel","title_en":"Workshop 2 — Conversational Agent","status":"pending","duration":2700,"order":4}'
  rec "workshops" '{"title_fr":"Discours / Keynote","title_en":"Keynote","status":"pending","duration":3600,"order":5}'
  rec "workshops" '{"title_fr":"Dejeuner","title_en":"Lunch","status":"pending","duration":3600,"order":6}'
  rec "workshops" '{"title_fr":"Atelier 3 — Agent Autonome","title_en":"Workshop 3 — Autonomous Agent","status":"pending","duration":4500,"order":7}'
  rec "workshops" '{"title_fr":"Awards & Feedback","title_en":"Awards & Feedback","status":"pending","duration":1800,"order":8}'
  echo "  workshops: 8 seeded"
else
  echo "  workshops: exists ($COUNT)"
fi

COUNT=$(collection_count "teams")
if [ "${COUNT:-0}" = "0" ]; then
  rec "teams" '{"name":"Les Cyborgs","emoji":"🤖","slogan":"Humain + IA = Invincible","score":14}'
  rec "teams" '{"name":"Agent Force","emoji":"🦾","slogan":"On automatise tout, maintenant","score":11}'
  rec "teams" '{"name":"Neural Squad","emoji":"🧠","slogan":"On pense, donc on orchestre","score":9}'
  rec "teams" '{"name":"Byte Busters","emoji":"💥","slogan":"Debug first, ship second","score":7}'
  rec "teams" '{"name":"Prompt Rangers","emoji":"🎯","slogan":"Le bon prompt au bon moment","score":5}'
  echo "  teams: 5 seeded"
else
  echo "  teams: exists ($COUNT)"
fi

COUNT=$(collection_count "config")
if [ "${COUNT:-0}" = "0" ]; then
  rec "config" '{"feedback_url":"https://forms.office.com/example","feedback_enabled":false,"global_docs":[{"label":"Slides de la journee","url":"https://example.sharepoint.com/slides"},{"label":"Guide Copilot Studio","url":"https://example.sharepoint.com/guides"},{"label":"Lab GitHub Repository","url":"https://github.com/alithya/agentday"},{"label":"Refund Policy","url":"https://example.sharepoint.com/policy"},{"label":"Product Catalog","url":"https://example.sharepoint.com/catalog"}]}'
  echo "  config: seeded"
else
  echo "  config: exists ($COUNT)"
fi

echo ""
echo "Done! PocketBase admin: $PB_URL/_/"
echo "Login: $ADMIN_EMAIL / $ADMIN_PASSWORD"
