"use client";

import React, { useEffect, useState } from "react";

export default function GMVDashboard() {
  const [gmv, setGmv] = useState<any>(null);
  const [ticker, setTicker] = useState<any>(null);
  const [health, setHealth] = useState<any>(null);

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
    async function loadHealth() {
      const res = await fetch("/api/health");
      const data = await res.json();
      setHealth(data);
    }

    loadHealth();
    const interval = setInterval(loadHealth, 9000);

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

      <h2 style={styles.chartTitle}>Marketplace Health Summary</h2>
      <div style={styles.healthBox}>
        {!health && (
          <p style={{ fontSize: "16px", color: "#555" }}>Loading marketplace health...</p>
        )}

        {health && (
          <div style={styles.healthGrid}>
            <div style={styles.healthItem}>
              <strong>Overall Score</strong>
              <span>{health.overallScore}</span>
            </div>

            <div style={styles.healthItem}>
              <strong>Risk</strong>
              <span>{health.riskLevel}</span>
            </div>

            <div style={styles.healthItem}>
              <strong>GMV Trend</strong>
              <span>{health.gmvTrend}</span>
            </div>

            <div style={styles.healthItem}>
              <strong>Liquidity</strong>
              <span>{health.liquidityState}</span>
            </div>

            <div style={styles.healthItem}>
              <strong>Vendor Stability</strong>
              <span>{health.vendorStability}</span>
            </div>

            <div style={styles.healthItem}>
              <strong>Buyer Confidence</strong>
              <span>{health.buyerConfidence}</span>
            </div>

            <div style={styles.healthItem}>
              <strong>Volatility Pressure</strong>
              <span>{health.volatilityPressure}</span>
            </div>

            <div style={styles.healthItem}>
              <strong>Forecast Confidence</strong>
              <span>{health.forecastConfidence}</span>
            </div>
          </div>
        )}
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
  healthBox: {
    padding: "20px",
    backgroundColor: "#f3e5f5",
    borderRadius: "10px",
    marginBottom: "40px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  healthGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "20px",
  },
  healthItem: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "center",
    fontSize: "16px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
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
