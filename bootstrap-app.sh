#!/bin/sh

apk add --no-cache --virtual jq

source ./.env

STARTSCRIPT_STR="cross-env DRIFTCHANNEL_ID=$DRIFTCHANNEL_ID ACTIVE_ADMIN_PASSWORD=$ACTIVE_ADMIN_PW TOKEN=$SLACK_TOKEN node dist/app.js"

cp -f package.json package.json.bak
jq --arg startscript_str "$STARTSCRIPT_STR" '.scripts.start=$startscript_str' package.json > package.json.bak
mv package.json.bak package.json

npm run build
