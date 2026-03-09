<script lang="ts">
  import type { MetObject } from '$lib/types/met';

  export let artwork: MetObject;
</script>

<section class="section">
  <div class="page-shell card featured">
    <div class="image-wrap">
      <img src={artwork.primaryImage || artwork.primaryImageSmall} alt={`${artwork.title} by ${artwork.artistDisplayName || 'unknown artist'}`} />
    </div>
    <div class="content">
      <p class="eyebrow">Randomly selected feature</p>
      <h1>{artwork.title}</h1>
      <p class="details">
        <strong>{artwork.artistDisplayName || 'Unknown artist'}</strong>
        {#if artwork.objectDate}
          · {artwork.objectDate}
        {/if}
      </p>
      <p>{artwork.medium}</p>
      <p>{artwork.department}</p>
      <a class="pill-link" href={artwork.objectURL} target="_blank" rel="noreferrer">Open in the Met collection</a>
    </div>
  </div>
</section>

<style>
  .featured {
    overflow: hidden;
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
  }

  .image-wrap img {
    width: 100%;
    height: 100%;
    min-height: 420px;
    object-fit: cover;
  }

  .content {
    padding: 1.5rem;
  }

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: 0.78rem;
    color: var(--muted);
    font-weight: 700;
  }

  h1 {
    margin: 0.35rem 0 1rem;
    font-size: clamp(1.8rem, 3vw, 2.8rem);
  }

  .details {
    color: var(--muted);
  }

  @media (max-width: 900px) {
    .featured {
      grid-template-columns: 1fr;
    }

    .image-wrap img {
      min-height: 300px;
    }
  }
</style>
