<script lang="ts">
  export let name = 'Alexa Zylstra';
  export let thesisBlurb = 'I am a University of Chicago student working on a thesis related to contemporary Korean art, digital humanities, and the ways data can support art history research.';
  export let imageSrc = '/pfp.jpg';
</script>

<section class="section">
  <div class="page-shell hero card">
    <div class="hero-grid">
      <div>
        <img class="portrait" src={imageSrc}/>
      </div>
      <div>
        <p class="eyebrow">Home</p>
        <h1>{name}</h1>
        <p class="lead">{thesisBlurb}</p>
        <div class="link-row" aria-label="Professional links">
          <a class="pill-link" href="https://github.com/a-zylstra" target="_blank" rel="noreferrer">GitHub</a>
          <a class="pill-link" href="/resume.pdf" target="_blank" rel="noreferrer">Resume</a>
          <a class="pill-link" href="https://www.linkedin.com/in/alexa-zylstra/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    padding: 1.5rem;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 1.5rem;
    align-items: center;
  }

  .portrait {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 20px;
  }

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: 0.78rem;
    color: var(--muted);
    font-weight: 700;
  }

  h1 {
    margin: 0.2rem 0 0.8rem;
    font-size: clamp(2rem, 4vw, 3.2rem);
    line-height: 1.05;
  }

  .lead {
    font-size: 1.08rem;
    line-height: 1.7;
    max-width: 65ch;
  }

  .link-row {
    display: flex;
    gap: 0.8rem;
    flex-wrap: wrap;
    margin: 1.25rem 0;
  }
  code {
    background: var(--accent-soft);
    padding: 0.15rem 0.35rem;
    border-radius: 6px;
  }

  @media (max-width: 800px) {
    .hero-grid {
      grid-template-columns: 1fr;
    }

    .portrait {
      max-width: 280px;
    }
  }
</style>