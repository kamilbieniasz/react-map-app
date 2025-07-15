import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Checkbox } from "@material-ui/core";

export default function GeoJsonTable({ geoJson, selectedFeatureIds, setSelectedFeatureIds }) {
    if (!geoJson || !geoJson.features || geoJson.features.length === 0) return null;

    const propertyKeys = Object.keys(geoJson.features[0]?.geometry || {});
    const handleSelect = id => {
        if (!setSelectedFeatureIds) return;
        const selected = selectedFeatureIds || [];
        if (selected.includes(id)) {
            setSelectedFeatureIds(selected.filter(sel => sel !== id));
        } else {
            setSelectedFeatureIds([...selected, id]);
        }
    };

    return (
        <div style={{ maxWidth: "100%", overflowX: "auto" }}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        {propertyKeys.map(key => (
                            <TableCell key={key}>{key}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {geoJson.features.map((feature, idx) => {
                        const id = feature.id || idx;
                        return (
                            <TableRow key={id} selected={selectedFeatureIds?.includes(id)}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedFeatureIds?.includes(id) || false}
                                        onChange={() => handleSelect(id)}
                                    />
                                </TableCell>
                                {propertyKeys.map(key => (
                                    <TableCell key={key}>{feature.geometry[key] || ""}</TableCell>
                                ))}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}