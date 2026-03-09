import type {
  DepartmentCount,
  MediumCount,
  MetDepartmentsResponse,
  MetObject,
  MetSearchResponse
} from '$lib/types/met';

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
  const randomIds = getRandomItems(ids, 20);

  const objects: MetObject[] = [];

  for (const id of randomIds) {
    const object = await fetchObject(id);

    if (object.primaryImageSmall) {
      objects.push(object);
    }

    if (objects.length >= count) {
      break;
    }
  }

  return objects;
}

export async function fetchCollectionSet(query: string, count = 12): Promise<MetObject[]> {
  const ids = await searchObjectIds(query);
  const randomIds = getRandomItems(ids, 40);

  const objects: MetObject[] = [];

  for (const id of randomIds) {
    const object = await fetchObject(id);

    if (object.primaryImageSmall) {
      objects.push(object);
    }

    if (objects.length >= count) {
      break;
    }
  }

  return objects;
}

export async function fetchDepartmentCounts(): Promise<DepartmentCount[]> {
  const data = await fetchJson<MetDepartmentsResponse>(`${BASE_URL}/departments`);
  const randomDepartments = getRandomItems(data.departments, 6);

  const counts: DepartmentCount[] = [];

  for (const department of randomDepartments) {
    const deptData = await fetchJson<{ total: number }>(
      `${BASE_URL}/objects?departmentIds=${department.departmentId}`
    );

    counts.push({
      label: department.displayName,
      value: deptData.total
    });
  }

  counts.sort((a, b) => b.value - a.value);

  return counts;
}

export async function searchKoreanArtIds(): Promise<number[]> {
  const data = await fetchJson<MetSearchResponse>(
    `${BASE_URL}/search?artistOrCulture=true&hasImages=true&q=${encodeURIComponent('korean')}`
  );

  return data.objectIDs ?? [];
}

function isKoreanArt(object: MetObject): boolean {
  const nationality = object.artistNationality?.toLowerCase() ?? '';
  const culture = object.culture?.toLowerCase() ?? '';
  return (
    nationality.includes('korean') ||
    culture.includes('korean')
  );
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

export async function fetchKoreanArtObjects(limit = 40): Promise<MetObject[]> {
  const ids = await searchKoreanArtIds();
  const selectedIds = ids.slice(0, limit);

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

  return objects.filter((obj): obj is MetObject => {
    return !!obj && !!obj.primaryImageSmall && isKoreanArt(obj);
  });
}

export async function fetchKoreanMediumCounts(limit = 80): Promise<MediumCount[]> {
  const ids = await searchKoreanArtIds();
  const selectedIds = ids.slice(0, limit);

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

  const filteredObjects = objects.filter((obj): obj is MetObject => {
    return !!obj && isKoreanArt(obj);
  });

  const mediumMap = new Map<string, number>();

  for (const object of filteredObjects) {
    const medium = normalizeMedium(object.medium);
    mediumMap.set(medium, (mediumMap.get(medium) ?? 0) + 1);
  }

  return [...mediumMap.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}