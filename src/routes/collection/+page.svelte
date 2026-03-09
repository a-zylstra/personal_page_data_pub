<script lang="ts">
  import FeaturedArtwork from '$lib/components/FeaturedArtwork.svelte';
  import MetImageCard from '$lib/components/MetImageCard.svelte';
  import type { MetObject } from '$lib/types/met';

  export let data: {
    artwork: MetObject | null;
    gallery: MetObject[];
  };
</script>

<svelte:head>
  <title>Collection | Alexa Zylstra</title>
  <meta
    name="description"
    content="Met Museum collection feature page."
  />
</svelte:head>

<section class="section">
  <div class="page-shell">
    <div class="section-heading">
      <p class="eyebrow">Met Museum API</p>
      <h2>Random work from the Met collection</h2>
      <p>
        This artwork is pulled dynamically from the Met Museum API.
      </p>
    </div>

    {#if data.artwork}
      <FeaturedArtwork artwork={data.artwork} />
    {:else}
      <p>No artwork could be loaded.</p>
    {/if}
  </div>
</section>

<section class="section">
  <div class="page-shell">
    <div class="section-heading">
      <p class="eyebrow">Gallery</p>
      <h2>Collection grid</h2>
      <p>Additional works pulled from the Met API.</p>
    </div>

    {#if data.gallery?.length}
      <div class="gallery-grid" aria-label="Gallery of artworks from the Met Museum API">
        {#each data.gallery as artwork}
          <MetImageCard {artwork} compact />
        {/each}
      </div>
    {:else}
      <p>No gallery artworks could be loaded.</p>
    {/if}
  </div>
</section>

<style>
  .section-heading {
    margin-bottom: 1rem;
  }

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: 0.78rem;
    color: var(--muted);
    font-weight: 700;
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
  }

  @media (max-width: 1100px) {
    .gallery-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (max-width: 900px) {
    .gallery-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 640px) {
    .gallery-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>