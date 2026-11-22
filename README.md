# Data Days · Criptomonedas

Fabric App tipo portafolio del caso 01 de DP-600: una fotografía de mercado de CoinGecko que atraviesa Bronze, Silver y Gold antes de llegar a Power BI. La app explica la arquitectura, las reglas de calidad, las preguntas de negocio y los límites de la muestra. **No presenta cotizaciones en directo.**

## Explora la solución

| Parte | Contenido |
| --- | --- |
| `packages/frontend/` | Fabric App Rayfin: relato interactivo del caso, capas y resultados |
| [`case-source/notebooks/`](case-source/notebooks/) | Extracción, tipado, controles, estrella Gold y refresco |
| [`case-source/pipelines/`](case-source/pipelines/) | Orquestación del lote y avisos |
| [`case-source/powerbi/`](case-source/powerbi/) | PBIP con informe PBIR y modelo TMDL Direct Lake |
| [`case-source/preguntas_de_negocio.md`](case-source/preguntas_de_negocio.md) | Requisitos, reglas y criterios de aceptación |
| [`docs/proyecto.md`](docs/proyecto.md) | Workspace, carpeta e inventario de recursos de esta app |

La fuente de los artefactos es el [repositorio general de Data Days](https://github.com/vicente2121/DATADAYS_DP600/tree/main/charla01/caso_01_snapshot_diario_criptomonedas). Esta copia permite presentar el caso de forma independiente; el workspace de Fabric **no está sincronizado con Git**.

## Lo que demuestra

- Se conserva el JSON original y un `batch_id` por extracción.
- Silver publica solo la foto actual que supera los controles críticos.
- Gold mantiene la estrella, la integridad y la conciliación con la fuente.
- El informe separa mercado, calidad y trazabilidad, sin convertir precio o variación en totales engañosos.

## Desarrollo de la app

Requiere Node.js 22.13 o posterior y una sesión de Rayfin para las pruebas autenticadas.

```powershell
npm install
npm run typecheck
npm run build
npm run dev
```

Consulta [`docs/rayfin-template.md`](docs/rayfin-template.md) para la estructura y los comandos de la plantilla oficial. La réplica del caso de datos sigue [`case-source/preguntas_de_negocio.md`](case-source/preguntas_de_negocio.md).
