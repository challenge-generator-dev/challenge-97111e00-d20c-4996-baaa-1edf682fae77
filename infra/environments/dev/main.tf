# ==============================================================================
# Configuración del entorno de desarrollo
# ==============================================================================
# Este módulo configura los recursos de infraestructura para el entorno
# de desarrollo, incluyendo la tabla DynamoDB y la API Gateway.

terraform {
  # Se utiliza el backend local para desarrollo
  backend "local" {
    path = "terraform.tfstate"
  }
}

# ------------------------------------------------------------------------------
# Módulo DynamoDB para órdenes
# ------------------------------------------------------------------------------
module "dynamodb" {
  source = "../../modules/dynamodb"

  # Configuración de la tabla
  table_name         = var.table_name
  billing_mode       = var.billing_mode
  read_capacity      = var.read_capacity
  write_capacity     = var.write_capacity
  gsi_read_capacity  = var.gsi_read_capacity
  gsi_write_capacity = var.gsi_write_capacity

  # Etiquetas
  tags = var.tags
}

# ------------------------------------------------------------------------------
# Módulo API Gateway
# ------------------------------------------------------------------------------
module "api" {
  source = "../../modules/api"

  # Configuración de la API
  api_name            = var.api_name
  stage_name          = var.stage_name
  lambda_invoke_arn   = "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:123456789012:function:orders-handler-dev/invocations"
  lambda_function_name = "orders-handler-dev"

  # Referencia al ARN de la tabla DynamoDB
  dynamodb_table_arn = module.dynamodb.table_arn
}

# ------------------------------------------------------------------------------
# Política de acceso para desarrollo
# ------------------------------------------------------------------------------
resource "aws_iam_policy" "dev_access_policy" {
  name        = "orders-dev-access-policy"
  description = "Política de acceso para el entorno de desarrollo"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan"
        ]
        Resource = [
          module.dynamodb.table_arn,
          "${module.dynamodb.table_arn}/index/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:us-east-1:*:log-group:/aws/lambda/orders-*"
      }
    ]
  })

  tags = var.tags
}

# ------------------------------------------------------------------------------
# Rol IAM para Lambda en desarrollo
# ------------------------------------------------------------------------------
resource "aws_iam_role" "lambda_execution_role" {
  name = "orders-lambda-execution-role-dev"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })

  tags = var.tags
}

# ------------------------------------------------------------------------------
# Adjuntar política de acceso DynamoDB al rol de Lambda
# ------------------------------------------------------------------------------
resource "aws_iam_role_policy_attachment" "lambda_dynamodb_attachment" {
  role       = aws_iam_role.lambda_execution_role.name
  policy_arn = aws_iam_policy.dev_access_policy.arn
}

# ------------------------------------------------------------------------------
# Adjuntar política de CloudWatch Logs al rol de Lambda
# ------------------------------------------------------------------------------
resource "aws_iam_role_policy_attachment" "lambda_logs_attachment" {
  role       = aws_iam_role.lambda_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# ------------------------------------------------------------------------------
# Variables locales para el entorno
# ------------------------------------------------------------------------------
locals {
  environment_name = "development"
  resource_prefix  = "orders-${var.stage_name}"
  common_tags      = merge(var.tags, {
    Environment = "dev"
    Stage       = var.stage_name
  })
}

# ------------------------------------------------------------------------------
# Output de resultados para el entorno
# ------------------------------------------------------------------------------
output "environment" {
  description = "Nombre del entorno"
  value       = "dev"
}

output "dynamodb_table_name" {
  description = "Nombre de la tabla DynamoDB"
  value       = module.dynamodb.table_name
}

output "dynamodb_table_arn" {
  description = "ARN de la tabla DynamoDB"
  value       = module.dynamodb.table_arn
}

output "api_endpoint" {
  description = "Endpoint de la API Gateway"
  value       = "${var.api_name}.execute-api.us-east-1.amazonaws.com/${var.stage_name}"
}

output "lambda_role_arn" {
  description = "ARN del rol de ejecución de Lambda"
  value       = aws_iam_role.lambda_execution_role.arn
}

output "lambda_role_name" {
  description = "Nombre del rol de ejecución de Lambda"
  value       = aws_iam_role.lambda_execution_role.name
}