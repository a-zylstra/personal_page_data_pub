<script lang="ts">
  import FeaturedArtwork from '$lib/components/FeaturedArtwork.svelte';
  import type { MetObject } from '$lib/types/met';

  export let data: {
    artwork: MetObject | null;
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