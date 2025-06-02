
#!/bin/bash

# QR Cafe Deployment Script

set -e

ENVIRONMENT=${1:-staging}
IMAGE_TAG=${2:-latest}

echo "Deploying QR Cafe to $ENVIRONMENT environment with image tag: $IMAGE_TAG"

case $ENVIRONMENT in
  "staging")
    echo "Deploying to staging..."
    kubectl apply -f deployment/kubernetes/namespace.yml
    kubectl set image deployment/qr-cafe-app qr-cafe=ghcr.io/your-username/qr-cafe:$IMAGE_TAG -n qr-cafe
    kubectl apply -f deployment/kubernetes/
    ;;
  
  "production")
    echo "Deploying to production..."
    read -p "Are you sure you want to deploy to production? (y/N): " confirm
    if [[ $confirm == [yY] ]]; then
      kubectl apply -f deployment/kubernetes/namespace.yml
      kubectl set image deployment/qr-cafe-app qr-cafe=ghcr.io/your-username/qr-cafe:$IMAGE_TAG -n qr-cafe
      kubectl apply -f deployment/kubernetes/
    else
      echo "Deployment cancelled."
      exit 1
    fi
    ;;
    
  *)
    echo "Unknown environment: $ENVIRONMENT"
    echo "Usage: $0 [staging|production] [image-tag]"
    exit 1
    ;;
esac

echo "Deployment completed!"
