import React from "react";
import DeckGL from "@deck.gl/react";
import MapGL from "react-map-gl";
import maplibregl from "maplibre-gl";
import {EditableGeoJsonLayer, ModifyMode, ViewMode} from "nebula.gl";

export default function MapView({ geoJson, setGeoJson, editMode, mapCenter, selectedFeatureIds, setSelectedFeatureIds }) {
    const layers = [
        new EditableGeoJsonLayer({
            id: "geojson-layer",
            data: geoJson,
            mode: editMode,
            selectedFeatureIndexes: selectedFeatureIds,
            setSelectedFeatureIds,
            onClick: info => {
                if ((editMode === ViewMode || editMode === ModifyMode) && info.index >= 0) {
                    setSelectedFeatureIds([info.index]);
                }
            },
            onEdit: ({ updatedData }) => {
                setGeoJson(updatedData);
            },
            pickable: true,
            getFillColor: editMode === ViewMode ? [120, 120, 120, 50] : [0, 120, 255, 80],
            getLineColor: (feature) => {
                const index = geoJson.features.indexOf(feature);
                return selectedFeatureIds.includes(index)
                    ? [255, 0, 0, 255]
                    : [0, 120, 255, 200]
            },

            getLineWidth: 2
        })
    ];

    return (
        <div style={{ position: "relative", height: "70dvh" }}>
            <DeckGL
                initialViewState={{
                    longitude: mapCenter[0],
                    latitude: mapCenter[1],
                    zoom: 12
                }}
                controller={true}
                layers={layers}
                style={{ width: "100%", zIndex: 1 }}
            >
                <MapGL
                    mapLib={maplibregl}
                    mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
                    style={{ width: "100%", height: "100%" }}
                />
            </DeckGL>
        </div>
    );
}