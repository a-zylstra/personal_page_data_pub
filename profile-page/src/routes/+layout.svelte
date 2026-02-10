<!--
  +layout.svelte — The "wrapper" around EVERY page on your site.
  
  This file runs on ALL routes. It's where you put:
  - Navigation bar (so it appears on every page)
  - Footer (same reason)
  - Global styles

  KEY SVELTE 5 CONCEPTS USED HERE:
  - $props()  → receives "children" from SvelteKit (the page content)
  - {@render children()}  → displays the current page INSIDE this layout

  Think of it like a picture frame: the layout is the frame,
  and each +page.svelte is a different picture you swap in.
-->
<script>
  // $props() is how Svelte 5 receives data passed to a component.
  // SvelteKit automatically passes "children" — the current page's content.
  // Python comparison: like **kwargs in a function
  let { children } = $props();
</script>

<!-- Navigation bar — appears on EVERY page -->
<nav>
  <div class="nav-inner">
    <!-- 
      CUSTOMIZE THIS: Replace "My Name" with YOUR name.
      This is your site's "brand" — it shows on every page.
    -->
    <a href="/" class="site-title">My Name</a>

    <div class="nav-links">
      <!--
        Each <a> link points to a ROUTE (a folder in src/routes/).
        href="/"          → src/routes/+page.svelte  (home)
        href="/about"     → src/routes/about/+page.svelte
        href="/projects"  → src/routes/projects/+page.svelte
        
        To add a new page: 
        1. Create a new folder in src/routes/
        2. Add a +page.svelte file inside it
        3. Add a link here
      -->
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/projects">Projects</a>
    </div>
  </div>
</nav>

<!-- 
  {@render children()} displays whichever +page.svelte 
  matches the current URL. This is the "picture" in the "frame."
-->
<main>
  {@render children()}
</main>

<footer>
  <p>&copy; 2026 My Name · Built with SvelteKit</p>
</footer>

<style>
  /* ============================
     GLOBAL LAYOUT STYLES
     ============================ */

  /* Reset some defaults for cleaner look */
  :global(body) {
    margin: 0;
    font-family: Georgia, 'Times New Roman', serif;
    color: #1a1a1a;
    background-color: #fafafa;
    line-height: 1.6;
  }

  :global(a) {
    color: #8b0000;
    text-decoration: none;
  }

  :global(a:hover) {
    text-decoration: underline;
  }

  /* ============================
     NAVIGATION
     ============================ */
  nav {
    background-color: #1a1a1a;
    padding: 0.75rem 1.5rem;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .nav-inner {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .site-title {
    color: white;
    font-size: 1.3rem;
    font-weight: bold;
    text-decoration: none;
  }

  .site-title:hover {
    color: #ddd;
    text-decoration: none;
  }

  .nav-links {
    display: flex;
    gap: 1.5rem;
  }

  .nav-links a {
    color: #ccc;
    text-decoration: none;
    font-size: 0.95rem;
  }

  .nav-links a:hover {
    color: white;
    text-decoration: none;
  }

  /* ============================
     MAIN CONTENT AREA
     ============================ */
  main {
    max-width: 900px;
    margin: 2rem auto;
    padding: 0 1.5rem;
    min-height: 60vh;
  }

  /* ============================
     FOOTER
     ============================ */
  footer {
    text-align: center;
    padding: 2rem 1rem;
    color: #888;
    font-size: 0.85rem;
    border-top: 1px solid #e0e0e0;
    margin-top: 3rem;
  }
</style>
