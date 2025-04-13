#!/bin/bash

set -e

APP_NAME="nodejs-app"
IMAGE_TAG="latest"
APP_PATH="$(cd "$(dirname "$0")" && pwd)"  # resolves to ./nodejs-app
CHART_PATH="$APP_PATH"

echo "🚧 Building Docker image from $APP_PATH..."
docker build -t ${APP_NAME}:${IMAGE_TAG} "$APP_PATH"

echo "🐳 Loading image into kind cluster..."
kind load docker-image ${APP_NAME}:${IMAGE_TAG}

echo "📦 Deploying via Helm..."
helm upgrade --install ${APP_NAME} ${CHART_PATH} \
  --set image.repository=${APP_NAME} \
  --set image.tag=${IMAGE_TAG}

echo "✅ Done. Checking resources:"
kubectl get pods
kubectl get svc