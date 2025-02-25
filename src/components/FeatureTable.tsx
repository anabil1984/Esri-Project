import React from "react";
import { FeatureResult } from "../types";

interface FeatureTableProps {
  features: FeatureResult[];
  onZoom: (feature: FeatureResult) => void;
}

export const FeatureTable: React.FC<FeatureTableProps> = ({ features, onZoom }) => (
  <div
    style={{
      position: "absolute",
      bottom: "60px",
      left: "10px",
      background: "rgba(0, 0, 0, 0.8)",
      color: "white",
      padding: "10px",
      maxHeight: "200px",
      overflowY: "auto",
      zIndex: 1,
    }}
  >
    <h4>Features within 1 km</h4>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Layer</th>
          <th>Name/ID</th>
          <th>Zoom</th>
        </tr>
      </thead>
      <tbody>
        {features.map((feature, index) => (
          <tr key={index}>
            <td>{feature.layerTitle}</td>
            <td>{feature.attributes?.NAME || feature.attributes?.OBJECTID || "N/A"}</td>
            <td>
              <button onClick={() => onZoom(feature)}>Zoom</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);