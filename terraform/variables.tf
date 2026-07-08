variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "dev"
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "app_image" {
  description = "Frontend Docker image URI"
  type        = string
  default     = "nginx:alpine"
}

variable "api_image" {
  description = "Backend Docker image URI"
  type        = string
  default     = "node:20-alpine"
}

variable "domain_name" {
  description = "Custom domain (optional)"
  type        = string
  default     = ""
}
