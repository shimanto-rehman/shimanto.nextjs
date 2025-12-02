"use client";
import React from "react";
import ColorBends from "./components/ColorBends";
import Prism from "./components/Prism";

export default function HomePage() {
  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        color: "white",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
      }}
    >
      {/* Fixed ColorBends Background */}
      <div style={{position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0}}>
        <ColorBends />
      </div>
      <div style={{ width: '100%', height: '100vh', position: 'fixed'}}>
        <Prism animationType="rotate" timeScale={0.5} height={3.5} baseWidth={5.5} scale={3.6} hueShift={0} colorFrequency={1} noise={0.1} glow={1}/>
      </div>
      <section style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "2rem", textAlign: "center"}} >
        <h1 style={{ fontSize: "2.4rem", marginBottom: "1rem" }}>
          Shimanto Rehman
        </h1>
        <p style={{ fontSize: "1.0rem", opacity: 0.9 }}>
          Beautiful animated background with Three.js
        </p>
      </section>
    </main>
  );
}