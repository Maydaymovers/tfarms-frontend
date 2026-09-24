"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type {
  ShockScenario,
  ShockScenarioCatalogItem,
  ShockScenarioCatalogResponse,
  ShockScenarioResponse,
} from "@/lib/sse/types";

const METRIC_LABELS: Array<keyof ShockScenario["metrics"]> = [
  "gmvImpact",
  "liquidityStrain",
  "vendorChurnRisk",
  "railFragility",
  "anomalyAmplification",
  "confidenceShock",
];

function formatMetricName(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}

function createCurvePoints(curve: number[]) {
  if (curve.length === 0) {
    return "";
  }

  const width = 100;
  const height = 40;
  const max = Math.max(...curve);
  const min = Math.min(...curve);
  const range = max - min || 1;

  return curve
    .map((value, index) => {
      const x = (index / Math.max(curve.length - 1, 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");
}

export default function ShockScenarioPanel() {
  const [catalog, setCatalog] = useState<ShockScenarioCatalogItem[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [scenario, setScenario] = useState<ShockScenario | null>(null);
  const [loadingCatalog, setLoadingCatalog] = useState(true);
  const [loadingScenario, setLoadingScenario] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const selectedIdRef = useRef(selectedId);
  const chartLabelId = useId();
  const chartTitleId = `${chartLabelId}-title`;
  const chartDescId = `${chartLabelId}-desc`;

  const curvePoints = useMemo(
    () => (scenario ? createCurvePoints(scenario.recoveryCurve) : ""),
    [scenario]
  );

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    async function loadCatalog() {
      setLoadingCatalog(true);
      setError(null);

      try {
        const response = await fetch("/api/shock-scenarios", {
          // TEMPORARY DEVELOPMENT-ONLY HEADER.
          // Do not treat this as production authorization.
          headers: {
            "x-admin": "true",
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load shock scenario catalog");
        }

        const data: ShockScenarioCatalogResponse = await response.json();

        if (cancelled) {
          return;
        }

        setCatalog(data.scenarios);
        setSelectedId((currentId) => {
          if (currentId && data.scenarios.some((item) => item.id === currentId)) {
            return currentId;
          }

          return data.scenarios[0]?.id ?? "";
        });
      } catch (err) {
        if (!cancelled && !controller.signal.aborted) {
          setError(err instanceof Error ? err.message : "Failed to load catalog");
        }
      } finally {
        if (!cancelled) {
          setLoadingCatalog(false);
        }
      }
    }

    loadCatalog();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    selectedIdRef.current = selectedId;

    if (!selectedId) {
      setScenario(null);
      setLoadingScenario(false);
      return;
    }

    const controller = new AbortController();
    let cancelled = false;
    const requestedId = selectedId;

    async function loadScenario() {
      setLoadingScenario(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/shock-scenarios?id=${encodeURIComponent(selectedId)}`,
          {
            // TEMPORARY DEVELOPMENT-ONLY HEADER.
            // Do not treat this as production authorization.
            headers: {
              "x-admin": "true",
            },
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load shock scenario");
        }

        const data: ShockScenarioResponse = await response.json();

        if (!cancelled && selectedIdRef.current === requestedId) {
          setScenario(data.scenario);
        }
      } catch (err) {
        if (!cancelled && !controller.signal.aborted) {
          setError(err instanceof Error ? err.message : "Failed to load scenario");
          setScenario(null);
        }
      } finally {
        if (!cancelled && selectedIdRef.current === requestedId) {
          setLoadingScenario(false);
        }
      }
    }

    loadScenario();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [selectedId]);

  return (
    <section className="mb-10 rounded-lg border border-amber-600/40 bg-gray-900 p-6 shadow-md shadow-amber-700/10">
      <h2 className="mb-4 text-2xl font-semibold text-amber-300">
        Shock Scenario Engine
      </h2>

      <div className="mb-6">
        <label
          htmlFor="shock-scenario-select"
          className="mb-2 block text-sm font-medium text-gray-300"
        >
          Select scenario
        </label>
        <select
          id="shock-scenario-select"
          className="w-full rounded-md border border-amber-600/50 bg-black px-3 py-2 text-white outline-none ring-0 focus:border-amber-400"
          value={selectedId}
          onChange={(event) => setSelectedId(event.target.value)}
          disabled={loadingCatalog || catalog.length === 0}
        >
          <option value="">
            {catalog.length === 0
              ? "No scenarios available"
              : "Select a shock scenario"}
          </option>
          {catalog.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} ({item.severityBand})
            </option>
          ))}
        </select>
      </div>

      {loadingCatalog && <p className="text-gray-400">Loading scenarios...</p>}
      {!loadingCatalog && loadingScenario && (
        <p className="text-gray-400">Loading scenario details...</p>
      )}
      {error && <p className="text-red-400">{error}</p>}

      {!loadingCatalog && !loadingScenario && !error && scenario && (
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-300">
              {scenario.severityBand}
            </p>
            <h3 className="text-xl font-bold text-white">{scenario.headline}</h3>
            <p className="text-sm text-amber-200">Vector: {scenario.shockVector}</p>
            <p className="text-gray-300">{scenario.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {METRIC_LABELS.map((metricKey) => (
              <div
                key={metricKey}
                className="rounded-md border border-gray-700 bg-black/40 p-3"
              >
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  {formatMetricName(metricKey)}
                </p>
                <p className="text-2xl font-bold text-amber-300">
                  {scenario.metrics[metricKey]}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-md border border-gray-700 bg-black/40 p-4">
            <p className="mb-3 text-sm font-medium text-gray-300">
              Recovery curve ({scenario.recoveryCurve.length} points)
            </p>
            <svg
              viewBox="0 0 100 40"
              className="h-40 w-full"
              role="img"
              aria-labelledby={`${chartTitleId} ${chartDescId}`}
            >
              <title id={chartTitleId}>
                {`${scenario.name} recovery curve`}
              </title>
              <desc id={chartDescId}>
                {`Recovery values: ${scenario.recoveryCurve.join(", ")}`}
              </desc>
              <polyline
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.8"
                strokeLinejoin="round"
                strokeLinecap="round"
                points={curvePoints}
              />
            </svg>
            <p className="mt-3 text-xs text-gray-400">
              {scenario.recoveryCurve.join(", ")}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
