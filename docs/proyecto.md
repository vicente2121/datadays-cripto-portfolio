# Ficha del proyecto · Data Days Cripto

| Dato | Valor |
| --- | --- |
| Repositorio | `vicente2121/datadays-cripto-portfolio` (público) |
| Fuente | `vicente2121/DATADAYS_DP600/charla01/caso_01_snapshot_diario_criptomonedas` |
| Azure DevOps | No aplica: entrega directa solicitada para este portafolio, sin Épica ni historias |
| Modo de entrega | Directo a `main` |
| Workspace DEV | `DataDays-FabricApps-Portfolio-DEV` · `0245bb51-e0d1-40f1-b071-fcbbf1d7b155` |
| Carpeta Fabric | `01-Criptomonedas` · `acb942f4-e548-429a-8673-78fd486b674d` |
| App Rayfin | `datadays-cripto-portfolio` · identificador único en `rayfin/rayfin.yml` |
| Elementos de este caso | `DD01_LH_Cripto`, `DD01_NB_Bronze`, `DD01_NB_Silver`, `DD01_NB_Gold`, `DD01_PL_CoinGecko`, `DD01_SM_ObservatorioCripto`, `DD01_Informe_ObservatorioCripto` |
| Acceso | Fabric SSO; portafolio documental sin datos propios ni roles de app |
| Cuenta del desarrollador | `juanvicente@ajmvicente21hotmail.onmicrosoft.com` |
| Sincronización Git del workspace | Desactivada; las publicaciones se hacen con CLI/API y los repositorios se mantienen separados |

## Alcance de propiedad

Solo se crean o modifican los elementos enumerados arriba y la app de esta ficha. Los materiales originales en `case-source/` son una copia del repositorio general y no se sincronizan con el workspace.

## Riesgos para producción

- La app es un portafolio documental y no consulta cotizaciones en directo.
- La ingesta de CoinGecko puede estar sujeta a límites o autenticación.
- La visibilidad de los datos del Lakehouse depende de los permisos del workspace; revisar antes de uso productivo.
