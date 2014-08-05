#!/bin/sh

# Using Docker Readline:

docker rm -f ${TEST_CONTAINER_ID} 2> /dev/null

export TEST_CONTAINER_ID=$(docker run -itd \
  --name=wp \
  --expose=80 \
  --hostname=www.usabilitydynamics.com \
  --volume=/root/.ssh:/root/.ssh \
  --volume=/var/apps/www.usabilitydynamics.com:/var/www \
  --volume=/usr/local/lib/node_modules/docker-readline:/usr/local/lib/node_modules/docker-readline \
  --entrypoint=/usr/local/lib/node_modules/docker-readline/bin/docker-readline.js \
  --env=WP_HOME=http://www.usabilitydynamics.com \
  --env=WP_SITEURL=http://www.usabilitydynamics.com \
  --env=DB_NAME=ud_wp \
  --env=DB_USER=ud \
  --env=DB_HOST=10.88.135.7 \
  --env=DB_PASSWORD=DHsYZeJWgZBT \
  andypotanin/hhvm
)

docker logs ${TEST_CONTAINER_ID}

docker attach wp


