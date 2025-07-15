const BASE_URL = 'https://nominatim.openstreetmap.org';

export async function geocode(query) {
    const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}&format=json`);
    const data = await response.json();
    if (data && data.length > 0) {
        return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    }
    return null;
}