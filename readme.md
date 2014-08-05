
* CTRL+C - Verifies exit. If confirmed, will exit to host, stopping container from Docker's perspecive.
* CTRL+Q - Leaves container to host, container continues running.
* CTRL+Z - Sends SIGTSTP. We leave DR and container is stopped by Docker.



### Usage


    # Using Docker Readline:

    docker run -itd \
      --name=wp \
      --expose=80 \
      --hostname=www.usabilitydynamics.com \
      --volume=/root/.ssh:/root/.ssh \
      --volume=/usr/local/lib/node_modules/docker-readline:/usr/local/lib/node_modules/docker-readline \
      --entrypoint=/usr/local/lib/node_modules/docker-readline/bin/docker-readline.js \
      andypotanin/hhvm
    )

    docker attach wp


