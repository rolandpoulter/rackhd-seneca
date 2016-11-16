#!/bin/bash

## enable to see script debug output
# set -x

SCRIPT_DIR=$(cd $(dirname $0) && pwd)
echo "Starting microservices example"

REPOS="api lookups"
for repo in ${REPOS}; do
  cd "${SCRIPT_DIR}/../${repo}"
  npm install
  npm start &
  sleep 5s
done

exit
