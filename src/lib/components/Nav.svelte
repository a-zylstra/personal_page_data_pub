<nav class="nav" aria-label="Main navigation">
  <div class="page-shell nav-inner">
    <a class="brand" href="/">Alexa Zylstra</a>
    <div class="links">
      <a href="/">Home</a>
      <a href="/collection">Collection</a>
      <a href="/about">About</a>
    </div>
  </div>
</nav>

<style>
  .nav {
    position: sticky;
    top: 0;
    z-index: 10;
    backdrop-filter: blur(12px);
    background: color-mix(in srgb, white 82%, transparent);
    border-bottom: 1px solid var(--border);
  }

  .nav-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 64px;
    gap: 1rem;
  }

  .brand {
    font-weight: 800;
    text-decoration: none;
    color: var(--text);
  }

  .links {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .links a {
    text-decoration: none;
    color: var(--text);
    font-weight: 600;
  }

  .links a:hover,
  .links a:focus-visible {
    color: var(--accent);
  }
</style>
