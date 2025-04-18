/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */

export async function searchAddress(
  query: string,
  callback: (results: any[]) => void
): Promise<void> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    const results = data ?? []; // Nominatim returns an array directly
    callback(results);
  } catch (error) {
    console.error('Geocoding search error:', error);
    callback([]);
  }
}