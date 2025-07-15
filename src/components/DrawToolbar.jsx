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
                <Button onClick={() => setEditMode(() => DrawPolygonMode)}>Draw polygon</Button>
                <Button onClick={() => setEditMode(() => DrawLineStringMode)}>Draw linestring</Button>
                <Button onClick={() => setEditMode(() => ModifyMode)}>Edit</Button>
                <Button onClick={() => setEditMode(() => ViewMode)}>View</Button>
                <Button color="secondary" onClick={exportGeoJson}>Export GeoJSON</Button>
            </ButtonGroup>
        </div>
    );
}