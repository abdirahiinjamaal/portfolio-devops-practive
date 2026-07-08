provider "aws" {
  region = var.aws_region
}

# Remote state storage (S3 + DynamoDB locking)
resource "aws_s3_bucket" "tfstate" {
  bucket = "portfolio-tfstate-${data.aws_caller_identity.current.account_id}"
}

resource "aws_s3_bucket_versioning" "tfstate" {
  bucket = aws_s3_bucket.tfstate.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_dynamodb_table" "tflock" {
  name         = "portfolio-tfstate-lock"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}

data "aws_caller_identity" "current" {}

# Networking module
module "networking" {
  source      = "./modules/networking"
  vpc_cidr    = var.vpc_cidr
  environment = var.environment
}

# S3 content bucket
module "s3_content" {
  source      = "./modules/s3-content"
  environment = var.environment
}

# ECS Fargate deployment
module "ecs" {
  source                 = "./modules/ecs"
  environment            = var.environment
  vpc_id                 = module.networking.vpc_id
  public_subnet_ids      = module.networking.public_subnet_ids
  alb_security_group_id  = module.networking.alb_security_group_id
  ecs_security_group_id  = module.networking.ecs_security_group_id
  container_port         = 80
  app_image              = var.app_image
  api_image              = var.api_image
  domain_name            = var.domain_name
}
