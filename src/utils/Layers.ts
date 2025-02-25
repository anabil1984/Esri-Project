import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

export const createLayers = (): FeatureLayer[] => [
//     // Polygons
//   new FeatureLayer({
//     url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3",
//     title: "Census Polygons",
//     popupTemplate: { title: "population statistics from Census 2000", 
//         content: "STATE_NAME: {STATE_NAME}, POP2000: {POP2000}, POP2007:{POP2007}" },
//   }),
//   // Lines
//   new FeatureLayer({
//     url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
//     title: "Trails",
//     popupTemplate: { title: "Trails", 
//         content: "TRAIL_NAME : {TRL_NAME }, LENGTH_MI : {LENGTH_MI}" },

//   }),
  // Points
  new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
    title: "Trailheads",
    popupTemplate: { title: "Trailheads", 
        content: "TRAIL_NAME : {TRL_NAME }, PARK_NAME  : {PARK_NAME }" },

  }),
];