#!/usr/bin/env bash

docker build --no-cache -t nodestone .
docker container stop Nodestone 2>/dev/null
docker container rm Nodestone 2>/dev/null
docker run --restart unless-stopped -d -it --name=Nodestone -p:8465:8080 nodestone
