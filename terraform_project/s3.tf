resource "aws_s3_bucket" "tf_s3_bucket" {
  bucket = "my-tf-test-bucket for nodejs-app-static-files-bkt"

  tags = {
    Name        = "My bucket for Nodejs"
    Environment = "Dev"
  }
}


resource "aws_s3_object" "object" {
  bucket   = aws_s3_bucket.tf_s3_bucket
  key      = "images/${each.key}"
  source   = "nodejs-mysql/public/images/${each.key}"
  for_each = fileset("nodejs-mysql/public/images", "**") # get all files in the images directory

  # The filemd5() function is available in Terraform 0.11.12 and later
  # For Terraform 0.11.11 and earlier, use the md5() function and the file() function:
  # etag = "${md5(file("path/to/file"))}"
  etag = filemd5("path/to/file")
}


output "s3_bucket_id" {
  value = aws_s3_bucket.tf_s3_bucket.id
}
