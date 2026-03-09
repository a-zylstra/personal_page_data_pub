import { fetchFeaturedObjects } from '$lib/server/met';

export const load = async () => {
  const artworks = await fetchFeaturedObjects('Korea', 4);

  return {
    artworks
  };
};
