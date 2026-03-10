import { fetchFeaturedObjects } from '$lib/server/met';

export const load = async () => {
  const artworks = await fetchFeaturedObjects('Korean', 4);

  return {
    artworks
  };
};