export type SeverityBand = "Moderate" | "High" | "Critical";

export type ShockScenarioMetrics = {
  gmvImpact: number;
  liquidityStrain: number;
  vendorChurnRisk: number;
  railFragility: number;
  anomalyAmplification: number;
  confidenceShock: number;
};

export type ShockScenario = {
  id: string;
  name: string;
  severityBand: SeverityBand;
  shockVector: string;
  description: string;
  metrics: ShockScenarioMetrics;
  recoveryCurve: number[];
  headline: string;
};

export type ShockScenarioCatalogItem = Pick<
  ShockScenario,
  "id" | "name" | "severityBand" | "shockVector"
>;

export type ShockScenarioCatalogResponse = {
  scenarios: ShockScenarioCatalogItem[];
  timestamp: number;
};

export type ShockScenarioResponse = {
  scenario: ShockScenario;
  timestamp: number;
};
