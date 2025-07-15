import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import MapView from "./components/MapView";
import GeoJsonTable from "./components/GeoJsonTable";
import SearchBar from "./components/SearchBar";
import ViewToggle from "./components/ViewToggle";
import DrawToolbar from "./components/DrawToolbar";
import useGeoJson from "./hooks/useGeoJson";
import { exportGeoJson } from "./utils/geojson";
import {ViewMode} from "nebula.gl";
import "./App.css";
import LoadGeoJson from "./components/LoadGeoJson";

export default function App() {
    const [mapCenter, setMapCenter] = useState([19.945, 50.0647]);
    const [editMode, setEditMode] = useState(() => ViewMode);

    const {
        geoJson,
        setGeoJson,
        selectedFeatureIds,
        setSelectedFeatureIds,
        updateFeature,
        deleteFeature
    } = useGeoJson();

    const handleSetCenter = (coords) => setMapCenter(coords);
    const handleExportGeoJson = () => exportGeoJson(geoJson);

    return (
        <Router>
            <div style={{ padding: 16 }}>
                <LoadGeoJson onLoad={setGeoJson} />
                <SearchBar setCenter={handleSetCenter} />
                <ViewToggle />
                <DrawToolbar
                    setEditMode={setEditMode}
                    exportGeoJson={handleExportGeoJson}
                />
            </div>

            <Switch>
                <Route
                    path="/map"
                    render={() => (
                        <MapView
                            geoJson={geoJson}
                            setGeoJson={setGeoJson}
                            editMode={editMode}
                            selectedFeatureIds={selectedFeatureIds}
                            setSelectedFeatureIds={setSelectedFeatureIds}
                            updateFeature={updateFeature}
                            deleteFeature={deleteFeature}
                            mapCenter={mapCenter}
                        />
                    )}
                />
                <Route
                    path="/table"
                    render={() => (
                        <GeoJsonTable
                            geoJson={geoJson}
                            selectedFeatureIds={selectedFeatureIds}
                            setSelectedFeatureIds={setSelectedFeatureIds}
                        />
                    )}
                />
                <Redirect to="/map" />
            </Switch>
        </Router>
    );
}