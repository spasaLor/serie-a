import React from "react";
import StadiumPlaceholderImage from "./StadiumPlaceholderImage";

function StadiumIcon({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <ellipse cx="20" cy="26" rx="16" ry="6" className="stadium-icon-line" />
      <path d="M4 26 L4 18 Q20 8 36 18 L36 26" className="stadium-icon-line" />
      <line x1="4" y1="18" x2="4" y2="26" className="stadium-icon-line" />
      <line x1="36" y1="18" x2="36" y2="26" className="stadium-icon-line" />
    </svg>
  );
}

function EmptyPanelState() {
  return (
    <div className="im-empty-state">
      <div style={{ opacity: 0.55, marginBottom: 16 }}>
        <StadiumIcon size={56} />
      </div>
      <div className="im-empty-title">Nessuno stadio selezionato</div>
      <p className="im-empty-sub">
        Seleziona una regione sulla mappa, poi clicca su un pallino per aprire
        la scheda dello stadio.
      </p>
    </div>
  );
}

export default function StadiumPanel({ stadium, regionName, onClose }) {
  if (!stadium) return <EmptyPanelState />;

  return (
    <div key={stadium.id} className="im-panel-inner panel-enter">
      <div className="im-panel-hero">
        {stadium.imageUrl ? (
          <img
            src={stadium.imageUrl}
            alt={stadium.stadium}
            className="im-panel-hero-img"
          />
        ) : (
          <StadiumPlaceholderImage />
        )}
        <div className="im-panel-hero-fade" />
        <button
          className="im-close-btn"
          onClick={onClose}
          aria-label="Chiudi scheda stadio"
        >
          ✕
        </button>
        <div className="im-panel-hero-title-wrap">
          <h2 className="im-panel-hero-title">{stadium.stadium}</h2>
          <div className="im-panel-meta">
            {stadium.team} · {stadium.city.toUpperCase()}
          </div>
        </div>
      </div>

      <div className="im-panel-body">
        <div className="im-stats-grid">
          <div className="im-stat-box">
            <div className="im-stat-label">CAPIENZA</div>
            <div className="im-stat-value">{stadium.capacity}</div>
          </div>
          <div className="im-stat-box">
            <div className="im-stat-label">INAUGURATO</div>
            <div className="im-stat-value">{stadium.built}</div>
          </div>
          <div className="im-stat-box">
            <div className="im-stat-label">SUPERFICIE</div>
            <div className="im-stat-value">{stadium.surface}</div>
          </div>
          <div className="im-stat-box">
            <div className="im-stat-label">DIMENSIONI</div>
            <div className="im-stat-value">{stadium.dimensions}</div>
          </div>
        </div>

        <div className="im-fact-box">
          <div className="im-stat-label">QUALCOSA IN PIÙ</div>
          <p className="im-fact-text">{stadium.fact}</p>
        </div>

        <div className="im-info-grid">
          <div className="im-info-box">
            <b>
              Mappa <span>&#8599;</span>
            </b>
          </div>
          <div className="im-info-box">
            <b>
              Indicazioni <span>&#8599;</span>
            </b>
          </div>
        </div>
      </div>
    </div>
  );
}
