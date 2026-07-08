variable "environment" {
  description = "Environment name"
  type        = string
}

variable "vpc_id" {
  description = "VPC ID"
  type        = string
}

variable "public_subnet_ids" {
  description = "List of public subnet IDs"
  type        = list(string)
}

variable "alb_security_group_id" {
  description = "Security group ID for ALB"
  type        = string
}

variable "ecs_security_group_id" {
  description = "Security group ID for ECS tasks"
  type        = string
}

variable "container_port" {
  description = "Container port"
  type        = number
  default     = 80
}

variable "app_image" {
  description = "Frontend Docker image"
  type        = string
}

variable "api_image" {
  description = "Backend Docker image"
  type        = string
}

variable "mongodb_uri" {
  description = "MongoDB connection string"
  type        = string
  default     = "mongodb://localhost:27017/portfolio"
}

variable "domain_name" {
  description = "Custom domain name"
  type        = string
  default     = ""
}

variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}
