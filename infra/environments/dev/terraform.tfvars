# ==============================================================================
# Variables de entorno para desarrollo
# ==============================================================================
# Este archivo contiene los valores de configuración específicos del entorno
# de desarrollo. Los valores aquí definidos se utilizan en main.tf para
# aprovisionar los recursos de infraestructura necesarios.

# ------------------------------------------------------------------------------
# Configuración de la tabla DynamoDB
# ------------------------------------------------------------------------------
table_name         = "orders-dev"
billing_mode       = "PROVISIONED"
read_capacity      = 10
write_capacity     = 10
gsi_read_capacity  = 5
gsi_write_capacity = 5

# ------------------------------------------------------------------------------
# Configuración de la API Gateway
# ------------------------------------------------------------------------------
api_name      = "orders-api-dev"
stage_name    = "dev"

# ------------------------------------------------------------------------------
# Configuración de etiquetas
# ----------------------------------------------------------------------------==
tags = {
  Environment = "dev"
  Project     = "orders-management"
  ManagedBy   = "terraform"
  CostCenter  = "engineering"
  Owner       = "platform-team"
  Compliance  = "standard"
  Backup      = "enabled"
  Monitoring  = "enabled"
  Team        = "backend"
  Region      = "us-east-1"
}

# ------------------------------------------------------------------------------
# Configuración de red y seguridad
# ------------------------------------------------------------------------------
enable_vpc_endpoints     = false
enable_dynamodb_endpoint = false
allowed_cidr_blocks      = ["10.0.0.0/8", "172.16.0.0/12"]
enable_waf               = false

# ------------------------------------------------------------------------------
# Configuración de logging
# ------------------------------------------------------------------------------
enable_api_logging         = true
log_level                  = "INFO"
enable_dynamodb_stream     = true
stream_view_type           = "NEW_AND_OLD_IMAGES"

# ------------------------------------------------------------------------------
# Configuración de rendimiento
# ------------------------------------------------------------------------------
enable_dax                 = false
dax_node_type              = "dax.t3.small"
dax_node_count             = 1
enable_point_in_time_recovery = true
enable_server_side_encryption = true