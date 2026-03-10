<script lang="ts">
  import type { MetObject } from '$lib/types/met';

  export let artwork: MetObject;
  export let compact = false;
</script>

<article class:compact class="card artwork-card">
  <img
    class="art-image"
    src={artwork.primaryImageSmall || artwork.primaryImage}
    alt={`${artwork.title} by ${artwork.artistDisplayName || 'unknown artist'}`}
    loading="lazy"
  />

  <div class="content">
    <h3>{artwork.title}</h3>
    <p>
      {artwork.artistDisplayName || 'Unknown artist'}
      {#if artwork.objectDate}
        · {artwork.objectDate}
      {/if}
    </p>
    <p class="meta">{artwork.department}</p>
    <a href={artwork.objectURL} target="_blank" rel="noreferrer">View at the Met</a>
  </div>
</article>

<style>
  .artwork-card {
    overflow: hidden;
  }

  .art-image {
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    background: #e5e7eb;
  }

  .content {
    padding: 1rem;
  }

  h3 {
    margin: 0 0 0.35rem;
    font-size: 1rem;
    line-height: 1.35;
  }

  p {
    margin: 0.2rem 0;
    color: var(--muted);
  }

  .meta {
    font-size: 0.92rem;
  }

  .compact .art-image {
    aspect-ratio: 1 / 1;
  }
</style>
