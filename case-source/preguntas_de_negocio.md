# Caso 01 · Snapshot diario de criptomonedas

Charla 01 · CoinGecko → Bronze → Silver → Gold en estrella → Power BI.

El cliente **Horizonte Digital** y la reunión de requisitos son un supuesto
docente. La ingesta utiliza CoinGecko real; no se incluyen datos de mercado,
credenciales ni evidencias de una ejecución dentro de este repositorio.

## Preguntas de negocio

| ID | Pregunta que plantea el cliente | Respuesta en el informe |
|---|---|---|
| PN-01 | ¿Qué activos lideran por capitalización dentro de nuestra muestra? | Ranking de los diez líderes mediante `Capitalización top 10 USD`. |
| PN-02 | ¿A qué precio cotiza cada activo observado? | Tabla por `Activos[nombre]` y medida `Precio USD`, con fecha de fuente. |
| PN-03 | ¿Qué activos suben o bajan en las últimas 24 horas? | `Variación 24h`, procedente de CoinGecko y escalada una sola vez. |
| PN-04 | ¿Qué volumen de negociación reporta la fuente por activo? | `Volumen 24h USD` por activo y para la selección. No equivale a liquidez garantizada. |
| PN-05 | ¿Cuánta capitalización concentran los diez primeros de nuestra muestra? | `Concentración top 10`, con el universo observado como denominador aunque se filtre un activo. |
| PN-06 | ¿Cuántos activos estamos observando y en qué moneda? | Medida `Activos` y contexto USD. Se solicita la primera página de hasta 100 activos. |
| PN-07 | ¿De cuándo es la extracción y de cuándo es el dato de cada activo? | Extracción, actualización de fuente y publicación diferenciadas; tiempos en UTC. |
| PN-08 | ¿Podemos confiar en los registros publicados? | Página de calidad con recibidas, aceptadas, rechazadas y resultados de siete controles. |
| PN-09 | ¿Podemos explicar de dónde salió cada indicador? | JSON original, `batch_id`, tablas por capa y página documental de trazabilidad. |

## Alcance y reglas acordadas para el ejercicio

- Fuente: `GET https://api.coingecko.com/api/v3/coins/markets`.
- Parámetros: USD, orden descendente de capitalización, `per_page=100`, `page=1`, sin sparkline.
- Se conserva cada extracción cruda; Silver y el mercado Gold contienen la foto actual validada.
- Se utiliza `coin_id` como clave de negocio, no el símbolo.
- Los rechazos críticos bloquean la publicación. Una variación 24h ausente se conserva nula y se señala como aviso.
- Precio y variación no se suman para producir un total ni una rentabilidad de cartera.
- La muestra no equivale a todo el mercado; salir del top 100 no demuestra una baja del activo.
- El pipeline se mantiene manual. No se activa una programación diaria en estos archivos.
- No se implementa un histórico analítico de cotizaciones, una cartera ni seguridad de producción.

## Modelo de negocio entregado

| Papel | Tablas del modelo |
|---|---|
| Dimensiones | `Activos`, `Fechas`, `Lotes`, `Reglas de calidad` |
| Hecho central | `Mercado`: una fila por activo y lote actual |
| Hecho de carga | `Ejecuciones`: una fila por lote publicado, con histórico de conteos |
| Hecho de calidad | `Controles`: una fila por regla del lote actual |
| Utilidad documental | `Trazabilidad`: 32 criterios; intencionadamente desconectada |

Hay ocho relaciones activas 1:N, unidireccionales de dimensión a hecho. No hay
relaciones entre hechos. El informe filtra `Lotes[es_actual] = true` para que
las tarjetas no acumulen todos los lotes de auditoría. El calendario representa
el día UTC de procesamiento y no crea un histórico de precios.

## Criterios de aceptación

1. La respuesta real debe ser una lista no vacía con los campos críticos.
2. El original y su manifiesto quedan bajo `Files/bronze/coingecko/fecha=.../batch_id=.../`.
3. Bronze añade una fila cruda por registro y lote, conservando ruta y metadatos.
4. Silver concilia `recibidas = aceptadas + rechazadas`, comprueba claves y bloquea los inválidos críticos.
5. Las cuatro dimensiones tienen claves únicas y no nulas; las ocho relaciones no contienen huérfanos.
6. La capitalización de Gold concilia con Silver y el JSON del mismo lote.
7. Al seleccionar Bitcoin, cambian sus indicadores y se mantiene la concentración de la muestra.
8. Precio y variación devuelven blanco cuando no hay un único activo.
9. Gold espera a que el refresco del modelo termine antes de declarar éxito.
10. El informe muestra mercado, calidad y trazabilidad, utilizando dimensiones y medidas explícitas.

## Archivos del caso

- [Bronze](notebooks/NB01_CoinGecko_Bronze.ipynb): extracción, JSON original, manifiesto y tabla Delta append.
- [Silver](notebooks/NB02_CoinGecko_Silver.ipynb): tipado, controles y foto validada.
- [Gold](notebooks/NB03_CoinGecko_Gold.ipynb): dimensiones, hechos, integridad y refresco del modelo.
- [Pipeline](pipelines/PL01_CoinGecko_Diario.json): tres notebooks en serie y cuatro actividades de aviso.
- [Proyecto Power BI](powerbi/ObservatorioCripto.pbip): informe PBIR y modelo TMDL en estrella, sin datos locales.

## Cómo preparar tu réplica

1. Descarga o clona el repositorio completo para conservar las carpetas y recursos del proyecto Power BI.
2. Crea tu propio workspace con capacidad Fabric y un Lakehouse dedicado al caso, con esquemas habilitados.
3. Importa los tres notebooks y añade tu Lakehouse como predeterminado en cada uno. La copia pública no lleva asociaciones al Lakehouse original.
4. Ejecuta Bronze y Silver completos. En el primer arranque ejecuta Gold **solo hasta el paso 10** para materializar sus ocho tablas; todavía no solicites el refresco del modelo.
5. En `powerbi/ObservatorioCripto.SemanticModel/definition/expressions.tmdl`, sustituye `<WORKSPACE_ID>` y `<LAKEHOUSE_ID>` por tus identificadores.
6. Abre `powerbi/ObservatorioCripto.pbip` en una versión de Desktop compatible con PBIP y modelado remoto Direct Lake. El informe referencia el modelo incluido mediante `byPath`. Cuando se solicite un modelo remoto, crea o elige uno de práctica en tu workspace con el nombre **SM01_ObservatorioCripto**. También puedes desplegar las definiciones con los mecanismos de Fabric.
7. Direct Lake requiere un modelo en Fabric; este proyecto no contiene un modelo de datos Import para trabajar desconectado. Las tablas, las relaciones y las 15 medidas se incluyen en `ObservatorioCripto.SemanticModel/definition`.
8. Con el modelo ya creado, ejecuta Gold completo y comprueba el refresco. La edición pública **no elimina tablas antiguas** del entorno del participante.
9. Crea/configura el pipeline con las actividades de la definición. Reemplaza `<WORKSPACE_ID>`, `<NOTEBOOK_BRONZE_ID>`, `<NOTEBOOK_SILVER_ID>` y `<NOTEBOOK_GOLD_ID>` por los de tu réplica. Los marcadores son una plantilla y deben sustituirse antes de usar la definición en Fabric.
10. Si utilizas correo, crea tu conexión Outlook OAuth2, sustituye `<OUTLOOK_CONNECTION_ID>` y cambia `tu.cuenta@example.com` por tu buzón organizativo autorizado. Los avisos tienen cero reintentos. El correo de éxito depende únicamente del éxito de Gold; cada correo de fallo depende solo de su etapa.
11. Ejecuta los lotes en serie. En la raíz de `Files` solo se utiliza `bronze`; dentro se agrupan originales, control y exportaciones de evidencia.
12. Comprueba el lote en `Files/bronze/_publicacion/latest.json`, las tres páginas del informe y la prueba de filtro Bitcoin. Las cifras de una extracción nueva pueden variar.

La API puede imponer autenticación o límites según el plan y el momento de uso;
el código propaga los errores de acceso y no fabrica datos para sustituirlos.

Referencia oficial para abrir un PBIP con modelo remoto:
[Direct Lake en Power BI Project](https://learn.microsoft.com/en-us/fabric/fundamentals/direct-lake-power-bi-project).
