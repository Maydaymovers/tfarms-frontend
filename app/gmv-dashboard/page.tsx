"use client";

import React, { useEffect, useState } from "react";

export default function GMVDashboard() {
  const [gmv, setGmv] = useState<any>(null);
  const [ticker, setTicker] = useState<any>(null);
  const [intelligence, setIntelligence] = useState<any>(null);
  const [anomalies, setAnomalies] = useState<any>(null);
  const [predictions, setPredictions] = useState<any>(null);
  const [health, setHealth] = useState<any>(null);
  const [stability, setStability] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/gmv");
      const data = await res.json();
      setGmv(data);
    }
    load();
  }, []);

  useEffect(() => {
    async function loadTicker() {
      const res = await fetch("/api/gmv/ticker");
      const data = await res.json();
      setTicker(data);
    }

    loadTicker();
    const interval = setInterval(loadTicker, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function loadIntelligence() {
      const res = await fetch("/api/intelligence");
      const data = await res.json();
      setIntelligence(data);
    }

    loadIntelligence();
    const interval = setInterval(loadIntelligence, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function loadAnomalies() {
      const res = await fetch("/api/anomalies");
      const data = await res.json();
      setAnomalies(data);
    }

    loadAnomalies();
    const interval = setInterval(loadAnomalies, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function loadPredictions() {
      const res = await fetch("/api/predictions");
      const data = await res.json();
      setPredictions(data);
    }

    loadPredictions();
    const interval = setInterval(loadPredictions, 9000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function loadHealth() {
      const res = await fetch("/api/health");
      const data = await res.json();
      setHealth(data);
    }

    loadHealth();
    const interval = setInterval(loadHealth, 9000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function loadStability() {
      const res = await fetch("/api/stability");
      const data = await res.json();
      setStability(data);
    }

    loadStability();
    const interval = setInterval(loadStability, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!gmv) {
    return <div style={{ padding: 40, fontSize: 24 }}>Loading GMV...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>TFarms GMV Dashboard</h1>
      <p style={styles.subtitle}>Live Marketplace Revenue Overview</p>

      <div style={styles.grid}>
        <div style={styles.card}><h2 style={styles.cardTitle}>Monthly GMV</h2><p style={styles.value}>${gmv.gmvMonthly.toLocaleString()}</p></div>
        <div style={styles.card}><h2 style={styles.cardTitle}>Daily GMV</h2><p style={styles.value}>${gmv.gmvDaily.toLocaleString()}</p></div>
        <div style={styles.card}><h2 style={styles.cardTitle}>Active Vendors</h2><p style={styles.value}>{gmv.vendors.toLocaleString()}</p></div>
        <div style={styles.card}><h2 style={styles.cardTitle}>Active Buyers</h2><p style={styles.value}>{gmv.buyers.toLocaleString()}</p></div>
        <div style={styles.card}><h2 style={styles.cardTitle}>Average Order Value</h2><p style={styles.value}>${gmv.aov.toLocaleString()}</p></div>
      </div>

      <h2 style={styles.chartTitle}>Marketplace Intelligence</h2>
      <div style={styles.intelligenceBox}>
        {!intelligence && <p style={styles.loading}>Loading intelligence...</p>}
        {intelligence && <div style={styles.metricGrid}>
          <Metric label="Risk Score" value={intelligence.riskScore} />
          <Metric label="Demand Forecast" value={intelligence.demandForecast.toLocaleString()} />
          <Metric label="GMV Projection" value={`$${intelligence.gmvProjection.toLocaleString()}`} />
          <Metric label="Anomaly Probability" value={intelligence.anomalyProbability} />
          <Metric label="Vendor Health" value={intelligence.vendorHealth} />
          <Metric label="Buyer Momentum" value={intelligence.buyerMomentum} />
        </div>}
      </div>

      <h2 style={styles.chartTitle}>Marketplace Anomalies</h2>
      <div style={styles.anomalyBox}>
        {!anomalies && <p style={styles.loading}>Loading anomalies...</p>}
        {anomalies && <>
          <div style={styles.metricGrid}>
            <Metric label="GMV Irregularity" value={anomalies.gmvIrregularity ? "Yes" : "No"} />
            <Metric label="Vendor Outage Risk" value={anomalies.vendorOutageRisk ? "Yes" : "No"} />
            <Metric label="Buyer Surge Risk" value={anomalies.buyerSurgeRisk ? "Yes" : "No"} />
            <Metric label="Liquidity Dip" value={anomalies.liquidityDip ? "Yes" : "No"} />
            <Metric label="Volatility Spike" value={anomalies.volatilitySpike ? "Yes" : "No"} />
            <Metric label="Intelligence Mismatch" value={anomalies.intelligenceMismatch ? "Yes" : "No"} />
          </div>
          {Array.isArray(anomalies.summary) && <ul style={styles.summaryList}>{anomalies.summary.map((item: string, index: number) => <li key={index}>{item}</li>)}</ul>}
        </>}
      </div>

      <h2 style={styles.chartTitle}>Marketplace Predictions</h2>
      <div style={styles.predictionsBox}>
        {!predictions && <p style={styles.loading}>Loading predictions...</p>}
        {predictions && <div style={styles.metricGrid}>
          <Metric label="GMV Next Hour" value={`$${predictions.gmvNextHour.toLocaleString()}`} />
          <Metric label="GMV Tomorrow" value={`$${predictions.gmvTomorrow.toLocaleString()}`} />
          <Metric label="Buyer Momentum Forecast" value={predictions.buyerMomentumForecast} />
          <Metric label="Vendor Load Forecast" value={predictions.vendorLoadForecast} />
          <Metric label="Volatility Outlook" value={predictions.volatilityOutlook} />
          <Metric label="Liquidity Forecast" value={`$${predictions.liquidityForecast.toLocaleString()}`} />
          <Metric label="Anomaly-Adjusted Risk" value={predictions.anomalyAdjustedRisk} />
        </div>}
      </div>

      <h2 style={styles.chartTitle}>Weekly GMV Trend</h2>
      <div style={styles.chart}>
        {gmv.weekly.map((point: any, index: number) => <div key={index} style={styles.chartBarContainer}><div style={{ ...styles.chartBar, height: `${point.value / 1500}px` }} /><p style={styles.chartLabel}>{point.day}</p></div>)}
      </div>

      <h2 style={styles.chartTitle}>Real-Time GMV Ticker</h2>
      <div style={styles.tickerBox}><span>Live GMV:</span><span>${ticker ? ticker.gmv.toLocaleString() : "—"}</span></div>

      <h2 style={styles.chartTitle}>Marketplace Health Summary</h2>
      <div style={styles.healthBox}>
        {!health && <p style={styles.loading}>Loading marketplace health...</p>}
        {health && <div style={styles.metricGrid}>
          <Metric label="Overall Score" value={health.overallScore} />
          <Metric label="Risk" value={health.riskLevel} />
          <Metric label="GMV Trend" value={health.gmvTrend} />
          <Metric label="Liquidity" value={health.liquidityState} />
          <Metric label="Vendor Stability" value={health.vendorStability} />
          <Metric label="Buyer Confidence" value={health.buyerConfidence} />
          <Metric label="Volatility Pressure" value={health.volatilityPressure} />
          <Metric label="Anomaly Presence" value={health.anomalyPresence ? "Yes" : "No"} />
          <Metric label="Forecast Confidence" value={health.forecastConfidence} />
        </div>}
      </div>

      <h2 style={styles.chartTitle}>Marketplace Stability</h2>
      <div style={styles.stabilityBox}>
        {!stability && <p style={styles.loading}>Loading stability...</p>}
        {stability && <div style={styles.metricGrid}>
          <Metric label="Overall Stability" value={stability.overallStabilityScore} />
          <Metric label="Resilience Band" value={stability.resilienceBand} />
          <Metric label="GMV Stability" value={stability.gmvStability} />
          <Metric label="Vendor Reliability" value={stability.vendorReliability} />
          <Metric label="Buyer Consistency" value={stability.buyerConsistency} />
          <Metric label="Liquidity Resilience" value={stability.liquidityResilience} />
          <Metric label="Volatility Tolerance" value={stability.volatilityTolerance} />
          <Metric label="Anomaly Persistence" value={stability.anomalyPersistence} />
          <Metric label="Forecast Confidence" value={stability.forecastConfidence} />
        </div>}
      </div>

      <button style={styles.ctaButton}>+ Add Crop Listing</button>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: React.ReactNode }) {
  return <div style={styles.metricItem}><strong>{label}</strong><span>{value}</span></div>;
}

const styles = {
  container: { padding: "40px", fontFamily: "Arial, sans-serif", maxWidth: "900px", margin: "0 auto" },
  title: { fontSize: "36px", fontWeight: "bold", marginBottom: "10px" },
  subtitle: { fontSize: "18px", color: "#555", marginBottom: "30px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "40px" },
  card: { padding: "20px", borderRadius: "10px", backgroundColor: "#f5f5f5", textAlign: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" },
  cardTitle: { fontSize: "18px", marginBottom: "10px" },
  value: { fontSize: "28px", fontWeight: "bold" },
  chartTitle: { fontSize: "24px", marginBottom: "20px" },
  intelligenceBox: { padding: "20px", backgroundColor: "#e1f5fe", borderRadius: "10px", marginBottom: "40px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" },
  anomalyBox: { padding: "20px", backgroundColor: "#fff3e0", borderRadius: "10px", marginBottom: "40px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" },
  predictionsBox: { padding: "20px", backgroundColor: "#ede7f6", borderRadius: "10px", marginBottom: "40px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" },
  healthBox: { padding: "20px", backgroundColor: "#f3e5f5", borderRadius: "10px", marginBottom: "40px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" },
  stabilityBox: { padding: "20px", backgroundColor: "#e0f2f1", borderRadius: "10px", marginBottom: "40px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" },
  metricGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px" },
  metricItem: { display: "flex", flexDirection: "column", gap: "8px", backgroundColor: "#fff", padding: "15px", borderRadius: "8px", textAlign: "center", fontSize: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" },
  loading: { fontSize: "16px", color: "#555" },
  summaryList: { margin: "15px 0 0", paddingLeft: "20px", fontSize: "16px", lineHeight: "1.8" },
  chart: { display: "flex", alignItems: "flex-end", gap: "15px", height: "200px", marginBottom: "40px" },
  chartBarContainer: { textAlign: "center" },
  chartBar: { width: "30px", backgroundColor: "#4CAF50", borderRadius: "5px", transition: "height 0.3s ease" },
  chartLabel: { marginTop: "8px", fontSize: "14px" },
  tickerBox: { padding: "15px", backgroundColor: "#e8f5e9", borderRadius: "8px", marginBottom: "40px", display: "flex", justifyContent: "space-between", fontSize: "20px", fontWeight: "bold", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" },
  ctaButton: { padding: "15px 25px", fontSize: "18px", backgroundColor: "#2E7D32", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" },
};
