import React from "react";

export default function Header({ showBackButton, onBack }) {
  return (
    <div className="im-header">
      <div>
        <div className="im-eyebrow">SERIE A · 2026/27</div>
        <h1 className="im-title">GLI STADI</h1>
        <p className="im-subtitle">
          Clicca una regione per scoprire quali stadi di Serie A ospita.
        </p>
      </div>
      {showBackButton && (
        <button className="im-back-btn" onClick={onBack}>
          ← Tutte le regioni
        </button>
      )}
    </div>
  );
}
