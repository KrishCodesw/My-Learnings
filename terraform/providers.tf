# Configuration using provider functions must include required_providers configuration.
terraform {
  required_providers {
    local = {
      source = "hashicorp/local"
      # Setting the provider version is a strongly recommended practice
      version = "6.52.0"
    }

    aws = {
      source  = "hashicorp/aws"
      version = "6.52.0"
    }
  }
  # Provider functions require Terraform 1.8 and later.
  required_version = ">= 1.8.0"
}

provider "local" {

}

output "example_output" {
  value = provider::local::direxists("${path.module}/example-directory")
}
