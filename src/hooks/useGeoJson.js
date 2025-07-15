import { useState } from "react";

function generateId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
}

export default function useGeoJson() {
    const [geoJson, setGeoJson] = useState({ type: "FeatureCollection", features: [] });
    const [selectedFeatureIds, setSelectedFeatureIds] = useState([]);

    const addFeature = (geometryType) => {
        const newFeature = {
            type: "Feature",
            id: generateId(),
            properties: {},
            geometry: { type: geometryType, coordinates: [] }
        };
        setGeoJson(prev => ({
            ...prev,
            features: [...prev.features, newFeature]
        }));
    };

    const updateFeature = (id, newFeature) => {
        setGeoJson(prev => ({
            ...prev,
            features: prev.features.map(f =>
                f.id === id ? { ...newFeature, id } : f
            )
        }));
    };

    const deleteFeature = (id) => {
        setGeoJson(prev => ({
            ...prev,
            features: prev.features.filter(f => f.id !== id)
        }));
        setSelectedFeatureIds(selected => selected.filter(selId => selId !== id));
    };

    return {
        geoJson, setGeoJson, selectedFeatureIds, setSelectedFeatureIds,
        addFeature, updateFeature, deleteFeature
    };
}