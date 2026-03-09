export type MetObject = {
  objectID: number;
  title: string;
  artistDisplayName: string;
  artistNationality: string;
  objectDate: string;
  department: string;
  primaryImage: string;
  primaryImageSmall: string;
  objectURL: string;
  culture: string;
  medium: string;
};

export type MetSearchResponse = {
  total: number;
  objectIDs: number[] | null;
};

export type MetDepartment = {
  departmentId: number;
  displayName: string;
};

export type MetDepartmentsResponse = {
  departments: MetDepartment[];
};

export type DepartmentCount = {
  label: string;
  value: number;
};

export type MediumCount = {
  label: string;
  value: number;
};