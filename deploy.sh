# Variables
DOCKER_IMAGE_NAME="zavod.piek.ru"
DOCKERFILE_PATH="Dockerfile"
ARCHIVE_NAME="zavod.piek.ru.tar.gz"
REMOTE_USER="fin"
REMOTE_HOST="piek-office"
SSH_KEY_PATH="~/.ssh/id_ed25519"
LOCAL_PATH="./$ARCHIVE_NAME"
REMOTE_PATH="~/apps/zavod-site/$ARCHIVE_NAME"
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

SSH_OPTS="-i $SSH_KEY_PATH -o ServerAliveInterval=30 -o ServerAliveCountMax=5"

# Build Docker image if BUILD_IMAGE is true
if [ "$BUILD_IMAGE" = true ]; then
    echo "🔨 Building Docker image..."
    docker buildx build --platform linux/amd64 -t $DOCKER_IMAGE_NAME -f $DOCKERFILE_PATH .
else
    echo "Skipping Docker image build as per --no-build flag."
fi

echo "📦 Saving Docker image to compressed archive..."
docker save $DOCKER_IMAGE_NAME | gzip > $ARCHIVE_NAME

# Ensure remote directory exists
ssh $SSH_OPTS $REMOTE_USER@$REMOTE_HOST "mkdir -p ~/apps/zavod-site"

# Transfer the tar archive to the remote host using rsync with SSH keepalive
echo "📤 Uploading to server..."
rsync -avz --progress -e "ssh $SSH_OPTS" $LOCAL_PATH $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH

# Connect to the remote server, load the Docker image, and restart the container
echo "🚀 Deploying..."
ssh $SSH_OPTS $REMOTE_USER@$REMOTE_HOST "
    docker rm -f $DOCKER_IMAGE_NAME || true &&
    docker image prune -f &&
    docker load -i $REMOTE_PATH &&
    rm $REMOTE_PATH &&
    docker run -d \
        -p $REMOTE_PORT:$LOCAL_PORT \
        --name $DOCKER_IMAGE_NAME \
        --restart always \
        $DOCKER_IMAGE_NAME
"

# Clean up by removing the local tar archive
rm $ARCHIVE_NAME

echo "✅ Deployment complete!"