import React from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import {
    DrawLineStringMode,
    DrawPolygonMode,
    ModifyMode,
    ViewMode
} from "nebula.gl";

export default function DrawToolbar({ setEditMode, exportGeoJson }) {
    return (
        <div style={{ marginBottom: 16 }}>
            <ButtonGroup variant="contained" color="primary">
                <Button onClick={() => setEditMode(() => DrawPolygonMode)}>Rysuj poligon</Button>
                <Button onClick={() => setEditMode(() => DrawLineStringMode)}>Rysuj linię</Button>
                <Button onClick={() => setEditMode(() => ModifyMode)}>Edycja</Button>
                <Button onClick={() => setEditMode(() => ViewMode)}>Podgląd</Button>
                <Button color="secondary" onClick={exportGeoJson}>Eksportuj GeoJSON</Button>
            </ButtonGroup>
        </div>
    );
}