DOCKER_IMAGE_TAG=slackdriftbot
DOCKER_CONTAINER_NAME=driftbot
UNAME=$(shell uname)

DOCKER=docker
DOCKER_COMPOSE=docker-compose
DOCKER_EXEC=$(DOCKER) exec -it $(DOCKER_IMAGE_TAG)

ifeq ($(UNAME), Linux)
	DOCKER=sudo docker
	DOCKER_COMPOSE=sudo -E docker-compose
	DOCKER_EXEC=$(DOCKER) exec -it $(DOCKER_CONTAINER_NAME)
endif

#
## BUILD
#
build:
	make build-$(UNAME)

build-Linux:
	$(DOCKER) build --no-cache -t $(DOCKER_IMAGE_TAG) -f Dockerfile .

#
## START
#
start:
	@if [ $(shell $(DOCKER) ps --filter name=^/$(DOCKER_CONTAINER_NAME)$$ | grep -w $(DOCKER_CONTAINER_NAME) > /dev/null ; echo $$?) -eq 0 ]; then \
		echo "Already started."; \
	else \
		make start-$(UNAME); \
	fi
	

start-Linux:
	@if [ ! -f .env ]; then \
		echo "Can't start app without a .env file, check .env.example"; \
	else \
		$(DOCKER) run -d --name $(DOCKER_CONTAINER_NAME) $(DOCKER_IMAGE_TAG); \
	fi
	

#
## STOP
#
stop:
	$(DOCKER) ps -a --filter "name=$(DOCKER_CONTAINER_NAME)" | grep $(DOCKER_CONTAINER_NAME) | cut -d ' ' -f 1 | xargs $(DOCKER) stop

#
## REMOVE
#
remove:
	$(DOCKER) ps -a --filter "name=$(DOCKER_CONTAINER_NAME)" | grep $(DOCKER_CONTAINER_NAME) | cut -d ' ' -f 1 | xargs $(DOCKER) rm 

#
## BASH
#
bash:
	$(DOCKER_EXEC) /bin/bash
