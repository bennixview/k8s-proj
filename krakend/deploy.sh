#!/bin/bash

set -e

APP_NAME="krakend"
IMAGE_TAG="latest"
APP_PATH="$(cd "$(dirname "$0")" && pwd)"  # resolves to ./krakend
CHART_PATH="$APP_PATH"

echo "🚧 Building Docker image from $APP_PATH..."
docker build --no-cache -t ${APP_NAME}:${IMAGE_TAG} "$APP_PATH"

echo "🐳 Loading image into kind cluster..."
kind load docker-image ${APP_NAME}:${IMAGE_TAG}

echo "📦 Deploying via Helm..."
helm upgrade --install ${APP_NAME} ${CHART_PATH} \
  --set image.repository=${APP_NAME} \
  --set image.tag=${IMAGE_TAG}

echo "🔄 Restarting deployment to ensure latest image is used..."
kubectl rollout restart deployment ${APP_NAME}

echo "✅ Done. Checking resources:"
kubectl get pods
kubectl get svc