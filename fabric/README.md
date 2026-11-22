# Definiciones publicadas · criptomonedas

Estas copias apuntan al workspace `DataDays-FabricApps-Portfolio-DEV`. `case-source/` conserva el material original. El workspace no tiene integración Git.

- `pipeline-content.json`: Bronze → Silver → Gold con IDs de los notebooks publicados. Los avisos Office 365 del original se omitieron porque tienen destinatarios de ejemplo.
- `SemanticModel/`: modelo TMDL Direct Lake dirigido al Lakehouse `DD01_LH_Cripto`.
- `Report/`: PBIR enlazado al modelo `SM01_ObservatorioCripto`. Su `definition.pbir` usa la forma `byConnection` que exige la API de Fabric; el validador local avisa que esa forma no sirve para abrirlo en Desktop.

La primera carga creó las tablas Gold, pero el refresco del modelo se adelantó a la sincronización del SQL endpoint. Tras `refreshMetadata` y el refresco del modelo, la segunda ejecución de la canalización terminó con las tres actividades correctas. Antes de la primera carga en otro workspace, materializa Gold, sincroniza metadatos y luego refresca el modelo.
