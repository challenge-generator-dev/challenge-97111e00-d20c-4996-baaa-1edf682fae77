# Variables de entrada para el módulo DynamoDB
# Estas variables permiten configurar la tabla DynamoDB según los requisitos del entorno

variable "table_name" {
  description = "Nombre de la tabla DynamoDB"
  type        = string
}

variable "billing_mode" {
  description = "Modo de facturación de DynamoDB (PROVISIONED o PAY_PER_REQUEST)"
  type        = string
  default     = "PROVISIONED"
}

variable "read_capacity" {
  description = "Capacidad de lectura provisionada para la tabla"
  type        = number
  default     = 5
}

variable "write_capacity" {
  description = "Capacidad de escritura provisionada para la tabla"
  type        = number
  default     = 5
}

variable "gsi_read_capacity" {
  description = "Capacidad de lectura provisionada para los índices secundarios globales"
  type        = number
  default     = 5
}

variable "gsi_write_capacity" {
  description = "Capacidad de escritura provisionada para los índices secundarios globales"
  type        = number
  default     = 5
}

variable "tags" {
  description = "Etiquetas para la tabla DynamoDB"
  type        = map(string)
  default     = {}
}