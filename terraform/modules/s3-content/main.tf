resource "aws_s3_bucket" "content" {
  bucket = "portfolio-content-${var.environment}-${data.aws_caller_identity.current.account_id}"
}

resource "aws_s3_bucket_public_access_block" "content" {
  bucket = aws_s3_bucket.content.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "content" {
  bucket = aws_s3_bucket.content.id
  versioning_configuration {
    status = "Enabled"
  }
}

# CloudFront origin access control
resource "aws_cloudfront_origin_access_control" "content" {
  name                              = "portfolio-content-oac-${var.environment}"
  description                       = "OAC for portfolio content"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# S3 bucket policy to allow CloudFront access
resource "aws_s3_bucket_policy" "content" {
  bucket = aws_s3_bucket.content.id
  policy = data.aws_iam_policy_document.content.json
}

data "aws_iam_policy_document" "content" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.content.arn}/*"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.content.arn]
    }
  }
}

# CloudFront distribution
resource "aws_cloudfront_distribution" "content" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "content.json"
  price_class         = "PriceClass_100"

  origin {
    domain_name              = aws_s3_bucket.content.bucket_regional_domain_name
    origin_id                = "s3-content"
    origin_access_control_id = aws_cloudfront_origin_access_control.content.id
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "s3-content"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = {
    Environment = var.environment
  }
}

data "aws_caller_identity" "current" {}
