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
  classification: string;
};

export type MetSearchResponse = {
  total: number;
  objectIDs: number[] | null;
};

export type MediumCount = {
  label: string;
  value: number;
};