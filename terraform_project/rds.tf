resource "aws_db_instance" "tf_db" {
  allocated_storage    = 10
  db_name              = "project_demo"
  identifier           = "nodejs db"
  engine               = "mysql"
  engine_version       = "8.0"
  instance_class       = "db.t3.micro"
  username             = "foo"
  password             = "foobarbaza"
  publicly_accessible  = true
  parameter_group_name = "default.mysql8.0"
  skip_final_snapshot  = true
  #   vpc_security_group_ids = aws_instance.tf_server.security_groups
}
