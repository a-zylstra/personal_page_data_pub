import type {
  DepartmentCount,
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

export async function searchObjectIds(query: string): Promise<number[]> {
  const response = await fetch(
    `${BASE_URL}/search?hasImages=true&q=${encodeURIComponent(query)}`
  );

  const data: MetSearchResponse = await response.json();
  return data.objectIDs || [];
}

export async function fetchObject(objectId: number): Promise<MetObject> {
  const response = await fetch(`${BASE_URL}/objects/${objectId}`);
  const data: MetObject = await response.json();
  return data;
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
  const response = await fetch(`${BASE_URL}/departments`);
  const data: MetDepartmentsResponse = await response.json();

  const randomDepartments = getRandomItems(data.departments, 6);

  const counts: DepartmentCount[] = [];

  for (const department of randomDepartments) {
    const deptResponse = await fetch(
      `${BASE_URL}/objects?departmentIds=${department.departmentId}`
    );

    const deptData = await deptResponse.json();

    counts.push({
      label: department.displayName,
      value: deptData.total
    });
  }

  counts.sort((a, b) => b.value - a.value);

  return counts;
}