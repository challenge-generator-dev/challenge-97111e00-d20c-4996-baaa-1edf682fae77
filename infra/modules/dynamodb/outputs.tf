# Outputs del módulo DynamoDB
# Estos outputs exponen recursos y atributos necesarios para otros módulos

output "table_name" {
  description = "Nombre de la tabla DynamoDB creada"
  value       = aws_dynamodb_table.orders_table.name
}

output "table_arn" {
  description = "ARN de la tabla DynamoDB creada"
  value       = aws_dynamodb_table.orders_table.arn
}

output "table_id" {
  description = "ID de la tabla DynamoDB creada"
  value       = aws_dynamodb_table.orders_table.id
}