# Variables
DOCKER_IMAGE_NAME="chain-rpc.online"
DOCKERFILE_PATH="Dockerfile"
ARCHIVE_NAME="chain-rpc-release.tar"
REMOTE_USER="piekuser"
REMOTE_HOST="45.10.110.58"
SSH_KEY_PATH="~/.ssh/piek"
LOCAL_PATH="./$ARCHIVE_NAME"
REMOTE_PATH="~/$ARCHIVE_NAME"
LOCAL_PORT="3000"
REMOTE_PORT="3000"
# Flags
BUILD_IMAGE=true # Default to building the image
# exit on error 
set -e 
set -o pipefail

# Parse arguments
while [[ "$#" -gt 0 ]]; do
    case "$1" in
        --no-build)
            BUILD_IMAGE=false
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
    shift
done

# Build Docker image if BUILD_IMAGE is true
if [ "$BUILD_IMAGE" = true ]; then
    echo "Building Docker image..."
    docker buildx build --platform linux/amd64 -t $DOCKER_IMAGE_NAME -f $DOCKERFILE_PATH .
else
    echo "Skipping Docker image build as per --no-build flag."
fi

docker save -o $ARCHIVE_NAME $DOCKER_IMAGE_NAME

# Transfer the tar archive to the remote host using rsync
rsync -avz -e "ssh -i $SSH_KEY_PATH" $LOCAL_PATH $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH
rsync -avz -e "ssh -i $SSH_KEY_PATH" .env.production $REMOTE_USER@$REMOTE_HOST:~/chain-rpc/.env.production

# Connect to the remote server, load the Docker image, and restart the container
ssh -i $SSH_KEY_PATH $REMOTE_USER@$REMOTE_HOST "
    docker rm -f $DOCKER_IMAGE_NAME &&
    docker image prune -f &&
    docker load -i $REMOTE_PATH &&
    rm $REMOTE_PATH &&
    docker run -d \
        -p $REMOTE_PORT:$LOCAL_PORT \
        --name $DOCKER_IMAGE_NAME \
        --env-file ~/chain-rpc/.env.production \
        --restart always \
        --network infra \
        $DOCKER_IMAGE_NAME
"

# Clean up by removing the local tar archive
rm $ARCHIVE_NAME