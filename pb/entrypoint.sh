#!/bin/sh
set -e

DIR=/pb/pb_data

if [ -n "$PB_ADMIN_EMAIL" ] && [ -n "$PB_ADMIN_PASSWORD" ]; then
  echo "Creating/updating superuser..."
  /pb/pocketbase superuser upsert "$PB_ADMIN_EMAIL" "$PB_ADMIN_PASSWORD" --dir=$DIR 2>/dev/null \
    || /pb/pocketbase superuser create "$PB_ADMIN_EMAIL" "$PB_ADMIN_PASSWORD" --dir=$DIR 2>/dev/null \
    || echo "(superuser may already exist)"
fi

echo "Starting PocketBase with automigrate..."
/pb/pocketbase serve --http=0.0.0.0:${PORT} --dir=$DIR --automigrate &
PB_PID=$!

echo "Waiting for PocketBase to be ready..."
for i in $(seq 1 30); do
  if wget -q --spider "http://127.0.0.1:${PORT}/api/health" 2>/dev/null; then
    break
  fi
  sleep 1
done

if [ -n "$PB_ADMIN_EMAIL" ] && [ -n "$PB_ADMIN_PASSWORD" ]; then
  echo "Uploading guide files..."

  TOKEN=$(curl -s -X POST "http://127.0.0.1:${PORT}/api/admins/auth-with-password" \
    -H "Content-Type: application/json" \
    -d "{\"identity\":\"${PB_ADMIN_EMAIL}\",\"password\":\"${PB_ADMIN_PASSWORD}\"}" \
    | sed 's/.*"token":"\([^"]*\)".*/\1/')

  if [ -n "$TOKEN" ] && [ "$TOKEN" != "" ]; then
    WORKSHOPS=$(curl -s "http://127.0.0.1:${PORT}/api/collections/workshops/records?sort=order" \
      -H "Authorization: Bearer $TOKEN")

    upload_guides() {
      ORDER=$1
      FR_FILE=$2
      EN_FILE=$3

      ID=$(echo "$WORKSHOPS" | sed 's/},/}\n/g' | grep "\"order\":${ORDER}" | sed 's/.*"id":"\([^"]*\)".*/\1/')

      if [ -z "$ID" ]; then
        echo "  Workshop order=${ORDER} not found, skipping"
        return
      fi

      HAS_GUIDE=$(echo "$WORKSHOPS" | sed 's/},/}\n/g' | grep "\"order\":${ORDER}" | grep -o '"guide_fr":"[^"]*"' | sed 's/"guide_fr":"\(.*\)"/\1/')

      if [ -n "$HAS_GUIDE" ] && [ "$HAS_GUIDE" != "" ]; then
        echo "  Workshop order=${ORDER} already has guides, skipping"
        return
      fi

      echo "  Uploading guides for workshop order=${ORDER} (id=${ID})"
      curl -s -X PATCH "http://127.0.0.1:${PORT}/api/collections/workshops/records/${ID}" \
        -H "Authorization: Bearer $TOKEN" \
        -F "guide_fr=@${FR_FILE}" \
        -F "guide_en=@${EN_FILE}" > /dev/null
    }

    upload_guides 2 "/pb/guides/fr/atelier-1-agent-declaratif.md" "/pb/guides/en/workshop-1-declarative-agent.md"
    upload_guides 4 "/pb/guides/fr/atelier-2-agent-conversationnel.md" "/pb/guides/en/workshop-2-conversational-agent.md"
    upload_guides 7 "/pb/guides/fr/atelier-3-agent-autonome.md" "/pb/guides/en/workshop-3-autonomous-agent.md"

    echo "Guide upload complete."
  else
    echo "Warning: Could not authenticate as admin, skipping guide upload"
  fi
fi

wait $PB_PID
