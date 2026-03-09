import { fetchKoreanArtObjects } from '$lib/server/met';

export const load = async () => {
  const artworks = await fetchKoreanArtObjects(1);

  return {
    artwork: artworks[0] ?? null
  };
};