output "bucket_name" {
  value = aws_s3_bucket.content.id
}

output "bucket_arn" {
  value = aws_s3_bucket.content.arn
}

output "bucket_url" {
  value = "https://${aws_s3_bucket.content.bucket_regional_domain_name}"
}
