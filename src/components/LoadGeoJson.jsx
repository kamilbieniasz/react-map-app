import React, { useState } from "react";
import { TextField, Button, MenuItem } from "@material-ui/core";

const EXAMPLE_URLS = [
    {
        label: "Granice Państw (github)",
        url: "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson",
    },
    {
        label: "Nowy Jork dzielnice (github)",
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
            if (!res.ok) throw new Error(`Nie można pobrać pliku: ${res.statusText}`);
            const data = await res.json();
            if (data.type !== "FeatureCollection") throw new Error("To nie jest poprawny GeoJSON FeatureCollection");
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
                label="Przykład"
                onChange={e => setUrl(e.target.value)}
                style={{ minWidth: 220 }}
                size="small"
            >
                <MenuItem value="">(Wybierz przykład...)</MenuItem>
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
                {loading ? "Ładowanie..." : "Wczytaj GeoJSON"}
            </Button>
            {error && (
                <span style={{ color: "red", marginLeft: 8 }}>{error}</span>
            )}
        </div>
    );
}