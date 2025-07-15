import React, { useState } from "react";
import { TextField, Button, MenuItem } from "@material-ui/core";

const EXAMPLE_URLS = [
    {
        label: "Country borders (github)",
        url: "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson",
    },
    {
        label: "New york boroughs (github)",
        url: "https://raw.githubusercontent.com/dwillis/nyc-maps/master/boroughs.geojson",
    }
];

export default function LoadGeoJson({ onLoad }) {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLoad = async () => {
        setError("");
        setLoading(true);
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Cannot load GeoJSON: ${res.statusText}`);
            }
            const data = await res.json();
            if (data.type !== "FeatureCollection") {
                throw new Error("Invalid GeoJSON");
            }
            onLoad(data);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    return (
        <div style={{ marginBottom: 16, display: "flex", gap: 8, alignItems: "center" }}>
            <TextField
                label="GeoJSON URL"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://example.com/my.geojson"
                style={{ minWidth: 320 }}
                size="small"
            />
            <TextField
                select
                value={url}
                label="Examples"
                onChange={e => setUrl(e.target.value)}
                style={{ minWidth: 220 }}
                size="small"
            >
                <MenuItem value="">(Select GeoJSON URL...)</MenuItem>
                {EXAMPLE_URLS.map(opt => (
                    <MenuItem key={opt.url} value={opt.url}>{opt.label}</MenuItem>
                ))}
            </TextField>
            <Button
                variant="contained"
                color="primary"
                onClick={handleLoad}
                disabled={loading || !url}
            >
                {loading ? "Loading..." : "Load GeoJSON"}
            </Button>
            {error && (
                <span style={{ color: "red", marginLeft: 8 }}>{error}</span>
            )}
        </div>
    );
}