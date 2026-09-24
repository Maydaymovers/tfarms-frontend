"use client";

import React, { useEffect, useState } from "react";

export default function GMVDashboard() {
  const [gmv, setGmv] = useState<any>(null);
  const [ticker, setTicker] = useState<any>(null);
  const [predictions, setPredictions] = useState<any>(null);

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
    async function loadPredictions() {
      const res = await fetch("/api/predictions");
      const data = await res.json();
      setPredictions(data);
    }

    loadPredictions();
    const interval = setInterval(loadPredictions, 9000);

    return () => clearInterval(interval);
  }, []);

  if (!gmv) {
    return (
      <div style={{ padding: 40, fontSize: 24 }}>
        Loading GMV...
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>TFarms GMV Dashboard</h1>
      <p style={styles.subtitle}>Live Marketplace Revenue Overview</p>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Monthly GMV</h2>
          <p style={styles.value}>${gmv.gmvMonthly.toLocaleString()}</p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Daily GMV</h2>
          <p style={styles.value}>${gmv.gmvDaily.toLocaleString()}</p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Active Vendors</h2>
          <p style={styles.value}>{gmv.vendors.toLocaleString()}</p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Active Buyers</h2>
          <p style={styles.value}>{gmv.buyers.toLocaleString()}</p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Average Order Value</h2>
          <p style={styles.value}>${gmv.aov.toLocaleString()}</p>
        </div>
      </div>

      <h2 style={styles.chartTitle}>Marketplace Predictions</h2>
      <div style={styles.predictionsBox}>
        {!predictions && (
          <p style={{ fontSize: "16px", color: "#555" }}>Loading predictions...</p>
        )}

        {predictions && (
          <div style={styles.predictionsGrid}>
            <div style={styles.predictionItem}>
              <strong>GMV Next Hour</strong>
              <span>${predictions.gmvNextHour.toLocaleString()}</span>
            </div>

            <div style={styles.predictionItem}>
              <strong>GMV Tomorrow</strong>
              <span>${predictions.gmvTomorrow.toLocaleString()}</span>
            </div>

            <div style={styles.predictionItem}>
              <strong>Buyer Momentum Forecast</strong>
              <span>{predictions.buyerMomentumForecast}</span>
            </div>

            <div style={styles.predictionItem}>
              <strong>Vendor Load Forecast</strong>
              <span>{predictions.vendorLoadForecast}</span>
            </div>

            <div style={styles.predictionItem}>
              <strong>Volatility Outlook</strong>
              <span>{predictions.volatilityOutlook}</span>
            </div>

            <div style={styles.predictionItem}>
              <strong>Liquidity Forecast</strong>
              <span>${predictions.liquidityForecast.toLocaleString()}</span>
            </div>

            <div style={styles.predictionItem}>
              <strong>Anomaly-Adjusted Risk</strong>
              <span>{predictions.anomalyAdjustedRisk}</span>
            </div>
          </div>
        )}
      </div>

      <h2 style={styles.chartTitle}>Weekly GMV Trend</h2>
      <div style={styles.chart}>
        {gmv.weekly.map((point: any, index: number) => (
          <div key={index} style={styles.chartBarContainer}>
            <div
              style={{
                ...styles.chartBar,
                height: `${point.value / 1500}px`,
              }}
            ></div>
            <p style={styles.chartLabel}>{point.day}</p>
          </div>
        ))}
      </div>

      <h2 style={styles.chartTitle}>Real-Time GMV Ticker</h2>
      <div style={styles.tickerBox}>
        <span>Live GMV:</span>
        <span>${ticker ? ticker.gmv.toLocaleString() : "—"}</span>
      </div>

      <button style={styles.ctaButton}>+ Add Crop Listing</button>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "900px",
    margin: "0 auto",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  card: {
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f5f5f5",
    textAlign: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  cardTitle: {
    fontSize: "18px",
    marginBottom: "10px",
  },
  value: {
    fontSize: "28px",
    fontWeight: "bold",
  },
  chartTitle: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  predictionsBox: {
    padding: "20px",
    backgroundColor: "#ede7f6",
    borderRadius: "10px",
    marginBottom: "40px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  predictionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "20px",
  },
  predictionItem: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "15px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    textAlign: "center",
    fontSize: "16px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  },
  chart: {
    display: "flex",
    alignItems: "flex-end",
    gap: "15px",
    height: "200px",
    marginBottom: "40px",
  },
  chartBarContainer: {
    textAlign: "center",
  },
  chartBar: {
    width: "30px",
    backgroundColor: "#4CAF50",
    borderRadius: "5px",
    transition: "height 0.3s ease",
  },
  chartLabel: {
    marginTop: "8px",
    fontSize: "14px",
  },
  tickerBox: {
    padding: "15px",
    backgroundColor: "#e8f5e9",
    borderRadius: "8px",
    marginBottom: "40px",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "20px",
    fontWeight: "bold",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  ctaButton: {
    padding: "15px 25px",
    fontSize: "18px",
    backgroundColor: "#2E7D32",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
