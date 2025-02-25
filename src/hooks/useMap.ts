import { useEffect, useRef, useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import LayerList from "@arcgis/core/widgets/LayerList";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine";
import Graphic from "@arcgis/core/Graphic";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol"; // Import the symbol class
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { FeatureResult } from "../types";
import { createLayers } from "../utils/Layers";
import { initializeWidgets } from "../utils/Widgets";

export const useMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<MapView | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [bufferFeatures, setBufferFeatures] = useState<FeatureResult[]>([]);
  const layersRef = useRef<ReturnType<typeof createLayers>>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({ basemap: "streets-vector" });
    const mapView = new MapView({
      container: mapRef.current,
      map,
      center: [31, 30],
      zoom: 4,
    });


    
    mapView.when(() => {
      setView(mapView);
      initializeWidgets(mapView);
      layersRef.current = createLayers();
      map.addMany(layersRef.current);
      const layerListWidget = new LayerList({ view: mapView });
      mapView.ui.add(layerListWidget, "top-right");

      // Click event and Buffer 
      mapView.on("click", async (event) => {
        const point = event.mapPoint;
        setCoords({ lat: point.latitude, lon: point.longitude });

        const buffer = geometryEngine.buffer(point, 1000, "meters") as any;

        const pointsLayer = layersRef.current.find(
          (layer) => layer.title === "Trailheads"
        ) as FeatureLayer;

        if (!pointsLayer) {
          console.warn("Trailheads layer not found");
          setBufferFeatures([]);
          return;
        }

        const query = pointsLayer.createQuery();
        query.geometry = buffer;
        query.spatialRelationship = "intersects";
        query.returnGeometry = true;
        const result = await pointsLayer.queryFeatures(query);

        const features = result.features.map((feature) => ({
          layerTitle: pointsLayer.title || "Trailheads",
          attributes: feature.attributes,
          geometry: feature.geometry,
        }));

        setBufferFeatures(features);
      });
    });

    return () => {
      mapView.destroy();
    };
  }, []);

  const zoomToFeature = (feature: FeatureResult) => {
    if (!view) return;

    // Zoom to the feature
    view.goTo(feature.geometry);
    console.log("Zooming to feature geometry:", feature.geometry);
    // Highlight the point feature using SimpleMarkerSymbol
    const highlightGraphic = new Graphic({
      geometry: feature.geometry,
      symbol: new SimpleMarkerSymbol({
        color: "green", 
        size: "20",
        outline: {
          color: "white",
          width: 1,
        },
      }),
    });
    // Clear previous highlights and add the new one
    view.graphics.removeAll();
    view.graphics.add(highlightGraphic);
  };

  return { mapRef, view, coords, bufferFeatures, zoomToFeature };
};