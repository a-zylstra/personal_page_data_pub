<!--
  projects/+page.svelte — Your PROJECTS page (route: /projects)
  
  This page shows off work you've done. Right now it has placeholder
  projects — replace them with YOUR actual work as the course continues.

  KEY SVELTE 5 CONCEPTS USED HERE:
  - $state()   → reactive array of project objects
  - {#each}    → renders a card for each project
  - {#if}      → conditional rendering (shows/hides details)
  - Event handling with onclick

  This page demonstrates a common web pattern:
  an ARRAY of DATA → rendered as a LIST of CARDS.
  You'll use this pattern constantly in web development.
-->
<script>
  // ============================================
  // PROJECT DATA
  // ============================================
  // An array of objects — each object is one project.
  // Python comparison: a list of dictionaries.
  //   projects = [
  //     {"title": "...", "description": "...", "tags": [...]},
  //     ...
  //   ]
  //
  // CUSTOMIZE: Replace these with your actual projects!
  let projects = $state([
    {
      id: 1,
      title: "My First Web Page",
      description: "Built a basic HTML page with headings, paragraphs, images, and links. Learned about semantic HTML and document structure.",
      tags: ["HTML", "CSS"],
      date: "January 2026",
      expanded: false
    },
    {
      id: 2,
      title: "Responsive Layout",
      description: "Created a responsive news article page that looks good on both mobile and desktop. Used CSS flexbox and media queries.",
      tags: ["HTML", "CSS", "Responsive"],
      date: "January 2026",
      expanded: false
    },
    {
      id: 3,
      title: "JavaScript Fundamentals",
      description: "Practiced DOM manipulation, event handling, and working with arrays and objects. Built interactive page elements.",
      tags: ["JavaScript", "DOM"],
      date: "February 2026",
      expanded: false
    },
    {
      id: 4,
      title: "Wikipedia API Search",
      description: "Built a search tool that fetches results from the Wikipedia API using async/await and displays them dynamically.",
      tags: ["JavaScript", "API", "async/await"],
      date: "February 2026",
      expanded: false
    }
  ]);

  // $derived() — count updates automatically when projects array changes
  let projectCount = $derived(projects.length);

  // ============================================
  // TOGGLE DETAILS — shows/hides project description
  // ============================================
  function toggleProject(id) {
    // .map() creates a new array with the modification
    // Python comparison:
    //   projects = [{**p, "expanded": not p["expanded"]}
    //               if p["id"] == id else p
    //               for p in projects]
    projects = projects.map(p =>
      p.id === id ? { ...p, expanded: !p.expanded } : p
    );
  }
</script>

<h1>My Projects</h1>
<p class="subtitle">
  {projectCount} projects so far — more coming as the course continues!
</p>

<div class="projects-grid">
  <!--
    {#each} with a KEY — the (project.id) part.
    The key tells Svelte which item is which, so it can
    efficiently update only what changed (not re-render everything).
    
    Python comparison:
      for project in projects:
          render_card(project)
  -->
  {#each projects as project (project.id)}
    <div class="project-card">
      <div class="card-header">
        <h2>{project.title}</h2>
        <span class="date">{project.date}</span>
      </div>

      <!-- Tags rendered with a nested {#each} -->
      <div class="tags">
        {#each project.tags as tag (tag)}
          <span class="tag">{tag}</span>
        {/each}
      </div>

      <!--
        {#if} — only shows description when expanded is true.
        Clicking the button toggles it.
      -->
      {#if project.expanded}
        <p class="description">{project.description}</p>
      {/if}

      <button
        class="toggle-btn"
        onclick={() => toggleProject(project.id)}
      >
        {project.expanded ? "Show Less" : "Show More"}
      </button>
    </div>
  {/each}
</div>

<style>
  h1 {
    margin-bottom: 0.25rem;
  }

  .subtitle {
    color: #666;
    margin-bottom: 2rem;
  }

  /* Grid layout for project cards */
  .projects-grid {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .project-card {
    background: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 1.5rem;
    transition: box-shadow 0.2s;
  }

  .project-card:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.75rem;
  }

  .card-header h2 {
    margin: 0;
    font-size: 1.25rem;
  }

  .date {
    color: #888;
    font-size: 0.85rem;
    white-space: nowrap;
    margin-left: 1rem;
  }

  /* Tags — pill-shaped labels */
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 0.75rem;
  }

  .tag {
    background: #f0e8e0;
    color: #6b4c3b;
    padding: 0.2rem 0.65rem;
    border-radius: 12px;
    font-size: 0.8rem;
  }

  .description {
    color: #444;
    line-height: 1.6;
    margin-bottom: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid #eee;
  }

  .toggle-btn {
    background: none;
    border: 1px solid #ccc;
    color: #555;
    padding: 0.35rem 0.9rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.85rem;
    font-family: inherit;
  }

  .toggle-btn:hover {
    border-color: #8b0000;
    color: #8b0000;
  }
</style>
