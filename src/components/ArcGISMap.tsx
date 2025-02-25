import React from "react";
import "@arcgis/core/assets/esri/themes/dark/main.css";
import { useMap } from "../hooks/useMap";
import { FeatureTable } from "./FeatureTable";

export const ArcGISMap: React.FC = () => {
  const { mapRef, view, coords, bufferFeatures, zoomToFeature } = useMap();

  return (
    <div style={{ position: "relative" }}>
      <div style={{ height: "100vh", width: "100%" }} ref={mapRef} />
      
      {coords && (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "10px",
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "5px 10px",
            borderRadius: "3px",
            zIndex: 1,
            marginLeft: 30,
          }}
        >
          Lat: {coords.lat.toFixed(3)}, Lon: {coords.lon.toFixed(3)}
        </div>
      )}
      {bufferFeatures.length > 0 && (
        <FeatureTable features={bufferFeatures} onZoom={zoomToFeature} />
      )}
    </div>
  );
};