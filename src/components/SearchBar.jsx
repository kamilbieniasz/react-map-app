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
            <form onSubmit={async e => {
                e.preventDefault();
                await handleSearch();
            }}>
                <TextField
                    label="Search for a place or coordinates"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    size="small"
                    style={{ marginRight: 8, width: "400px" }}
                />
                <Button variant="outlined" type="submit">
                    Search
                </Button>
            </form>
        </div>
    );
}