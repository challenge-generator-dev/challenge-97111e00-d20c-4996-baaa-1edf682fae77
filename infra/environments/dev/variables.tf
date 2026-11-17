# ==============================================================================
# Variables del entorno de desarrollo
# ==============================================================================
# Definición de variables configurables para el entorno de desarrollo.
# Estas variables permiten personalizar la infraestructura sin modificar el código.

variable "table_name" {
  description = "Nombre de la tabla DynamoDB para almacenar órdenes"
  type        = string
  default     = "orders-dev"
}

variable "billing_mode" {
  description = "Modo de facturación de la tabla DynamoDB (PROVISIONED o PAY_PER_REQUEST)"
  type        = string
  default     = "PROVISIONED"
}

variable "read_capacity" {
  description = "Capacidad de lectura para el modo PROVISIONED"
  type        = number
  default     = 5
}

variable "write_capacity" {
  description = "Capacidad de escritura para el modo PROVISIONED"
  type        = number
  default     = 5
}

variable "gsi_read_capacity" {
  description = "Capacidad de lectura para el índice global secundario"
  type        = number
  default     = 5
}

variable "gsi_write_capacity" {
  description = "Capacidad de escritura para el índice global secundario"
  type        = number
  default     = 5
}

variable "tags" {
  description = "Etiquetas aplicadas a todos los recursos"
  type        = map(string)
  default     = {
    Project     = "orders-api"
    ManagedBy   = "terraform"
  }
}

variable "api_name" {
  description = "Nombre de la API Gateway"
  type        = string
  default     = "orders-api-dev"
}

variable "stage_name" {
  description = "Nombre del stage de despliegue (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "stream_view_type" {
  description = "Tipo de vista del stream de DynamoDB (KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES)"
  type        = string
  default     = "NEW_AND_OLD_IMAGES"
}