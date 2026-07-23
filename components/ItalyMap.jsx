import React, { useMemo } from "react";
import * as d3 from "d3";
import { REGIONS_GEOJSON } from "../data/regionsGeojson";
import { REGION_NAME_OVERRIDES } from "../data/stadiums";
import {
  MAP_WIDTH as W,
  MAP_HEIGHT as H,
  EXPLODE_FACTOR as EXPLODE,
} from "../constants";

export default function ItalyMap({
  selectedRegion,
  selectedStadium,
  hoveredRegion,
  stadiumsByRegion,
  selectedRegionName,
  onRegionClick,
  onRegionHover,
  onMarkerClick,
}) {
  const { projection, path, features, centers } = useMemo(() => {
    const proj = d3.geoMercator().fitExtent(
      [
        [24, 24],
        [W - 24, H - 24],
      ],
      REGIONS_GEOJSON,
    );
    const p = d3.geoPath(proj);
    const feats = REGIONS_GEOJSON.features;
    const cents = {};
    feats.forEach((f) => {
      cents[f.properties.reg_istat_code_num] = p.centroid(f);
    });
    return { projection: proj, path: p, features: feats, centers: cents };
  }, []);

  const mapCenter = [W / 2, H / 2];

  const offsets = useMemo(() => {
    const o = {};
    Object.entries(centers).forEach(([code, c]) => {
      o[code] = [
        (c[0] - mapCenter[0]) * EXPLODE,
        (c[1] - mapCenter[1]) * EXPLODE,
      ];
    });
    return o;
  }, [centers]);

  const zoomTransform = useMemo(() => {
    if (selectedRegion == null) return { scale: 1, x: 0, y: 0 };
    const feat = features.find(
      (f) => f.properties.reg_istat_code_num === selectedRegion,
    );
    if (!feat) return { scale: 1, x: 0, y: 0 };
    const [[x0, y0], [x1, y1]] = path.bounds(feat);
    const [dx, dy] = offsets[selectedRegion];
    const cx = (x0 + x1) / 2 + dx;
    const cy = (y0 + y1) / 2 + dy;
    const bw = Math.max(x1 - x0, 1);
    const bh = Math.max(y1 - y0, 1);
    let scale = Math.min((W * 0.72) / bw, (H * 0.72) / bh);
    scale = Math.min(Math.max(scale, 1.6), 6.5);
    const x = W / 2 - scale * cx;
    const y = H / 2 - scale * cy;
    return { scale, x, y };
  }, [selectedRegion, features, path, offsets]);

  const regionHasTeams = (code) => !!stadiumsByRegion[code];

  return (
    <div className="im-svg-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
        <g
          style={{
            transform: `translate(${zoomTransform.x}px, ${zoomTransform.y}px) scale(${zoomTransform.scale})`,
            transformOrigin: "0 0",
            transition: "transform 850ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {features.map((f) => {
            const code = f.properties.reg_istat_code_num;
            const [dx, dy] = offsets[code];
            const isActive = selectedRegion === code;
            const isDimmed = selectedRegion != null && !isActive;
            const name =
              REGION_NAME_OVERRIDES[f.properties.reg_name] ||
              f.properties.reg_name;
            const hasTeams = regionHasTeams(code);
            const [lx, ly] = centers[code];
            const teams = stadiumsByRegion[code];

            return (
              <g
                key={code}
                transform={`translate(${dx},${dy})`}
                className="region-shadow-group"
              >
                <path
                  d={path(f)}
                  className={`region-path ${isActive ? "active" : ""} ${isDimmed ? "dimmed" : ""}`}
                  onClick={() => onRegionClick(code)}
                  onMouseEnter={() => onRegionHover(code)}
                  onMouseLeave={() => onRegionHover(null)}
                />
                {selectedRegion == null && (
                  <text
                    x={lx}
                    y={ly}
                    className={`region-label ${hasTeams ? "has-team" : ""}`}
                  >
                    {name}
                  </text>
                )}

                {teams &&
                  teams.map((s) => {
                    const [mx, my] = projection(s.coord);
                    const visible = isActive;
                    return (
                      <g
                        key={s.id}
                        style={{
                          opacity: visible ? 1 : 0,
                          transition: "opacity 400ms ease 200ms",
                          pointerEvents: visible ? "auto" : "none",
                        }}
                      >
                        <circle
                          cx={mx}
                          cy={my}
                          r={5}
                          className={`marker-dot ${selectedStadium === s.id ? "selected" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onMarkerClick(s);
                          }}
                        />
                      </g>
                    );
                  })}
              </g>
            );
          })}
        </g>
      </svg>

      {selectedRegion != null && !stadiumsByRegion[selectedRegion] && (
        <div className="im-empty-overlay">
          <div className="im-empty-overlay-box">
            Nessuno stadio di Serie A in {selectedRegionName} in questa
            stagione.
          </div>
        </div>
      )}

      {hoveredRegion != null && selectedRegion == null && (
        <div className="im-hover-tag">
          {stadiumsByRegion[hoveredRegion]
            ? `${stadiumsByRegion[hoveredRegion].length} ${stadiumsByRegion[hoveredRegion].length === 1 ? "squadra" : "squadre"} di Serie A`
            : "Nessuna squadra in Serie A"}
        </div>
      )}
    </div>
  );
}
