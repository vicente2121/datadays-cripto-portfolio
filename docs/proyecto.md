# Ficha del proyecto · Data Days Cripto

| Dato | Valor |
| --- | --- |
| Repositorio | `vicente2121/datadays-cripto-portfolio` (público) |
| Fuente | `vicente2121/DATADAYS_DP600/charla01/caso_01_snapshot_diario_criptomonedas` |
| Azure DevOps | No aplica: entrega directa solicitada para este portafolio, sin Épica ni historias |
| Modo de entrega | Directo a `main` |
| Workspace DEV | `DataDays-FabricApps-Portfolio-DEV` · `0245bb51-e0d1-40f1-b071-fcbbf1d7b155` |
| Carpeta Fabric | `01-Criptomonedas` · `acb942f4-e548-429a-8673-78fd486b674d` |
| App Rayfin | `datadays-cripto-portfolio` · `13f00121-db38-48c1-bd27-a393cb746eb4` |
| Elementos de este caso | `DD01_LH_Cripto`, `DD01_NB_Bronze`, `DD01_NB_Silver`, `DD01_NB_Gold`, `DD01_PL_CoinGecko`, `SM01_ObservatorioCripto`, `DD01_Informe_ObservatorioCripto`, `datadays_cripto_portfolio_connector` |
| Acceso | Fabric SSO; informe integrado por conector delegado al modelo Direct Lake, sin datos propios ni roles de app |
| Cuenta del desarrollador | `juanvicente@ajmvicente21hotmail.onmicrosoft.com` |
| Sincronización Git del workspace | Desactivada; las publicaciones se hacen con CLI/API y los repositorios se mantienen separados |

## Alcance de propiedad

Solo se crean o modifican los elementos enumerados arriba y la app de esta ficha. Los materiales originales en `case-source/` son una copia del repositorio general y no se sincronizan con el workspace.

## Publicación

- [Fabric App](https://early-tower-5ef68d90a6-spaincentral.webapp.fabricapps.net)
- [Informe en Fabric](https://app.fabric.microsoft.com/groups/0245bb51-e0d1-40f1-b071-fcbbf1d7b155/reports/eddcc051-24e7-47ed-b95b-10408e2c7890)
- `fabric/` contiene la canalización, el modelo TMDL y el PBIR adaptados a este workspace. `case-source/` conserva los originales.
- La canalización publicada ejecuta Bronze → Silver → Gold. Los avisos de correo de la plantilla original se conservan en `case-source/` porque usan direcciones de ejemplo.
- La ejecución de comprobación terminó con Bronze, Silver y Gold correctos; el modelo Direct Lake devolvió 100 activos y 100 filas de mercado.

| Elemento | ID |
| --- | --- |
| Lakehouse | `26e6bd01-2f27-438f-b81a-e19538df7948` |
| Notebooks Bronze / Silver / Gold | `80412129-6bea-4e9d-b1a0-966ab3a080c7` / `55c3e8cf-64a2-45bf-a816-eeea44c24c93` / `14b14848-6547-4eb0-aa14-ebfeaa91deab` |
| Pipeline | `91974a03-c920-48c3-9370-94b4f0ad8bd3` |
| Modelo Direct Lake | `df6d3273-def7-43a6-ade1-e40932b9ad01` |
| Informe | `eddcc051-24e7-47ed-b95b-10408e2c7890` |
| Conector Rayfin (UserDataFunction) | `e08eff04-b1cd-4b08-abed-d8497e68af13` |

## Informe en la app

La sección Informe lee el modelo semántico de esta ficha mediante consultas DAX en packages/frontend/src/queries/report/. El acceso se delega al usuario autenticado. El recorrido técnico y las relaciones están en [arquitectura.md](arquitectura.md).

## Riesgos para producción

- La app es un portafolio documental y no consulta cotizaciones en directo.
- La ingesta de CoinGecko puede estar sujeta a límites o autenticación.
- La visibilidad de los datos del Lakehouse depende de los permisos del workspace; revisar antes de uso productivo.
