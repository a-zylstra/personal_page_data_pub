<script lang="ts">
  import ProfileSection from '$lib/components/ProfileSection.svelte';
  import MetImageCard from '$lib/components/MetImageCard.svelte';

  export let data;
</script>

<svelte:head>
  <title>Alexa Zylstra | Home</title>
  <meta
    name="description"
    content="Portfolio and thesis project site built with SvelteKit"
  />
</svelte:head>

<ProfileSection />

<section class="section">
  <div class="page-shell">
    <div class="section-heading">
      <p class="eyebrow">Met Museum API</p>
      <h2>Selected works pulled from the Met collection</h2>
      <p>
      This section uses the Met Museum API to connect the site to my thesis interests in the availability of Korean 
      art, and the implications that may have.
      </p>
    </div>

    <div class="grid grid-4" aria-label="Gallery of four Met artworks">
      {#each data.artworks as artwork}
        <MetImageCard {artwork} compact />
      {/each}
    </div>
  </div>
</section>

