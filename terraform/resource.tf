resource "local_file" "tf_ex1" {
  content = "foo! mantar !"
  #   filename = "terraform\terraform" relative path
  filename = "${path.module}/example1.txt" //modular

  // For every resource - > there are some attributes that are compulsary to be defined 
}
