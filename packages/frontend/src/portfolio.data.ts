export interface PortfolioData {
  number: string;
  motif: 'crypto' | 'fuel' | 'crossref';
  monogram: string;
  kicker: string;
  title: string;
  intro: string;
  disclosure: string;
  sourceUrl: string;
  flow: string;
  metrics: { value: string; label: string }[];
  domain: string;
  challengeTitle: string;
  challenge: string;
  takeaway: string;
  stages: { name: string; short: string; title: string; description: string; points: string[]; caption: string }[];
  resultsIntro: string;
  outcomes: { question: string; answer: string }[];
  limit: string;
  artifacts: { title: string; description: string; href: string; kind: 'guide' | 'code' | 'repo' }[];
  replicaTitle: string;
  replicaSteps: string[];
  footer: string;
}

const source = 'https://github.com/vicente2121/datadays-cripto-portfolio';
const path = 'case-source';

export const caseStudy: PortfolioData = {
  number: '01', motif: 'crypto', monogram: 'CG',
  kicker: 'CASO 01 · SNAPSHOT DIARIO DE CRIPTOMONEDAS',
  title: 'El pulso del mercado, con trazabilidad.',
  intro: 'De CoinGecko a Microsoft Fabric: una foto validada del mercado, con origen, controles y significado visibles antes de llegar a Power BI.',
  disclosure: 'Portafolio documental del caso docente. No muestra cotizaciones en directo.',
  sourceUrl: `${source}/tree/main/${path}`,
  flow: 'COINGECKO → BRONZE → SILVER → GOLD → POWER BI',
  metrics: [
    { value: '100', label: 'activos como máximo por extracción' },
    { value: '7', label: 'controles de calidad documentados' },
    { value: '15', label: 'medidas DAX en el modelo' },
  ],
  domain: 'MERCADO · CALIDAD · LINAJE',
  challengeTitle: 'Una cifra necesita contexto.',
  challenge: 'Un precio aislado no dice cuándo se obtuvo, qué activos quedaron fuera ni si la carga superó las reglas de calidad. Este caso convierte una respuesta de mercado en una publicación explicable: conserva el original, distingue tiempos de extracción y de fuente, valida los registros y muestra el lote publicado.',
  takeaway: 'La muestra y sus límites aparecen junto a los indicadores: no se confunde un top 100 observado con todo el mercado.',
  stages: [
    { name: 'Bronze', short: 'Capturar sin perder el original', title: 'Cada extracción queda documentada.', description: 'El notebook consulta CoinGecko, guarda la respuesta JSON original y un manifiesto por fecha y lote, y añade registros crudos a una tabla Delta.', points: ['GET /coins/markets en USD, ordenado por capitalización', 'Ruta de origen y batch_id conservados', 'Una fila cruda por activo y lote'], caption: 'NB01_CoinGecko_Bronze.ipynb' },
    { name: 'Silver', short: 'Tipar y controlar la foto', title: 'Solo se publica lo que supera los controles.', description: 'Silver tipa y concilia la respuesta. Los rechazos críticos bloquean la publicación; una variación de 24 horas ausente se conserva como nula y se señala como aviso.', points: ['Clave de negocio: coin_id, nunca el símbolo', 'Conciliación: recibidas = aceptadas + rechazadas', 'Foto actual validada por lote'], caption: 'NB02_CoinGecko_Silver.ipynb' },
    { name: 'Gold', short: 'Modelo en estrella auditable', title: 'Indicadores con sus dimensiones y hechos.', description: 'Gold crea dimensiones, hechos de mercado, ejecución y control, comprueba integridad y espera el refresco del modelo antes de declarar éxito.', points: ['Ocho relaciones 1:N activas', 'Capitalización conciliada con Silver y JSON', 'Histórico de conteos de ejecución, sin histórico de precios'], caption: 'NB03_CoinGecko_Gold.ipynb' },
    { name: 'Power BI', short: 'Mercado, calidad y trazabilidad', title: 'Tres lecturas de un mismo lote.', description: 'El proyecto PBIP entrega un modelo Direct Lake y páginas para mercado, calidad y trazabilidad. Las medidas distinguen métricas que pueden agregarse de las que requieren un único activo.', points: ['Precio y variación sin total engañoso', 'Filtro del lote actual', 'Página documental de linaje'], caption: 'ObservatorioCripto.pbip' },
  ],
  resultsIntro: 'El informe original responde preguntas de mercado y también permite verificar cómo se obtuvo la respuesta.',
  outcomes: [
    { question: '¿Quién lidera la muestra?', answer: 'Ranking de diez activos por capitalización y concentración top 10 sobre el universo observado.' },
    { question: '¿Qué ocurre con cada activo?', answer: 'Precio, variación de 24 horas y volumen reportado, con fecha de la fuente.' },
    { question: '¿Cuándo se extrajo el dato?', answer: 'Tiempos de extracción, actualización de fuente y publicación diferenciados en UTC.' },
    { question: '¿Podemos confiar en la carga?', answer: 'Conteos de recibidos, aceptados y rechazados, y resultado de siete reglas de calidad.' },
    { question: '¿De dónde sale cada indicador?', answer: 'JSON original, identificador de lote, capas y trazabilidad de medidas.' },
  ],
  limit: 'El pipeline entregado es manual. La solución no implementa histórico analítico de cotizaciones, cartera ni seguridad de producción. CoinGecko puede imponer límites o autenticación; esta app no simula datos cuando la fuente no responde.',
  artifacts: [
    { title: 'Preguntas de negocio', description: 'Alcance, reglas y criterios de aceptación', href: `${source}/blob/main/${path}/preguntas_de_negocio.md`, kind: 'guide' },
    { title: 'Notebooks', description: 'Extracción, calidad y modelo Gold', href: `${source}/tree/main/${path}/notebooks`, kind: 'code' },
    { title: 'Pipeline', description: 'Orquestación y avisos del lote', href: `${source}/tree/main/${path}/pipelines`, kind: 'code' },
    { title: 'Proyecto Power BI', description: 'Informe PBIR y modelo TMDL Direct Lake', href: `${source}/tree/main/${path}/powerbi`, kind: 'repo' },
  ],
  replicaTitle: 'Una réplica aislada por workspace.',
  replicaSteps: ['Crea un Lakehouse con esquemas e importa los tres notebooks.', 'Materializa Gold antes de conectar el modelo Direct Lake.', 'Sustituye los identificadores de workspace, Lakehouse y notebooks en las plantillas.', 'Ejecuta los lotes en serie y verifica latest.json, calidad y el filtro de Bitcoin.'],
  footer: 'CASO 01 / CRIPTOMONEDAS',
};
