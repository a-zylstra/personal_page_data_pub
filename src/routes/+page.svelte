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
        This is connected to the Metropolitan Museum of Art in NY's API to pull featured 
        Korean artwork. Most of the featured art is not contemporary due to the open access API only 
        contains works the museum has deemed to be in the public domain.
      </p>
    </div>

    <div class="grid grid-4" aria-label="Gallery of four Met artworks">
      {#each data.artworks as artwork}
        <MetImageCard {artwork} compact />
      {/each}
    </div>
  </div>
</section>

<!-- Let's include more personal touches like favorite artwork, 
  my goodreads, backstory on why korean and why contemporary korean art,
  the languages i speak, more tech stack, remove the option to add or remove skills, 
  highlight specific projects on github, etc
  let's get a consistent color palette
  include places i've lived?
  a keyword search function of the corpus i've built
  -->