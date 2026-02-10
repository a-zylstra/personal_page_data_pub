<!--
  about/+page.svelte — Your ABOUT page (route: /about)
  
  This page lives at src/routes/about/+page.svelte
  The folder name "about" becomes the URL path: yoursite.com/about

  KEY SVELTE 5 CONCEPTS USED HERE:
  - $state()   → reactive variables
  - $derived() → a value COMPUTED from other state (updates automatically)
  - {#each}    → loop over an array to create repeated HTML
                  Python comparison: like a for loop, but for HTML elements

  CUSTOMIZE: Replace all placeholder content with YOUR info!
-->
<script>
  // ============================================
  // YOUR INFO — edit these to be about YOU
  // ============================================
  const name = "Your Name";
  const major = "Your Major / Field of Study";
  const year = "Your Year (e.g., 3rd Year)";
  const email = "your.email@uchicago.edu";

  // ============================================
  // SKILLS LIST — uses {#each} to render
  // ============================================
  // This is a regular JavaScript array.
  // The {#each} block in the HTML will create one <li> per item.
  // Python comparison: skills = ["HTML", "CSS", ...]
  //                    for skill in skills: print(f"<li>{skill}</li>")
  let skills = $state([
    "HTML",
    "CSS",
    "JavaScript",
    "Python",
    "Svelte (learning!)"
  ]);

  // ============================================
  // $derived() — COMPUTED VALUES
  // ============================================
  // This value AUTOMATICALLY updates whenever skills changes.
  // If you add/remove a skill, skillCount updates instantly.
  // Python comparison: imagine a property that re-runs its
  // getter every time the underlying data changes.
  let skillCount = $derived(skills.length);

  // ============================================
  // ADDING A SKILL — demonstrates state updates
  // ============================================
  let newSkill = $state("");

  function addSkill() {
    // .trim() removes whitespace — same as Python's .strip()
    if (newSkill.trim() !== "") {
      // Spread operator (...) creates a NEW array with the old items + new one
      // Python comparison: skills = [*skills, new_skill]
      skills = [...skills, newSkill.trim()];
      newSkill = "";  // Clear the input
    }
  }

  function removeSkill(index) {
    // .filter() keeps items that pass the test — like Python's list comprehension
    // Python comparison: skills = [s for i, s in enumerate(skills) if i != index]
    skills = skills.filter((_, i) => i !== index);
  }
</script>

<h1>About {name}</h1>

<section class="info-grid">
  <div class="info-item">
    <span class="label">Major</span>
    <span>{major}</span>
  </div>
  <div class="info-item">
    <span class="label">Year</span>
    <span>{year}</span>
  </div>
  <div class="info-item">
    <span class="label">Email</span>
    <span><a href="mailto:{email}">{email}</a></span>
  </div>
</section>

<section class="skills-section">
  <!--
    {skillCount} updates AUTOMATICALLY when skills array changes.
    This is $derived() in action — you never manually update it.
  -->
  <h2>Skills ({skillCount})</h2>

  <ul class="skills-list">
    <!--
      {#each array as item, index (unique_key)}
      
      - "skills"  → the array to loop over
      - "skill"   → the current item (like Python's: for skill in skills)
      - "i"       → the index (like Python's: for i, skill in enumerate(skills))
      - "(skill)" → the "key" — helps Svelte track which item is which
                     when the list changes (like a unique ID)
      
      Python comparison:
        for i, skill in enumerate(skills):
            print(f"<li>{skill} <button>Remove</button></li>")
    -->
    {#each skills as skill, i (skill)}
      <li>
        {skill}
        <button class="remove-btn" onclick={() => removeSkill(i)}>×</button>
      </li>
    {/each}
  </ul>

  <!-- Add a new skill — demonstrates input binding + state -->
  <div class="add-skill">
    <!--
      bind:value connects the input to the newSkill variable.
      When you type, newSkill updates. When newSkill changes, the input updates.
      TWO-WAY BINDING — no addEventListener needed!
      
      Python comparison: there's no direct equivalent. In vanilla JS you'd need:
        input.addEventListener('input', (e) => { newSkill = e.target.value; });
    -->
    <input
      type="text"
      bind:value={newSkill}
      placeholder="Add a skill..."
      onkeydown={(e) => e.key === 'Enter' && addSkill()}
    />
    <button onclick={addSkill}>Add</button>
  </div>
</section>

<section class="bio">
  <h2>About Me</h2>
  <p>
    <!-- CUSTOMIZE: Write about yourself! 2-4 paragraphs. -->
    Write a few paragraphs about yourself here. What are you studying?
    What interests you? What do you want to do after graduation?
  </p>
  <p>
    This page is a great place to share your story, your goals,
    and what makes you unique. Make it personal!
  </p>
</section>

<style>
  h1 {
    margin-bottom: 1.5rem;
  }

  /* Info grid — simple key-value layout */
  .info-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1.25rem;
    background: white;
    border: 1px solid #ddd;
    border-radius: 6px;
  }

  .info-item {
    flex: 1;
    min-width: 150px;
  }

  .label {
    display: block;
    font-size: 0.8rem;
    text-transform: uppercase;
    color: #888;
    margin-bottom: 0.2rem;
  }

  /* Skills section */
  .skills-section {
    margin-bottom: 2rem;
  }

  .skills-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .skills-list li {
    background: #f5f0eb;
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .remove-btn {
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    font-size: 1.1rem;
    padding: 0;
    line-height: 1;
  }

  .remove-btn:hover {
    color: #8b0000;
  }

  /* Add skill input */
  .add-skill {
    display: flex;
    gap: 0.5rem;
    max-width: 350px;
  }

  .add-skill input {
    flex: 1;
    padding: 0.5rem 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 0.95rem;
    font-family: inherit;
  }

  .add-skill button {
    background-color: #8b0000;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-family: inherit;
  }

  .add-skill button:hover {
    background-color: #6b0000;
  }

  /* Bio section */
  .bio {
    background: white;
    padding: 1.5rem 2rem;
    border: 1px solid #ddd;
    border-radius: 6px;
  }

  .bio h2 {
    margin-top: 0;
  }
</style>
