#!/bin/sh

#echo "Entrypoint!"

_ARGS="$@"
_ACTION="$1"
_OPTION="$2"
_SETTING="$3"

[ -d /var/log/docker-readline ]  || sudo mkdir /var/log/docker-readline   2> /dev/null

## Execute SHELL SHIM from a URL.
#if [ "$DOCKER_READLINE_SHIM_URL" ]; then
#  echo "- Docker Readline shim URL exists."
#fi

#if [ -f "/usr/bin/supervisord" ]; then
#  echo "- Supervisor exists."
#fi

## Follow-through into Node.js or native shell.
if [ -f "/usr/local/bin/node" ]; then
  #nohup /usr/local/bin/node $(dirname $0)/docker-readline.js ${_ARGS} > /dev/null 2>&1 &
  /usr/local/bin/node $(dirname $0)/docker-readline.js ${_ARGS}
fi

exec "$@"

