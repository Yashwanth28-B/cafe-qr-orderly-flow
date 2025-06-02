
# QR Cafe DevOps Documentation

## Overview
This document describes the DevOps setup for the QR Cafe application, including containerization, CI/CD pipelines, monitoring, and deployment strategies.

## Docker Configuration

### Building the Application
```bash
# Build the Docker image
docker build -t qr-cafe .

# Run locally
docker run -p 3000:80 qr-cafe
```

### Docker Compose
```bash
# Start all services (app + monitoring)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## CI/CD Pipeline

### GitHub Actions Workflow
The pipeline includes:
- **Testing**: Linting, unit tests, and build verification
- **Security Scanning**: Vulnerability assessment with Trivy
- **Container Building**: Docker image creation and push to GitHub Container Registry
- **Deployment**: Automated deployment to staging/production

### Environments
- **Staging**: Deploys on pushes to `develop` branch
- **Production**: Deploys on pushes to `main` branch

## Monitoring Stack

### Prometheus Metrics
- Application performance metrics
- System resource usage
- Custom business metrics

### Grafana Dashboards
Access at: `http://localhost:3001`
- Username: `admin`
- Password: `admin123`

### Available Dashboards
- HTTP request rate and response times
- Error rates and status codes
- CPU and memory usage
- Custom QR Cafe business metrics

## Deployment Options

### 1. Docker Compose (Development/Small Scale)
```bash
docker-compose up -d
```

### 2. Kubernetes (Production)
```bash
# Apply all configurations
kubectl apply -f deployment/kubernetes/

# Check deployment status
kubectl get pods -n qr-cafe

# View logs
kubectl logs -f deployment/qr-cafe-app -n qr-cafe
```

### 3. AWS ECS (Cloud)
```bash
# Initialize Terraform
cd deployment/terraform
terraform init
terraform plan
terraform apply
```

## Deployment Commands

### Manual Deployment
```bash
# Deploy to staging
./deployment/scripts/deploy.sh staging v1.0.0

# Deploy to production
./deployment/scripts/deploy.sh production v1.0.0
```

### Rollback
```bash
# Rollback in staging
./deployment/scripts/rollback.sh staging

# Rollback in production
./deployment/scripts/rollback.sh production
```

## Security Considerations

1. **Container Security**: Regular vulnerability scanning with Trivy
2. **Secrets Management**: Use Kubernetes secrets or AWS Secrets Manager
3. **Network Security**: Proper ingress configuration and security groups
4. **SSL/TLS**: Automated certificate management with cert-manager

## Monitoring and Alerting

### Key Metrics to Monitor
- Response time (95th percentile < 500ms)
- Error rate (< 1%)
- CPU usage (< 80%)
- Memory usage (< 80%)
- Disk usage (< 85%)

### Alert Rules
Configured in `monitoring/alert_rules.yml`:
- High error rate (> 10% for 5 minutes)
- High response time (> 500ms for 5 minutes)
- Service down (> 1 minute)

## Scaling

### Horizontal Pod Autoscaler (HPA)
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: qr-cafe-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: qr-cafe-app
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

## Backup and Recovery

### Database Backups (if using external DB)
- Automated daily backups
- Point-in-time recovery capability
- Cross-region backup replication

### Application State
- Stateless application design
- Configuration stored in ConfigMaps/Secrets
- Persistent volumes for any required state

## Troubleshooting

### Common Issues
1. **Container won't start**: Check logs with `docker logs` or `kubectl logs`
2. **High memory usage**: Monitor with Grafana, consider increasing limits
3. **Slow response times**: Check database connections and network latency
4. **Build failures**: Verify all dependencies and build steps

### Useful Commands
```bash
# Check container health
docker ps
kubectl get pods -n qr-cafe

# View application logs
kubectl logs -f deployment/qr-cafe-app -n qr-cafe

# Debug container
kubectl exec -it <pod-name> -n qr-cafe -- /bin/sh

# Check resource usage
kubectl top pods -n qr-cafe
```

## Next Steps

1. Set up external database (PostgreSQL/MongoDB)
2. Implement centralized logging (ELK stack)
3. Add performance testing (k6/JMeter)
4. Implement blue-green deployments
5. Set up disaster recovery procedures
