
#!/bin/bash

# QR Cafe Rollback Script

set -e

ENVIRONMENT=${1:-staging}

echo "Rolling back QR Cafe in $ENVIRONMENT environment"

case $ENVIRONMENT in
  "staging"|"production")
    kubectl rollout undo deployment/qr-cafe-app -n qr-cafe
    kubectl rollout status deployment/qr-cafe-app -n qr-cafe
    echo "Rollback completed!"
    ;;
    
  *)
    echo "Unknown environment: $ENVIRONMENT"
    echo "Usage: $0 [staging|production]"
    exit 1
    ;;
esac
