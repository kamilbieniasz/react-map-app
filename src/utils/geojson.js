export function exportGeoJson(geoJson) {
    const blob = new Blob([JSON.stringify(geoJson, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.geojson";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}