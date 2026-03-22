<script>
  import { slide } from 'svelte/transition';
  import { tick } from 'svelte';
  import { observeFadeIn } from '$lib/utils/observer.js';
  import { openSlug } from '$lib/stores/notebook.js';

  /** @type {Record<string, any>[]} */
  export let writings = [];

  const filters = ['all', 'reflection', 'parable', 'technical', 'essay'];
  /** @type {string} */
  let activeFilter = 'all';
  /** @type {string | null} */
  let expandedSlug = null;

  $: filteredWritings = activeFilter === 'all'
    ? writings
    : writings.filter(w => w.type === activeFilter);

  $: onSiteWritings = filteredWritings
    .filter(w => !w.externalUrl)
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
  $: externalWritings = filteredWritings.filter(w => w.externalUrl);

  $: expandedWriting = expandedSlug
    ? writings.find(w => w.slug === expandedSlug)
    : null;

  let showAllOnSite = false;

  $: visibleOnSite = showAllOnSite ? onSiteWritings : onSiteWritings.slice(0, 3);

  /** @param {string} f */
  function setFilter(f) {
    activeFilter = f;
    expandedSlug = null;
    showAllOnSite = false;
  }

  openSlug.subscribe(async (slug) => {
    if (!slug) return;
    openSlug.set(null);
    activeFilter = 'all';
    showAllOnSite = true;   // ensure hidden cards are rendered
    await tick();
    expandedSlug = slug;
    await tick();
    const el = document.querySelector(`[data-card="${slug}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /** @param {Record<string, any>} writing */
  function toggleExpand(writing) {
    expandedSlug = expandedSlug === writing.slug ? null : writing.slug;
  }

  /** @param {string} dateStr */
  function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-NZ', { year: 'numeric', month: 'short' });
  }

  /** @type {Record<string, string>} */
  const typeColor = {
    reflection: '#9B6A4A',
    parable: '#4A7A50',
    technical: '#6A5A8A',
    essay: '#7A5A4A',
  };
</script>

<section id="notebook-section">
  <div class="section-container">
    <div class="fade-in" use:observeFadeIn>
      <h2 class="section-title">The Notebook</h2>
      <p class="section-subtitle">Reflections, parables, and technical essays</p>
    </div>

    <div class="filter-tabs fade-in" use:observeFadeIn>
      {#each filters as f}
        <button
          class="filter-btn"
          class:active={activeFilter === f}
          on:click={() => setFilter(f)}
        >{f}</button>
      {/each}
    </div>

    <!-- On-site writings: reading cards -->
    {#if onSiteWritings.length > 0}
      <div class="reading-cards fade-in" use:observeFadeIn>
        {#each visibleOnSite as writing (writing.slug)}
          <div class="reading-card" data-card={writing.slug} style="border-left: 3px solid {typeColor[writing.type] ?? typeColor.essay}">
            <div class="card-meta">
              <span class="card-type" style="color: {typeColor[writing.type] ?? typeColor.essay}">{writing.type}</span>
              <span class="card-date">{formatDate(writing.date)}</span>
            </div>
            <h3 class="card-title">{writing.title}</h3>
            {#if writing.excerpt}
              <p class="card-excerpt">{writing.excerpt}</p>
            {/if}
            <button
              class="card-toggle"
              class:open={expandedSlug === writing.slug}
              on:click={() => toggleExpand(writing)}
            >
              {expandedSlug === writing.slug ? 'close ✕' : 'read →'}
            </button>

            {#if expandedSlug === writing.slug}
              <div class="card-expand" data-expand={writing.slug} transition:slide={{ duration: 350 }}>
                <div class="expand-prose">
                  <svelte:component this={writing.component} />
                </div>
              </div>
            {/if}
          </div>
        {/each}
      </div>

      {#if onSiteWritings.length > 3}
        <button class="show-more" on:click={() => showAllOnSite = !showAllOnSite}>
          {showAllOnSite ? 'show less ↑' : `show ${onSiteWritings.length - 3} more ↓`}
        </button>
      {/if}
    {/if}

    <!-- External articles: compact list -->
    {#if externalWritings.length > 0}
      {#if onSiteWritings.length > 0}
        <div class="zone-divider">
          <span>— published elsewhere —</span>
        </div>
      {/if}
      <ul class="external-list fade-in" use:observeFadeIn>
        {#each externalWritings as writing (writing.slug)}
          <li class="external-item">
            <a
              href={writing.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="external-link"
            >
              <span class="external-meta">
                <span class="external-type" style="color: {typeColor[writing.type] ?? typeColor.essay}">{writing.type}</span>
                <span class="external-date">{formatDate(writing.date)}</span>
              </span>
              <span class="external-title">{writing.title}</span>
              <span class="external-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        {/each}
      </ul>
    {/if}

    {#if filteredWritings.length === 0}
      <p class="empty-state">Nothing here yet.</p>
    {/if}
  </div>
</section>

<style>
  .filter-tabs {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }

  .filter-btn {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    padding: 6px 14px;
    border-radius: 2px;
    cursor: pointer;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text);
    transition: background 0.15s, color 0.15s, border-color 0.15s;
    min-height: 44px;
  }

  .filter-btn:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  .filter-btn.active {
    background: var(--accent);
    color: #fff;
    border-color: var(--accent);
  }

  /* Reading cards */
  .reading-cards {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .reading-card {
    padding: 24px 0 24px 20px;
    border-bottom: 1px solid var(--border);
    transition: border-left-color 0.2s;
  }

  .reading-card:first-child {
    border-top: 1px solid var(--border);
  }

  .reading-card:hover {
    background: rgba(0, 0, 0, 0.012);
  }

  .card-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }

  .card-type {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-weight: 500;
  }

  .card-date {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--text);
    opacity: 0.4;
  }

  .card-title {
    font-family: var(--font-display);
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 1.25;
    margin: 0 0 0.65rem 0;
    color: var(--text);
    max-width: var(--max-prose);
  }

  .card-excerpt {
    font-family: var(--font-body);
    font-style: italic;
    font-size: 0.95rem;
    line-height: 1.65;
    color: var(--text);
    opacity: 0.65;
    margin: 0 0 1rem 0;
    max-width: var(--max-prose);
  }

  .card-toggle {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.07em;
    background: none;
    border: 1px solid var(--border);
    color: var(--accent);
    cursor: pointer;
    padding: 6px 14px;
    border-radius: 2px;
    transition: background 0.15s, border-color 0.15s;
    min-height: 36px;
  }

  .card-toggle:hover,
  .card-toggle.open {
    background: var(--bg-code);
    border-color: var(--accent);
  }

  .card-expand {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border);
    max-width: var(--max-prose);
  }

  .expand-prose {
    font-family: var(--font-body);
    font-size: 1rem;
    line-height: 1.9;
    color: var(--text);
  }

  .expand-prose :global(p) {
    margin-bottom: 1.4em;
  }

  .expand-prose :global(blockquote) {
    border-left: 3px solid var(--accent);
    padding: 0.5rem 1.25rem;
    margin: 1.5em 0;
    font-style: italic;
    opacity: 0.85;
  }

  .expand-prose :global(h1),
  .expand-prose :global(h2),
  .expand-prose :global(h3) {
    font-family: var(--font-display);
    margin-top: 2em;
    margin-bottom: 0.75em;
  }

  .expand-prose :global(hr) {
    border: none;
    border-top: 1px solid var(--border);
    margin: 2em 0;
  }

  .show-more {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.07em;
    background: none;
    border: 1px solid var(--border);
    color: var(--text);
    opacity: 0.55;
    cursor: pointer;
    padding: 8px 18px;
    border-radius: 2px;
    margin-top: 1rem;
    transition: opacity 0.15s, border-color 0.15s;
  }

  .show-more:hover {
    opacity: 1;
    border-color: var(--accent);
    color: var(--accent);
  }

  /* Zone divider */
  .zone-divider {
    text-align: center;
    margin: 2.5rem 0 1.5rem;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    color: var(--text);
    opacity: 0.35;
  }

  /* External list */
  .external-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .external-item {
    border-bottom: 1px solid var(--border);
  }

  .external-item:first-child {
    border-top: 1px solid var(--border);
  }

  .external-link {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    padding: 14px 0;
    text-decoration: none;
    color: var(--text);
    transition: color 0.15s;
  }

  .external-link:hover {
    color: var(--accent);
    text-decoration: none;
  }

  .external-link:hover .external-arrow {
    transform: translate(2px, -2px);
  }

  .external-meta {
    display: flex;
    gap: 0.6rem;
    flex-shrink: 0;
    align-items: baseline;
  }

  .external-type {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 500;
    white-space: nowrap;
  }

  .external-date {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    color: var(--text);
    opacity: 0.4;
    white-space: nowrap;
  }

  .external-title {
    font-family: var(--font-body);
    font-size: 0.95rem;
    flex: 1;
    line-height: 1.4;
  }

  .external-arrow {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--accent);
    opacity: 0.5;
    flex-shrink: 0;
    transition: transform 0.15s;
  }

  .empty-state {
    font-family: var(--font-body);
    font-style: italic;
    opacity: 0.45;
    margin-top: 2rem;
  }

  @media (max-width: 640px) {
    .reading-card {
      padding: 22px 0 22px 16px;
    }

    .card-title {
      font-size: 1.2rem;
      line-height: 1.3;
      margin-bottom: 0.55rem;
    }

    .card-excerpt {
      font-size: 0.9rem;
      line-height: 1.6;
    }

    .card-expand {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
    }

    .expand-prose {
      font-size: 0.94rem;
      line-height: 1.85;
    }

    .filter-tabs {
      gap: 6px;
      margin-bottom: 1.5rem;
    }

    .filter-btn {
      font-size: 0.68rem;
      padding: 6px 12px;
      min-height: 44px;
    }

    .external-link {
      padding: 14px 0;
      gap: 0.5rem;
    }

    .external-meta {
      display: none;
    }

    .external-title {
      font-size: 0.9rem;
      line-height: 1.45;
    }

    .zone-divider {
      margin: 2rem 0 1.5rem;
    }
  }
</style>
