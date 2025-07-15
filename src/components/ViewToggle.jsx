import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { Link, useLocation } from "react-router-dom";

export default function ViewToggle() {
    const location = useLocation();

    return (
        <ToggleButtonGroup
            value={location.pathname}
            exclusive
            style={{ marginBottom: 16 }}
        >
            <ToggleButton value="/map" component={Link} to="/map">
                Mapa
            </ToggleButton>
            <ToggleButton value="/table" component={Link} to="/table">
                Tabela
            </ToggleButton>
        </ToggleButtonGroup>
    );
}