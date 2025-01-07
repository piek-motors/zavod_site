# Envs
PORT=13337
VERBOSE=true
# Variables
DOCKER_IMAGE_NAME="proxy"
DOCKERFILE_PATH="Dockerfile"
ARCHIVE_NAME="api.chain-rpc.online.release.tar"
REMOTE_USER="piekuser"
REMOTE_HOST="45.10.110.58"
SSH_KEY_PATH="~/.ssh/piek"
LOCAL_PATH="./$ARCHIVE_NAME"
REMOTE_PATH="~/$ARCHIVE_NAME"
LOCAL_PORT="13337"
REMOTE_PORT="13337"

# exit on error 
set -e 
set -o pipefail

# Build Docker image for specified platform and save as tar archive
docker buildx build --platform linux/amd64 -t $DOCKER_IMAGE_NAME -f $DOCKERFILE_PATH .
docker save -o $ARCHIVE_NAME $DOCKER_IMAGE_NAME

# Transfer the tar archive to the remote host using rsync
rsync -avz -e "ssh -i $SSH_KEY_PATH" $LOCAL_PATH $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH
rsync -avz -e "ssh -i $SSH_KEY_PATH" .env.production $REMOTE_USER@$REMOTE_HOST:~/chain-rpc/.env.production.proxy

# Connect to the remote server, load the Docker image, and restart the container
ssh -i $SSH_KEY_PATH $REMOTE_USER@$REMOTE_HOST "
    docker rm -f $DOCKER_IMAGE_NAME &&
    docker image prune -f &&
    docker load -i $REMOTE_PATH &&
    rm $REMOTE_PATH &&
    docker run -d \
        --env-file ~/chain-rpc/.env.production.proxy \
        -p $REMOTE_PORT:$LOCAL_PORT \
        --name $DOCKER_IMAGE_NAME \
        --restart always \
        --network infra \
        $DOCKER_IMAGE_NAME
"

# Clean up by removing the local tar archive
rm $ARCHIVE_NAME