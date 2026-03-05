#!/bin/bash
echo "Stopping PocketBase..."
docker stop pb-agentday 2>/dev/null && docker rm pb-agentday 2>/dev/null
echo "Done."
