import {
  fetchKoreanArtObjects,
  countClassifications,
} from '$lib/server/met';

export const load = async () => {
  const allArtworks = await fetchKoreanArtObjects(50);
  const featuredId = allArtworks[0]?.objectID;
  const mediumCounts = countClassifications(allArtworks);

  return {
    artwork: allArtworks[0] ?? null,
    gallery: allArtworks.filter((artwork) => artwork.objectID !== featuredId).slice(0, 40),
    mediumCounts
  };
};