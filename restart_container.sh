#!/bin/bash

# Define the container name and image
CONTAINER_NAME=dev_is_api_container
IMAGE_NAME=dev_is_api

#Create new docker image
docker build --network=host -t $IMAGE_NAME --no-cache .

# Stop and remove any existing container with the same name
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "Stopping existing container..."
    docker stop $CONTAINER_NAME
fi

if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo "Removing existing container..."
    docker rm $CONTAINER_NAME
fi

# Run the new container
echo "Running new container..."
docker run -d --name $CONTAINER_NAME -p 3000:3000 $IMAGE_NAME