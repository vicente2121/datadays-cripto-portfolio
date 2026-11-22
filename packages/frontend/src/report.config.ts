import type { VisualizationSpec } from '@microsoft/fabric-visuals';
import primarySpecJson from './queries/report/primarySpec.visual.json';
import secondarySpecJson from './queries/report/secondarySpec.visual.json';
const primarySpec = primarySpecJson as unknown as VisualizationSpec;
const secondarySpec = secondarySpecJson as unknown as VisualizationSpec;
import type { ColumnMetadataMap } from './lib/to-data-table';
import overviewQuery from './queries/report/overview.dax?raw';
import primaryQuery from './queries/report/top-assets.dax?raw';

const metadata: ColumnMetadataMap = {
  'Activos[nombre]': { name: 'Nombre', displayName: 'Activo' },
  'Activos[simbolo]': { name: 'Simbolo', displayName: 'Símbolo' },
  '[CapitalizacionUSD]': { name: 'CapitalizacionUSD', displayName: 'Capitalización USD', format: '#,0' },
  '[Variacion24h]': { name: 'Variacion24h', displayName: 'Variación 24 h', format: '+0.00%;-0.00%;0.00%' },
};

export const report = {
  connection: 'criptomodel',
  title: 'El mercado, en una mirada.',
  intro: 'Indicadores y líderes de la fotografía publicada. Los valores vienen del modelo Direct Lake del caso.',
  overviewQuery,
  primaryQuery,
  secondaryQuery: '',
  secondarySource: 'primary' as const,
  metrics: [
    { label: 'Activos observados', subtitle: 'Lote actual', field: '[Activos]', format: '0', compact: false },
    { label: 'Concentración top 10', subtitle: 'De la muestra', field: '[ConcentracionTop10]', format: '0.00%', compact: false },
    { label: 'Filas aceptadas', subtitle: 'Control de calidad', field: '[FilasAceptadas]', format: '0', compact: false },
    { label: 'Filas rechazadas', subtitle: 'Control de calidad', field: '[FilasRechazadas]', format: '0', compact: false },
  ],
  primaryTitle: 'Líderes por capitalización',
  primarySubtitle: 'Diez activos de la muestra · USD',
  primarySpec,
  primaryMetadata: metadata,
  secondaryTitle: 'Movimiento en 24 horas',
  secondarySubtitle: 'Los mismos diez activos · variación de la fuente',
  secondarySpec,
  secondaryMetadata: metadata,
  disclosure: 'Fotografía del lote publicado, sin cotizaciones en directo ni histórico de cartera. La variación es la reportada por CoinGecko.',
};
