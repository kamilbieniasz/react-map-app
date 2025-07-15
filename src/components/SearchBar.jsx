import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { geocode } from "../utils/geocoding";

export default function SearchBar({ setCenter }) {
    const [query, setQuery] = useState("");

    const handleSearch = async () => {
        const result = await geocode(query);
        if (result) {
            setCenter([result.lon, result.lat]);
        }
    };

    return (
        <div style={{ marginBottom: 16 }}>
            <TextField
                label="Wyszukaj miejsce lub współrzędne"
                value={query}
                onChange={e => setQuery(e.target.value)}
                size="small"
                style={{ marginRight: 8, width: "400px" }}
            />
            <Button variant="outlined" onClick={handleSearch}>
                Szukaj
            </Button>
        </div>
    );
}