resource "local_file" "tf_ex1" {
  content = "foo! mantar !"
  #   filename = "terraform\terraform" relative path
  filename = "${path.module}/${var.file1}/example1.txt" //modular
  count    = var.count1
  # filename = "${path.module}/example1.txt" //modular

  // For every resource - > there are some attributes that are compulsary to be defined 
}

resource "local_file" "server" {
  filename = "${local.bas_path}/server.sh"
  content  = <<EOT
  environment = ${local.environment}
  port=3000
  EOT
}

//Meta arguements 

# depends_on

# count - creates that many instances of that resource 
# filename = "/Users/kunalverma/Desktop/terraform-course/01_basics/example${count.index}.txt" can be used like this 

# for_each

# provider
# lifecycle
