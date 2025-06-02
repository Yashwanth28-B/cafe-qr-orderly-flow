
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# VPC Configuration
resource "aws_vpc" "qr_cafe_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "qr-cafe-vpc"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "qr_cafe_igw" {
  vpc_id = aws_vpc.qr_cafe_vpc.id

  tags = {
    Name = "qr-cafe-igw"
  }
}

# Public Subnets
resource "aws_subnet" "public_subnet" {
  count             = 2
  vpc_id            = aws_vpc.qr_cafe_vpc.id
  cidr_block        = "10.0.${count.index + 1}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]

  map_public_ip_on_launch = true

  tags = {
    Name = "qr-cafe-public-subnet-${count.index + 1}"
  }
}

# Route Table
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.qr_cafe_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.qr_cafe_igw.id
  }

  tags = {
    Name = "qr-cafe-public-rt"
  }
}

resource "aws_route_table_association" "public_rta" {
  count          = 2
  subnet_id      = aws_subnet.public_subnet[count.index].id
  route_table_id = aws_route_table.public_rt.id
}

# Security Group
resource "aws_security_group" "qr_cafe_sg" {
  name_prefix = "qr-cafe-sg"
  vpc_id      = aws_vpc.qr_cafe_vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "qr-cafe-sg"
  }
}

# ECS Cluster
resource "aws_ecs_cluster" "qr_cafe_cluster" {
  name = "qr-cafe-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = {
    Name = "qr-cafe-cluster"
  }
}

data "aws_availability_zones" "available" {
  state = "available"
}
