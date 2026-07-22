import React, { useMemo, useState } from "react";
import Header from "./components/Header";
import ItalyMap from "./components/ItalyMap";
import StadiumPanel from "./components/StadiumPanel";
import { REGIONS_GEOJSON } from "./data/regionsGeojson";
import { STADIUMS, REGION_NAME_OVERRIDES } from "./data/stadiums";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./styles.css";

export default function App() {
  const [selectedRegion, setSelectedRegion] = useState(null); // reg_istat_code_num
  const [selectedStadium, setSelectedStadium] = useState(null); // stadium id
  const [hoveredRegion, setHoveredRegion] = useState(null);

  const stadiumsByRegion = useMemo(() => {
    const m = {};
    STADIUMS.forEach((s) => {
      if (!m[s.regionCode]) m[s.regionCode] = [];
      m[s.regionCode].push(s);
    });
    return m;
  }, []);

  const selectedRegionName = useMemo(() => {
    if (selectedRegion == null) return null;
    const feat = REGIONS_GEOJSON.features.find(
      (f) => f.properties.reg_istat_code_num === selectedRegion,
    );
    if (!feat) return null;
    return (
      REGION_NAME_OVERRIDES[feat.properties.reg_name] ||
      feat.properties.reg_name
    );
  }, [selectedRegion]);

  const activeStadium = useMemo(
    () => STADIUMS.find((s) => s.id === selectedStadium) || null,
    [selectedStadium],
  );

  const handleRegionClick = (code) => {
    setSelectedStadium(null);
    setSelectedRegion((prev) => (prev === code ? null : code));
  };

  const handleMarkerClick = (stadium) => {
    if (selectedRegion !== stadium.regionCode)
      setSelectedRegion(stadium.regionCode);
    setSelectedStadium(stadium.id);
  };

  const goBack = () => {
    setSelectedRegion(null);
    setSelectedStadium(null);
  };

  const closePanel = () => setSelectedStadium(null);

  return (
    <div className="im-root">
      <div className="im-shell">
        <div className="im-map-col">
          <Header showBackButton={selectedRegion != null} onBack={goBack} />

          <ItalyMap
            selectedRegion={selectedRegion}
            selectedStadium={selectedStadium}
            hoveredRegion={hoveredRegion}
            stadiumsByRegion={stadiumsByRegion}
            selectedRegionName={selectedRegionName}
            onRegionClick={handleRegionClick}
            onRegionHover={setHoveredRegion}
            onMarkerClick={handleMarkerClick}
          />
          <div className="im-footer">
            <p>Made with Passion by Lorenzo</p>
            <a href="https://github.com/spasaLor" target="_blank">
              <FaGithub color="var(--text-muted)" />
            </a>
            <a
              href="https://www.linkedin.com/in/lorenzo-spadaro/"
              target="_blank"
            >
              <FaLinkedin color="var(--text-muted)" />
            </a>
          </div>
        </div>

        <div className="im-panel">
          <StadiumPanel
            stadium={activeStadium}
            regionName={selectedRegionName}
            onClose={closePanel}
          />
        </div>
      </div>
    </div>
  );
}
