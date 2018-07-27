#!/bin/bash

apt update
apt install -y moreutils jq

source ./.env

STARTSCRIPT_STR="cross-env DRIFTCHANNEL_ID=$DRIFTCHANNEL_ID ACTIVE_ADMIN_PASSWORD=$ACTIVE_ADMIN_PW TOKEN=$SLACK_TOKEN node ./app.js"

cp -f package.json package.json.bak
jq --arg startscript_str "$STARTSCRIPT_STR" '.scripts.start=$startscript_str' package.json | sponge package.json 

