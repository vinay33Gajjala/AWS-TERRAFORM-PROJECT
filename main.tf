  #creating  a s3 bucket
resource "aws_s3_bucket" "statbucket" {
  bucket = var.Buck-Name
}
   #Bucket ownership for public access
resource "aws_s3_bucket_ownership_controls" "statbucket" {
  bucket = aws_s3_bucket.statbucket.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}
  #public access
resource "aws_s3_bucket_public_access_block" "statbucket" {
  bucket = aws_s3_bucket.statbucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}
 #Access control lists
 resource "aws_s3_bucket_acl" "statbucket" {
  depends_on = [
    aws_s3_bucket_ownership_controls.statbucket,
    aws_s3_bucket_public_access_block.statbucket,
  ]

  bucket = aws_s3_bucket.statbucket.id
  acl    = "public-read"
}
#object access to bucket
#index.html
resource "aws_s3_object" "statbucket" {
  bucket = aws_s3_bucket.statbucket.id
  key    = "index.html"
  source="index.html"
  acl="public-read"
  content_type = "text/html"
  }
  #error.html
resource "aws_s3_object" "object1" {
  bucket = aws_s3_bucket.statbucket.id
  key    = "error.html"
  source="error.html"
  acl="public-read"
  content_type = "text/html"
  }
  #website configuration
  resource "aws_s3_bucket_website_configuration" "example" {
  bucket = aws_s3_bucket.statbucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
depends_on = [ aws_s3_bucket_acl.statbucket ]
  
}