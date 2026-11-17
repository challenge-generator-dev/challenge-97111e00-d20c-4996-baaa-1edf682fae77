# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `api/src/routes/orders.ts` — La fase "Configuración del entorno y creación de la API" (f1) practica routes/orders.ts (definición de endpoints) aqui: este archivo es el ejercicio (blueprint).
- `api/src/services/OrderService.ts` — La fase "Implementación de la lógica de negocio" (f2) practica services/OrderService.ts (lógica de negocio para operaciones CRUD) aqui: este archivo es el ejercicio (blueprint).
- `api/src/repositories/OrderRepositoryImpl.ts` — La fase "Implementación de la lógica de negocio" (f2) practica repositories/OrderRepositoryImpl.ts (implementación concreta de DynamoDB) aqui: este archivo es el ejercicio (blueprint).
- `client/src/hooks/useOrders.ts` — La fase "Configuración del entorno y creación de la API" se implementa aqui: este archivo es el ejercicio.
- `client/src/components/OrderForm.tsx` — La fase "Implementación de la lógica de negocio" se implementa aqui: este archivo es el ejercicio.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB |
| `client` | `client/` | chapter, support | client | React | React |
| `infra` | `infra/` | support | infra | Terraform (AWS) | Terraform |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/api init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/api validate && terraform -chdir=modules/dynamodb validate` — componente `infra` (support).
3. `cd api && npm install --no-audit --no-fund && npm run build` — componente `api` (practice).
4. `cd client && npm install --no-audit --no-fund && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /orders`
  - `GET /orders`
  - `GET /orders/{id}`
  - `PUT /orders/{id}`
  - `DELETE /orders/{id}`

## Como saber que terminaste

```bash
(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/api init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/api validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Advanced L2

### Brecha de conocimiento
CRUD de ordenes en DynamoDB desde la interfaz

### Misión / candidato
Gestionar ordenes

### Reto
- Tema: Persistir ordenes en DynamoDB desde la interfaz
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de operaciones CRUD de ordenes en DynamoDB
- Tiempo estimado: 10 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración del entorno y creación de la API — objetivo: Configurar el entorno de desarrollo y crear la API para la gestión de órdenes. — entregable (NO resolver): API funcional para operaciones CRUD de órdenes en DynamoDB.
- Fase 2: Implementación de la lógica de negocio — objetivo: Implementar la lógica de negocio para las operaciones CRUD de órdenes. — entregable (NO resolver): Lógica de negocio implementada y pruebas de integración realizadas.
- Fase 3: Versionado de la infraestructura — objetivo: Versionar la infraestructura utilizando Terraform. — entregable (NO resolver): Infraestructura versionada y despliegues realizados.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/package.json ===
{
  "name": "reto-nest",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "tsc -p tsconfig.json"
  },
  "dependencies": {
    "@aws-sdk/client-dynamodb": "3.1170.0",
    "@aws-sdk/lib-dynamodb": "3.1170.0",
    "@nestjs/common": "10.4.22",
    "@nestjs/core": "10.4.22",
    "@nestjs/platform-express": "10.4.22",
    "@nestjs/swagger": "8.1.1",
    "class-transformer": "0.5.1",
    "class-validator": "0.15.1",
    "express": "5.3.0",
    "reflect-metadata": "0.2.2",
    "rxjs": "7.8.2"
  },
  "devDependencies": {
    "@types/express": "4.17.25",
    "@types/node": "22.20.5",
    "typescript": "5.7.3"
  }
}

// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "dist",
    "strict": true,
    "strictPropertyInitialization": false,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    "types": [
      "node"
    ]
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "_pendiente",
    "tests",
    "test",
    "src/**/*.spec.ts",
    "src/**/*.test.ts"
  ]
}

// === ARCHIVO: api/src/dto/create-order.dto.ts ===
import { IsString, IsNotEmpty, IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  price: number;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsString()
  @IsNotEmpty()
  status: string;

  constructor(id: string, customerId: string, items: OrderItemDto[], status: string) {
    this.id = id;
    this.customerId = customerId;
    this.items = items;
    this.status = status;
    this.validateInvariants();
  }

  private validateInvariants(): void {
    if (this.items.length === 0) {
      throw new Error('Order must have at least one item');
    }
    if (this.status !== 'pending' && this.status !== 'completed' && this.status !== 'cancelled') {
      throw new Error('Invalid order status');
    }
  }
}

// === ARCHIVO: api/src/dto/update-order.dto.ts ===
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  @IsNotEmpty()
  status: string;

  constructor(status: string) {
    this.status = status;
    this.validateInvariants();
  }

  private validateInvariants(): void {
    if (this.status !== 'pending' && this.status !== 'completed' && this.status !== 'cancelled') {
      throw new Error('Invalid order status');
    }
  }
}

// === ARCHIVO: api/src/routes/orders.ts ===
import { Controller, Post, Get, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { OrderService } from '../services/OrderService';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { Order } from '../models/order.model';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created', type: Order })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    // TODO(reto): Implementar la creación de la orden
    throw new Error('Method not implemented');
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'List of orders', type: [Order] })
  async getOrders(): Promise<Order[]> {
    // TODO(reto): Implementar la obtención de todas las órdenes
    throw new Error('Method not implemented');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiResponse({ status: 200, description: 'Order details', type: Order })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async getOrder(@Param('id') id: string): Promise<Order> {
    // TODO(reto): Implementar la obtención de una orden por ID
    throw new Error('Method not implemented');
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update order status' })
  @ApiResponse({ status: 200, description: 'Order updated', type: Order })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    // TODO(reto): Implementar la actualización del estado de la orden
    throw new Error('Method not implemented');
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete order' })
  @ApiResponse({ status: 204, description: 'Order deleted' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOrder(@Param('id') id: string): Promise<void> {
    // TODO(reto): Implementar la eliminación de la orden
    throw new Error('Method not implemented');
  }
}

// === ARCHIVO: api/src/repositories/OrderRepository.ts ===
import { Order } from '../models/order.model';

export interface OrderRepository {
  create(order: Order): Promise<Order>;
  findAll(): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  update(id: string, order: Partial<Order>): Promise<Order>;
  delete(id: string): Promise<void>;
}

export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';

// === ARCHIVO: api/src/repositories/OrderRepositoryImpl.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable } from '@nestjs/common';
import { OrderRepository } from './OrderRepository';
import { Order } from '../models/order.model';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  private readonly client: DynamoDBDocumentClient;
  private readonly tableName: string;

  constructor() {
    const dynamoDBClient = new DynamoDBClient({
      region: process.env.AWS_REGION || 'us-east-1',
      endpoint: process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000',
    });
    this.client = DynamoDBDocumentClient.from(dynamoDBClient);
    this.tableName = process.env.DYNAMODB_TABLE || 'orders';
  }

  async create(order: Order): Promise<Order> {
    throw new Error('TODO(reto): create');
  }

  async findAll(): Promise<Order[]> {
    throw new Error('TODO(reto): findAll');
  }

  async findById(id: string): Promise<Order | null> {
    throw new Error('TODO(reto): findById');
  }

  async update(id: string, order: Partial<Order>): Promise<Order> {
    throw new Error('TODO(reto): update');
  }

  async delete(id: string): Promise<void> {
    throw new Error('TODO(reto): delete');
  }
}

// === ARCHIVO: api/src/services/OrderService.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { OrderRepository, ORDER_REPOSITORY } from '../repositories/OrderRepository';
import { Order } from '../models/order.model';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepository,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    throw new Error('TODO(reto): createOrder');
  }

  async getOrders(): Promise<Order[]> {
    throw new Error('TODO(reto): getOrders');
  }

  async getOrder(id: string): Promise<Order> {
    throw new Error('TODO(reto): getOrder');
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    throw new Error('TODO(reto): updateOrder');
  }

  async deleteOrder(id: string): Promise<void> {
    throw new Error('TODO(reto): deleteOrder');
  }
}

// === ARCHIVO: api/src/main.ts ===
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters();

  const config = new DocumentBuilder()
    .setTitle('Orders API')
    .setDescription('API para gestión de órdenes en DynamoDB')
    .setVersion('1.0')
    .addTag('orders')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`Aplicación corriendo en http://localhost:${port}`);
  console.log(`Documentación Swagger disponible en http://localhost:${port}/api`);
}

bootstrap();

// === ARCHIVO: api/src/app.module.ts ===
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { OrdersController } from './routes/orders';
import { OrderService } from './services/OrderService';
import { OrderRepositoryImpl } from './repositories/OrderRepositoryImpl';
import { ORDER_REPOSITORY } from './repositories/OrderRepository';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

@Module({
  controllers: [OrdersController],
  providers: [
    OrderService,
    {
      provide: ORDER_REPOSITORY,
      useClass: OrderRepositoryImpl,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
  exports: [OrderService, ORDER_REPOSITORY],
})
export class AppModule {}

// === ARCHIVO: api/src/models/order.model.ts ===
export class OrderItem {
  productId: string;
  quantity: number;
  price: number;

  constructor(productId: string, quantity: number, price: number) {
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
  }
}

export class Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  status: string;
  createdAt: string;
  updatedAt: string;

  constructor(
    id: string,
    customerId: string,
    items: OrderItem[],
    status: string,
    createdAt: string,
    updatedAt: string,
  ) {
    this.id = id;
    this.customerId = customerId;
    this.items = items;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

// === ARCHIVO: api/src/filters/global-exception.filter.ts ===
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message || exception.message;
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}

// === ARCHIVO: client/src/main.tsx ===
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// === ARCHIVO: client/package.json ===
{
  "name": "reto-react",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "tsc --noEmit && vite build"
  },
  "dependencies": {
    "axios": "1.21.1",
    "react": "18.3.1",
    "react-dom": "18.3.1"
  },
  "devDependencies": {
    "@types/react": "18.3.31",
    "@types/react-dom": "18.3.7",
    "@vitejs/plugin-react": "4.7.0",
    "typescript": "5.7.3",
    "vite": "5.4.21"
  }
}

// === ARCHIVO: client/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": [
      "ES2020",
      "DOM",
      "DOM.Iterable"
    ],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "strictPropertyInitialization": false,
    "noEmit": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "useDefineForClassFields": true,
    "types": [
      "vite/client"
    ]
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "_pendiente",
    "tests",
    "src/**/*.test.ts",
    "src/**/*.test.tsx",
    "src/**/*.spec.ts",
    "src/**/*.spec.tsx"
  ]
}

// === ARCHIVO: client/vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({ plugins: [react()] });

// === ARCHIVO: client/index.html ===
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reto</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

// === ARCHIVO: client/src/vite-env.d.ts ===
/// <reference types="vite/client" />

// === ARCHIVO: client/src/api/orders.ts ===
import axios from 'axios';
import { CreateOrderDto, UpdateOrderDto, Order } from '../types/order';

const API_BASE_URL = 'http://localhost:3000';

export const createOrder = async (orderData: CreateOrderDto): Promise<Order> => {
  const response = await axios.post<Order>(`${API_BASE_URL}/orders`, orderData);
  return response.data;
};

export const getOrders = async (): Promise<Order[]> => {
  const response = await axios.get<Order[]>(`${API_BASE_URL}/orders`);
  return response.data;
};

export const getOrder = async (id: string): Promise<Order> => {
  const response = await axios.get<Order>(`${API_BASE_URL}/orders/${id}`);
  return response.data;
};

export const updateOrder = async (id: string, orderData: UpdateOrderDto): Promise<Order> => {
  const response = await axios.put<Order>(`${API_BASE_URL}/orders/${id}`, orderData);
  return response.data;
};

export const deleteOrder = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/orders/${id}`);
};

// === ARCHIVO: client/src/hooks/useOrders.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { useState, useEffect } from 'react';
import { Order } from '../types/order';
import { getOrders, createOrder, updateOrder, deleteOrder } from '../api/orders';

export const useOrders = () => {
  throw new Error('TODO(reto): useOrders');
};

// === ARCHIVO: client/src/types/order.ts ===
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDto {
  id: string;
  customerId: string;
  items: OrderItem[];
  status: string;
}

export interface UpdateOrderDto {
  status: string;
}

// === ARCHIVO: client/src/components/OrderForm.tsx ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { useState } from 'react';
import { CreateOrderDto, UpdateOrderDto, OrderItem } from '../types/order';

interface OrderFormProps {
  initialData?: CreateOrderDto | null;
  onSubmit: (data: CreateOrderDto | UpdateOrderDto) => Promise<void>;
  isEditing?: boolean;
}

export function OrderForm({ initialData, onSubmit, isEditing = false }: OrderFormProps) {
  throw new Error('TODO(reto): anonymous');
}

// === ARCHIVO: client/src/components/OrderList.tsx ===
import { useState } from 'react';
import type { Order, CreateOrderDto, UpdateOrderDto } from '../types/order';
import { OrderForm } from './OrderForm';

interface OrderListProps {
  orders: Order[];
  loading: boolean;
  onEdit: (order: Order) => void;
  onDelete: (id: string) => Promise<void>;
}

export function OrderList({ orders, loading, onEdit, onDelete }: OrderListProps) {
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleDeleteOrder = async (id: string) => {
    if (!window.confirm('¿Está seguro de que desea eliminar esta orden?')) {
      return;
    }
    setActionError(null);
    setSuccessMessage(null);
    try {
      await onDelete(id);
      setSuccessMessage('Orden eliminada exitosamente');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar la orden';
      setActionError(message);
    }
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch {
      return dateString;
    }
  };

  const calculateTotal = (items: Order['items']): number => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getStatusClass = (status: string): string => {
    const statusMap: Record<string, string> = {
      pending: 'status-pending',
      processing: 'status-processing',
      completed: 'status-completed',
      cancelled: 'status-cancelled',
    };
    return statusMap[status.toLowerCase()] || 'status-default';
  };

  if (loading) {
    return (
      <div className="order-list-container">
        <div className="loading-spinner">Cargando órdenes...</div>
      </div>
    );
  }

  return (
    <div className="order-list-container">
      <div className="order-list-header">
        <h2>Gestión de Órdenes</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancelar' : 'Nueva Orden'}
        </button>
      </div>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {actionError && (
        <div className="error-message">{actionError}</div>
      )}

      {showForm && (
        <div className="order-form-container">
          <OrderForm onSubmit={async (data: CreateOrderDto | UpdateOrderDto) => {
            setShowForm(false);
            setSuccessMessage('Orden creada exitosamente');
            setTimeout(() => setSuccessMessage(null), 3000);
          }} isEditing={false} />
        </div>
      )}

      {editingOrder && (
        <div className="order-form-container">
          <OrderForm
            initialData={editingOrder}
            onSubmit={async (data: CreateOrderDto | UpdateOrderDto) => {
              setEditingOrder(null);
              setSuccessMessage('Orden actualizada exitosamente');
              setTimeout(() => setSuccessMessage(null), 3000);
            }}
            isEditing={true}
          />
          <button onClick={() => setEditingOrder(null)} className="btn-secondary">
            Cancelar Edición
          </button>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="empty-state">
          <p>No hay órdenes disponibles</p>
          <button onClick={() => setShowForm(true)} className="btn-primary">
            Crear primera orden
          </button>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-card-header">
                <h3>Orden #{order.id}</h3>
                <span className={`status-badge ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="order-card-body">
                <div className="order-info">
                  <span className="label">Cliente:</span>
                  <span className="value">{order.customerId}</span>
                </div>
                <div className="order-info">
                  <span className="label">Items:</span>
                  <span className="value">{order.items.length}</span>
                </div>
                <div className="order-info">
                  <span className="label">Total:</span>
                  <span className="value">${calculateTotal(order.items).toFixed(2)}</span>
                </div>
                <div className="order-info">
                  <span className="label">Creado:</span>
                  <span className="value">{formatDate(order.createdAt)}</span>
                </div>
                <div className="order-info">
                  <span className="label">Actualizado:</span>
                  <span className="value">{formatDate(order.updatedAt)}</span>
                </div>
              </div>
              <div className="order-card-footer">
                <button
                  onClick={() => setEditingOrder(order)}
                  className="btn-edit"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteOrder(order.id)}
                  className="btn-delete"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// === ARCHIVO: client/src/App.tsx ===
import { useState, useEffect } from 'react';
import { OrderList } from './components/OrderList';
import { OrderForm } from './components/OrderForm';
import { useOrders } from './hooks/useOrders';
import type { CreateOrderDto, UpdateOrderDto, Order } from './types/order';

function App() {
  const { orders, loading, error, fetchOrders, createOrder, updateOrder, deleteOrder } = useOrders();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleCreateOrder = async (data: CreateOrderDto | UpdateOrderDto) => {
    await createOrder(data as CreateOrderDto);
    setIsFormOpen(false);
    fetchOrders();
  };

  const handleUpdateOrder = async (id: string, data: UpdateOrderDto) => {
    await updateOrder(id, data);
    setEditingOrder(null);
    fetchOrders();
  };

  const handleDeleteOrder = async (id: string) => {
    await deleteOrder(id);
    fetchOrders();
  };

  const handleEditOrder = (order: Order) => {
    setEditingOrder(order);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingOrder(null);
  };

  const handleSubmit = editingOrder
    ? (data: CreateOrderDto | UpdateOrderDto) => handleUpdateOrder(editingOrder.id, data as UpdateOrderDto)
    : handleCreateOrder;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Sistema de Gestión de Órdenes</h1>
        <button
          className="btn-primary"
          onClick={() => setIsFormOpen(true)}
        >
          Nueva Orden
        </button>
      </header>

      {error && (
        <div className="error-banner">
          <p>Error: {error}</p>
        </div>
      )}

      {isFormOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <OrderForm
              initialData={editingOrder}
              onSubmit={handleSubmit}
              isEditing={!!editingOrder}
            />
            <button
              className="btn-secondary"
              onClick={handleCloseForm}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <main className="app-main">
        <OrderList
          orders={orders}
          loading={loading}
          onEdit={handleEditOrder}
          onDelete={handleDeleteOrder}
        />
      </main>
    </div>
  );
}

export default App;

// === ARCHIVO: client/src/index.css ===
/* Estilos pendientes: archivo creado automaticamente porque otro modulo lo importa. */


// === ARCHIVO: infra/versions.tf ===
terraform {
  required_version = ">= 1.9.0, < 2.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 5.100.0"
    }
  }
}

// === ARCHIVO: infra/providers.tf ===
provider "aws" {
  region = "us-east-1"
}

// === ARCHIVO: infra/modules/dynamodb/main.tf ===
# Módulo DynamoDB para la tabla de órdenes
# Este módulo crea una tabla DynamoDB con los atributos necesarios para gestionar órdenes
# y configura los índices secundarios globales para consultas eficientes.

resource "aws_dynamodb_table" "orders_table" {
  name           = var.table_name
  billing_mode   = var.billing_mode
  read_capacity  = var.read_capacity
  write_capacity = var.write_capacity
  hash_key       = "orderId"

  attribute {
    name = "orderId"
    type = "S"
  }

  attribute {
    name = "userId"
    type = "S"
  }

  attribute {
    name = "status"
    type = "S"
  }

  attribute {
    name = "createdAt"
    type = "S"
  }

  global_secondary_index {
    name            = "UserIndex"
    hash_key        = "userId"
    range_key       = "createdAt"
    projection_type = "ALL"
    read_capacity   = var.gsi_read_capacity
    write_capacity  = var.gsi_write_capacity
  }

  global_secondary_index {
    name            = "StatusIndex"
    hash_key        = "status"
    range_key       = "createdAt"
    projection_type = "ALL"
    read_capacity   = var.gsi_read_capacity
    write_capacity  = var.gsi_write_capacity
  }

  tags = var.tags
}

// === ARCHIVO: infra/modules/dynamodb/variables.tf ===
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

// === ARCHIVO: infra/modules/dynamodb/outputs.tf ===
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

// === ARCHIVO: infra/modules/api/main.tf ===
# Módulo API para la gestión de órdenes
# Este módulo crea una API Gateway con integración Lambda y configura los permisos necesarios
# para interactuar con la tabla DynamoDB de órdenes.

resource "aws_api_gateway_rest_api" "orders_api" {
  name        = var.api_name
  description = "API para gestión de órdenes"
}

resource "aws_api_gateway_resource" "orders_resource" {
  rest_api_id = aws_api_gateway_rest_api.orders_api.id
  parent_id   = aws_api_gateway_rest_api.orders_api.root_resource_id
  path_part   = "orders"
}

resource "aws_api_gateway_method" "orders_method" {
  rest_api_id   = aws_api_gateway_rest_api.orders_api.id
  resource_id   = aws_api_gateway_resource.orders_resource.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "orders_integration" {
  rest_api_id             = aws_api_gateway_rest_api.orders_api.id
  resource_id             = aws_api_gateway_resource.orders_resource.id
  http_method             = aws_api_gateway_method.orders_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = var.lambda_invoke_arn
}

resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.orders_api.execution_arn}/*/*"
}

resource "aws_iam_role" "lambda_role" {
  name = "${var.api_name}-lambda-role"

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
}

resource "aws_iam_role_policy" "lambda_dynamodb_policy" {
  name = "${var.api_name}-lambda-dynamodb-policy"
  role = aws_iam_role.lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan"
        ],
        Effect   = "Allow",
        Resource = var.dynamodb_table_arn
      },
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Effect   = "Allow",
        Resource = "*"
      }
    ]
  })
}

resource "aws_api_gateway_deployment" "orders_deployment" {
  depends_on = [aws_api_gateway_integration.orders_integration]
  rest_api_id = aws_api_gateway_rest_api.orders_api.id
  description = "Deployment para el stage ${var.stage_name}"
}

resource "aws_api_gateway_stage" "orders_stage" {
  deployment_id = aws_api_gateway_deployment.orders_deployment.id
  rest_api_id   = aws_api_gateway_rest_api.orders_api.id
  stage_name    = var.stage_name
}

// === ARCHIVO: infra/modules/api/variables.tf ===
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

// === ARCHIVO: infra/environments/dev/terraform.tfvars ===
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

// === ARCHIVO: infra/environments/dev/main.tf ===
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

// === ARCHIVO: infra/README.md ===
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

// === ARCHIVO: infra/environments/dev/variables.tf ===
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

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"

```
