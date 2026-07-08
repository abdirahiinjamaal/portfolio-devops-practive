output "s3_content_bucket" {
  value = module.s3_content.bucket_name
}

output "s3_content_url" {
  value = module.s3_content.bucket_url
}

output "alb_dns" {
  value = module.ecs.alb_dns
}

output "ecs_cluster_name" {
  value = module.ecs.cluster_name
}
