# Variables de entrada para el módulo API
# Estas variables permiten configurar la API Gateway y los permisos asociados

variable "api_name" {
  description = "Nombre de la API Gateway"
  type        = string
}

variable "lambda_invoke_arn" {
  description = "ARN de invocación de la función Lambda"
  type        = string
}

variable "lambda_function_name" {
  description = "Nombre de la función Lambda"
  type        = string
}

variable "dynamodb_table_arn" {
  description = "ARN de la tabla DynamoDB de órdenes"
  type        = string
}

variable "stage_name" {
  description = "Nombre del stage de despliegue de la API"
  type        = string
  default     = "dev"
}