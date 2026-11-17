# Implementación de operaciones CRUD de ordenes en DynamoDB

El sistema debe permitir la gestión de órdenes en DynamoDB a través de una interfaz de usuario construida con React. La UI debe permitir crear una orden y cambiar su estado. Se utilizará Vite como herramienta de build y hooks para el manejo del estado local.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Persistir ordenes en DynamoDB desde la interfaz |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 10 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Tener el proyecto base del reto funcionando en tu máquina: clonar el repositorio, instalar las herramientas y verificar que compila y arranca antes de empezar a practicar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Instala las herramientas para ejecutar el proyecto: Node.js 18+ y npm · Terraform 1.5+.
- Clona el repositorio del reto (el enlace viene en la entrega del reto y en la sección "Repositorio del Proyecto" del PDF) y ábrelo en tu IDE.
- Instala las dependencias y compila ejecutando `(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/api init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/api validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q` en la raíz del repositorio.
- Confirma que el comando termina sin errores: el proyecto arranca y sus pruebas corren.
- Ubica los archivos de práctica: son los que contienen `TODO(reto)` (búscalos en el repositorio). Lee el README.md y el AGENTS.md antes de empezar.

**Entregable:** El proyecto compila/arranca sin errores con `(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/api init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/api validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q`.

<details>
<summary>Pistas de conocimiento</summary>

- Los archivos con `TODO(reto)` son el ejercicio: el resto del repositorio ya está resuelto y no hace falta tocarlo.
- Si el comando de verificación falla, revisa la versión de las herramientas instaladas antes de modificar código.
- AGENTS.md describe el reto, el comando de verificación y las reglas del repositorio.

</details>

### Fase 1: Configuración del entorno y creación de la API

**Objetivo:** Configurar el entorno de desarrollo y crear la API para la gestión de órdenes.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Configurar el proyecto con Vite y React.
- Definir las rutas y métodos de la API para las operaciones CRUD de órdenes.
- Implementar la conexión a DynamoDB y realizar pruebas unitarias.

**Entregable:** API funcional para operaciones CRUD de órdenes en DynamoDB.

<details>
<summary>Pistas de conocimiento</summary>

- Utilizar Terraform para la gestión de la infraestructura como código.
- Manejo de errores y validaciones en la API.

</details>

### Fase 2: Implementación de la lógica de negocio

**Objetivo:** Implementar la lógica de negocio para las operaciones CRUD de órdenes.

**Tiempo estimado:** 4 horas

**Instrucciones:**

- Desarrollar la lógica para crear, leer, actualizar y eliminar órdenes en DynamoDB.
- Asegurar que la API maneje correctamente los estados de las órdenes.
- Realizar pruebas de integración para validar la lógica de negocio.

**Entregable:** Lógica de negocio implementada y pruebas de integración realizadas.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de hooks para el manejo del estado local.
- Manejo de transacciones y consistencia en DynamoDB.

</details>

### Fase 3: Versionado de la infraestructura

**Objetivo:** Versionar la infraestructura utilizando Terraform.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Configurar Terraform para gestionar la infraestructura como código.
- Versionar la configuración de DynamoDB y la API.
- Realizar despliegues y validar el funcionamiento de la infraestructura versionada.

**Entregable:** Infraestructura versionada y despliegues realizados.

<details>
<summary>Pistas de conocimiento</summary>

- Mejores prácticas para el versionado de la infraestructura.
- Manejo de variables y secretos en Terraform.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es una operación CRUD en el contexto de este reto?
- **paraQueSirve**: ¿Para qué sirve la API en este sistema?
- **comoSeUsa**: ¿Cómo se usa Terraform para versionar la infraestructura?
- **erroresComunes**: ¿Cuáles son los errores comunes que pueden ocurrir al implementar la lógica de negocio?
- **queDecisionesImplica**: ¿Qué decisiones implica el versionado de la infraestructura?

## Criterios de Evaluacion

- Configuración correcta del entorno de desarrollo y creación de la API.
- Implementación correcta de la lógica de negocio para las operaciones CRUD de órdenes.
- Versionado correcto de la infraestructura utilizando Terraform.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

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

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/api init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/api validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
