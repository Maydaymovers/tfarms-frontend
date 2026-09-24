"use client";

import React, { useEffect, useState } from "react";

export default function GMVDashboard() {
  const [gmv, setGmv] = useState<any>(null);
  const [ticker, setTicker] = useState<any>(null);

  // NEW: Unified telemetry state
  const [conditions, setConditions] = useState<any>(null);
  const [telemetry, setTelemetry] = useState<any>(null);

  // Load GMV
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/gmv");
      const data = await res.json();
      setGmv(data);
    }
    load();
  }, []);

  // Load GMV ticker
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

  // NEW: Load marketplace conditions
  useEffect(() => {
    async function loadConditions() {
      const res = await fetch("/api/conditions");
      const data = await res.json();
      setConditions(data);
    }

    loadConditions();
    const interval = setInterval(loadConditions, 5000);
    return () => clearInterval(interval);
  }, []);

  // NEW: Unified telemetry band fetch
  useEffect(() => {
    async function loadTelemetry() {
      const resConditions = await fetch("/api/conditions");
      const resPulse = await fetch("/api/pulse");
      const resTicker = await fetch("/api/gmv/ticker");

      const conditionsData = await resConditions.json();
      const pulseData = await resPulse.json();
      const tickerData = await resTicker.json();

      setTelemetry({
        heatIndex: conditionsData.heatIndex,
        volatility: conditionsData.volatility,
        liquidity: conditionsData.liquidity,
        demandPressure: conditionsData.demandPressure,
        recentOrders: pulseData.recentOrders,
        recentPayouts: pulseData.recentPayouts,
        activeVendors: pulseData.activeVendors,
        activeBuyers: pulseData.activeBuyers,
        gmv: tickerData.gmv,
        timestamp: Date.now(),
      });
    }

    loadTelemetry();
    const interval = setInterval(loadTelemetry, 5000);
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

      {/* ⭐ NEW: Unified Marketplace Telemetry Band */}
      <h2 style={styles.chartTitle}>Marketplace Telemetry</h2>
      <div style={styles.telemetryBand}>
        <div style={styles.telemetryItem}>
          <span>GMV</span>
          <span>{telemetry ? "$" + telemetry.gmv.toLocaleString() : "—"}</span>
        </div>

        <div style={styles.telemetryItem}>
          <span>Heat</span>
          <span>{telemetry ? telemetry.heatIndex : "—"}</span>
        </div>

        <div style={styles.telemetryItem}>
          <span>Volatility</span>
          <span>{telemetry ? telemetry.volatility + "%" : "—"}</span>
        </div>

        <div style={styles.telemetryItem}>
          <span>Liquidity</span>
          <span>
            {telemetry ? "$" + telemetry.liquidity.toLocaleString() : "—"}
          </span>
        </div>

        <div style={styles.telemetryItem}>
          <span>Orders (5s)</span>
          <span>{telemetry ? telemetry.recentOrders : "—"}</span>
        </div>

        <div style={styles.telemetryItem}>
          <span>Payouts (5s)</span>
          <span>{telemetry ? telemetry.recentPayouts : "—"}</span>
        </div>

        <div style={styles.telemetryItem}>
          <span>Active Vendors</span>
          <span>
            {telemetry ? telemetry.activeVendors.toLocaleString() : "—"}
          </span>
        </div>

        <div style={styles.telemetryItem}>
          <span>Active Buyers</span>
          <span>
            {telemetry ? telemetry.activeBuyers.toLocaleString() : "—"}
          </span>
        </div>
      </div>

      {/* Existing GMV cards */}
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

      {/* Weekly GMV */}
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

      {/* GMV ticker */}
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

  /* ⭐ NEW: Telemetry Band Styles */
  telemetryBand: {
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
    gap: "15px",
    padding: "20px",
    backgroundColor: "#e8f5e9",
    borderRadius: "10px",
    marginBottom: "40px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  telemetryItem: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "bold",
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
