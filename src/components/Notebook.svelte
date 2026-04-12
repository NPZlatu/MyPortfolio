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

  // technical first, then others; within each group sort by date desc
  $: sortedWritings = [...filteredWritings].sort((a, b) => {
    const aTech = a.type === 'technical' ? 0 : 1;
    const bTech = b.type === 'technical' ? 0 : 1;
    if (aTech !== bTech) return aTech - bTech;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  let showAll = false;
  const INITIAL_VISIBLE = 5;

  $: visibleWritings = showAll ? sortedWritings : sortedWritings.slice(0, INITIAL_VISIBLE);

  /** @param {string} f */
  function setFilter(f) {
    activeFilter = f;
    expandedSlug = null;
    showAll = false;
  }

  openSlug.subscribe(async (slug) => {
    if (!slug) return;
    openSlug.set(null);
    activeFilter = 'all';
    showAll = true;
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

    <!-- Pinned tool card: always visible -->
    <div class="reading-cards fade-in" use:observeFadeIn>
      <a href="/nz-visa" class="reading-card pinned-card" data-card="nz-visa" style="border-left: 3px solid var(--accent)">
        <div class="card-meta">
          <span class="card-type" style="color: var(--accent)">tool</span>
          <span class="card-date">2025</span>
          <span class="pinned-badge">pinned</span>
        </div>
        <h3 class="card-title">NZ Visa Application Checklist</h3>
        <p class="card-excerpt">Interactive checklist for navigating the Post-Study Work Visa and Partner Visa process — documents, timelines, fees, and tips. Progress saves in your browser.</p>
        <span class="card-toggle card-toggle-link">open checklist ↗</span>
      </a>
    </div>

    <!-- Unified writings list: technical first, then others -->
    {#if sortedWritings.length > 0}
      <div class="reading-cards fade-in" use:observeFadeIn>
        {#each visibleWritings as writing (writing.slug)}
          <div class="reading-card" data-card={writing.slug} style="border-left: 3px solid {typeColor[writing.type] ?? typeColor.essay}">
            <div class="card-meta">
              <span class="card-type" style="color: {typeColor[writing.type] ?? typeColor.essay}">{writing.type}</span>
              <span class="card-date">{formatDate(writing.date)}</span>
            </div>
            <h3 class="card-title">{writing.title}</h3>
            {#if writing.excerpt}
              <p class="card-excerpt">{writing.excerpt}</p>
            {/if}

            {#if writing.externalUrl}
              <a
                href={writing.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="card-toggle card-toggle-link"
              >read ↗</a>
            {:else}
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
            {/if}
          </div>
        {/each}
      </div>

      {#if sortedWritings.length > INITIAL_VISIBLE}
        <button class="show-more" on:click={() => showAll = !showAll}>
          {showAll ? 'show less ↑' : `show ${sortedWritings.length - INITIAL_VISIBLE} more ↓`}
        </button>
      {/if}
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

  .card-toggle-link {
    display: inline-block;
    text-decoration: none;
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

  .empty-state {
    font-family: var(--font-body);
    font-style: italic;
    opacity: 0.45;
    margin-top: 2rem;
  }

  .pinned-card {
    display: block;
    text-decoration: none;
    color: var(--text);
  }

  .pinned-card:hover {
    text-decoration: none;
  }

  .pinned-badge {
    font-family: var(--font-mono);
    font-size: 0.58rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent);
    opacity: 0.5;
    border: 1px solid var(--accent);
    padding: 1px 6px;
    border-radius: 2px;
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

  }
</style>
