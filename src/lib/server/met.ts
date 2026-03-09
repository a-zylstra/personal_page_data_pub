import type { MediumCount, MetObject, MetSearchResponse } from '$lib/types/met';

const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array];
  shuffled.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Met API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export async function searchObjectIds(query: string): Promise<number[]> {
  const data = await fetchJson<MetSearchResponse>(
    `${BASE_URL}/search?hasImages=true&q=${encodeURIComponent(query)}`
  );

  return data.objectIDs ?? [];
}

export async function fetchObject(objectId: number): Promise<MetObject> {
  return fetchJson<MetObject>(`${BASE_URL}/objects/${objectId}`);
}

export async function fetchFeaturedObjects(query: string, count: number): Promise<MetObject[]> {
  const ids = await searchObjectIds(query);

  if (ids.length === 0) {
    return [];
  }

  const randomIds = getRandomItems(ids, Math.min(ids.length, 20));
  const objects: MetObject[] = [];

  for (const id of randomIds) {
    try {
      const object = await fetchObject(id);

      if (object.primaryImageSmall || object.primaryImage) {
        objects.push(object);
      }

      if (objects.length >= count) {
        break;
      }
    } catch (error) {
      console.error(`Failed to fetch object ${id}`, error);
    }
  }

  return objects;
}

export async function fetchKoreanArtObjects(limit = 40): Promise<MetObject[]> {
  const data = await fetchJson<MetSearchResponse>(
    `${BASE_URL}/search?artistOrCulture=true&hasImages=true&q=${encodeURIComponent('korean')}`
  );

  const ids = data.objectIDs ?? [];
  const selectedIds = ids.slice(0, limit * 3);

  const objects = await Promise.all(
    selectedIds.map(async (id) => {
      try {
        return await fetchObject(id);
      } catch (error) {
        console.error(`Failed to fetch object ${id}`, error);
        return null;
      }
    })
  );

  return objects
    .filter((obj): obj is MetObject => {
      if (!obj || !(obj.primaryImageSmall || obj.primaryImage)) {
        return false;
      }

      const nationality = obj.artistNationality?.toLowerCase() ?? '';
      const culture = obj.culture?.toLowerCase() ?? '';
      const artist = obj.artistDisplayName?.toLowerCase() ?? '';
      const title = obj.title?.toLowerCase() ?? '';

      return (
        nationality.includes('korea') ||
        culture.includes('korea') ||
        artist.includes('korea') ||
        title.includes('korea')
      );
    })
    .slice(0, limit);
}

function normalizeMedium(medium: string): string {
  const value = medium?.trim();

  if (!value) return 'Unknown';

  if (value.toLowerCase().includes('oil on canvas')) return 'Oil on canvas';
  if (value.toLowerCase().includes('hanging scroll')) return 'Hanging scroll';
  if (value.toLowerCase().includes('album leaf')) return 'Album leaf';
  if (value.toLowerCase().includes('ceramic')) return 'Ceramic';
  if (value.toLowerCase().includes('porcelain')) return 'Porcelain';
  if (value.toLowerCase().includes('ink and color on paper')) return 'Ink and color on paper';
  if (value.toLowerCase().includes('ink on paper')) return 'Ink on paper';

  return value;
}

export function countMediums(artworks: MetObject[]): MediumCount[] {
  const mediumMap = new Map<string, number>();

  for (const artwork of artworks) {
    const medium = normalizeMedium(artwork.medium);
    mediumMap.set(medium, (mediumMap.get(medium) ?? 0) + 1);
  }

  return [...mediumMap.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}