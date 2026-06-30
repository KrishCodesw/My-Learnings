variable "file1" {
  description = "This is a text file, consists of nothing"
  default     = "exam"
  type        = string
}
variable "count1" {
  type    = number
  default = 1
}

locals {
  environment = "dev"                                     // "dev"| "staging" | "prod" variable name
  upper_case  = upper(local.environment)                  // convert to uppercase
  bas_path    = "${path.module}/conf/${local.upper_case}" // append to base path
}
