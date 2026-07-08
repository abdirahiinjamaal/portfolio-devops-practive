output "bucket_name" {
  value = aws_s3_bucket.content.id
}

output "bucket_arn" {
  value = aws_s3_bucket.content.arn
}

output "cloudfront_domain" {
  value = aws_cloudfront_distribution.content.domain_name
}

output "cloudfront_id" {
  value = aws_cloudfront_distribution.content.id
}
