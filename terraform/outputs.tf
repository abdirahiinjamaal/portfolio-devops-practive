output "s3_content_bucket" {
  value = module.s3_content.bucket_name
}

output "cloudfront_domain" {
  value = module.s3_content.cloudfront_domain
}

output "alb_dns" {
  value = module.ecs.alb_dns
}

output "ecs_cluster_name" {
  value = module.ecs.cluster_name
}
