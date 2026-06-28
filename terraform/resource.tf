resource "local_file" "tf_ex1" {
  content = "foo!"
  #   filename = "terraform\terraform" relative path
  filename = "${path.module}/example1.txt" //modular
}
