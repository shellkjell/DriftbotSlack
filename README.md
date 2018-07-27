# Driftbot

### Prerequisites
* Linux distro using apt for package management
* Officially supported `docker.io`
* `moreutils build-essential make git`

## Quickstart on Ubuntu/Debian
* `git clone https://github.com/techbuddyab/slackdriftbot && cd slackdriftbot && make build`
* Create a .env file (look at .env.example). 
* After that file is correctly set up you can run `make start`. In case of failure, check logs of the container with `sudo docker container logs driftbot`
* Stopping the container: `make stop`
* Removing the container: `make remove`

## Problems?
`make stop remove && git pull && make build`
