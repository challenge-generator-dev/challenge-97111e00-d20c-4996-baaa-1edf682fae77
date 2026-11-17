# Módulo de Infraestructura - Entorno de Desarrollo

## Descripción General

Este directorio contiene la configuración de infraestructura para el entorno de desarrollo del sistema de gestión de órdenes. La infraestructura se gestiona mediante Terraform y aprovisiona los recursos necesarios en AWS.

## Recursos Definidos

### Amazon DynamoDB
- **Tabla de Órdenes**: Almacena las órdenes del sistema con soporte para:
  - Capacidad de lectura/escritura aprovisionada
  - Índices secundarios globales para consultas eficientes
  - Cifrado del lado del servidor
  - Recuperación point-in-time
  - Streams para captura de cambios

### Amazon API Gateway
- **API REST**: Expone los endpoints para operaciones CRUD de órdenes
- **Integración con Lambda**: Conecta la API con la función Lambda de procesamiento
- **Stage de despliegue**: Configuración del entorno `dev`

### AWS IAM
- **Rol de Lambda**: Rol de ejecución con permisos para invocar funciones Lambda
- **Políticas**: Permisos de mínimo privilegio para DynamoDB y CloudWatch

## Estructura de Archivos

```
environments/dev/
├── main.tf          # Configuración principal del entorno
├── terraform.tfvars # Variables específicas del entorno
├── variables.tf     # Declaraciones de variables
├── outputs.tf       # Outputs del módulo
└── README.md        # Este archivo
```

## Configuración

### Variables Requeridas

Las variables se configuran en `terraform.tfvars`:

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `table_name` | Nombre de la tabla DynamoDB | `orders-dev` |
| `billing_mode` | Modo de facturación | `PROVISIONED` |
| `api_name` | Nombre de la API Gateway | `orders-api-dev` |
| `stage_name` | Stage de despliegue | `dev` |

### Etiquetas

Todas los recursos se etiquetán con metadatos para gestión:
- Environment: dev
- Project: orders-management
- ManagedBy: terraform

## Validación Local

### Prerrequisitos
- Terraform >= 1.9.0
- AWS CLI configurado con credenciales de desarrollo
- Acceso a la región us-east-1

### Comandos de Validación

1. **Inicializar Terraform**:
   ```bash
   cd environments/dev
   terraform init
   ```

2. **Validar sintaxis**:
   ```bash
   terraform validate
   ```

3. **Planificar cambios**:
   ```bash
   terraform plan -var-file=terraform.tfvars
   ```

4. **Aplicar configuración**:
   ```bash
   terraform apply -var-file=terraform.tfvars
   ```

5. **Verificar recursos**:
   ```bash
   # Listar tablas DynamoDB
   aws dynamodb list-tables --region us-east-1

   # Describir tabla específica
   aws dynamodb describe-table \
     --table-name orders-dev \
     --region us-east-1

   # Listar APIs Gateway
   aws apigateway get-rest-apis --region us-east-1
   ```

## Limpieza

Para destruir los recursos del entorno de desarrollo:

```bash
terraform destroy -var-file=terraform.tfvars
```

**Advertencia**: Esta operación elimina todos los datos almacenados en la tabla DynamoDB.

## Notas de Desarrollo

- El backend de estado es local (`local`) para facilitar el desarrollo
- Los recursos tienen prefijos `orders-dev` para identificación
- La capacidad aprovisionada es baja (10 RCU/WCU) para reducir costos en desarrollo
- Los logs de CloudWatch están habilitados para debugging
- El stream de DynamoDB está activo para pruebas de procesamiento de eventos