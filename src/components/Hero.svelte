<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { openSlug } from '$lib/stores/notebook.js';

  /** @type {Record<string, any>[]} */
  export let featuredWritings = [];

  let currentIndex = 0;
  let quoteVisible = true;

  onMount(() => {
    if (featuredWritings.length < 2) return;

    const interval = setInterval(async () => {
      quoteVisible = false;
      await new Promise(r => setTimeout(r, 500));
      currentIndex = (currentIndex + 1) % featuredWritings.length;
      quoteVisible = true;
    }, 7000);

    return () => clearInterval(interval);
  });

  $: currentWriting = featuredWritings[currentIndex] ?? null;

  /** @param {Record<string, any>} writing */
  function readStory(writing) {
    if (writing.externalUrl) {
      window.open(writing.externalUrl, '_blank', 'noopener,noreferrer');
    } else {
      openSlug.set(writing.slug);
      const section = document.querySelector('#notebook-section');
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
</script>

<section id="hero-section" class="hero">
  <div class="hero-inner">
    <div class="epigraph-area">
      {#if quoteVisible && currentWriting}
        <button class="quote-wrapper" transition:fade={{ duration: 500 }} on:click={() => readStory(currentWriting)}>
          <blockquote class="epigraph">
            {currentWriting.excerpt}
          </blockquote>
          <cite class="epigraph-cite">— {currentWriting.title} &nbsp;· {currentWriting.externalUrl ? 'read ↗' : 'read ↓'}</cite>
        </button>
      {:else if !currentWriting}
        <div class="quote-wrapper">
          <blockquote class="epigraph">
            "Swimming was always his Ikigai, yet he kept searching for wings."
          </blockquote>
          <cite class="epigraph-cite">— from the notebook</cite>
        </div>
      {/if}
    </div>

    <div class="hero-identity">
      <div class="hero-rule"></div>
      <h1 class="hero-name">Niraj Paudel</h1>
      <p class="hero-tagline">Software Engineer &nbsp;·&nbsp; Writer &nbsp;·&nbsp; Seeker</p>
      <p class="hero-sub">
        A decade of building software.<br>
        Now learning what it means when the machines start building too.
      </p>
      <p class="hero-location">Auckland, New Zealand</p>
    </div>

    <a href="#about-section" class="scroll-hint" aria-label="Scroll to about section">↓</a>
  </div>
</section>

<style>
  .hero {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 48px 24px 40px;
    text-align: center;
  }

  .hero-inner {
    max-width: 640px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }

  .epigraph-area {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    max-width: 480px;
    margin-bottom: 2rem;
  }

  .quote-wrapper {
    width: 100%;
    border-left: 2px solid var(--border);
    padding-left: 14px;
    text-align: left;
    background: none;
    border-top: none;
    border-right: none;
    border-bottom: none;
    cursor: pointer;
    transition: border-color 0.2s;
  }

  .quote-wrapper:hover {
    border-left-color: var(--accent);
  }

  .epigraph {
    font-family: var(--font-body);
    font-style: italic;
    font-size: 0.97rem;
    line-height: 1.6;
    color: var(--text);
    margin: 0 0 0.4rem 0;
    padding: 0;
    border: none;
    opacity: 0.6;
    quotes: none;
  }

  .epigraph-cite {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.05em;
    color: var(--accent);
    display: block;
    font-style: normal;
    opacity: 0.8;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .hero-rule {
    width: 40px;
    height: 1px;
    background: var(--border);
    margin: 0 auto 2rem;
  }

  .hero-name {
    font-family: var(--font-display);
    font-size: clamp(3rem, 8vw, 5.5rem);
    font-weight: 700;
    letter-spacing: -0.01em;
    margin: 0 0 0.5rem 0;
    line-height: 1.05;
  }

  .hero-tagline {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent);
    margin: 0 0 1.5rem 0;
  }

  .hero-sub {
    font-family: var(--font-body);
    font-size: 1rem;
    line-height: 1.7;
    color: var(--text);
    opacity: 0.7;
    margin: 0 0 1rem 0;
  }

  .hero-location {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    color: var(--text);
    opacity: 0.45;
    margin: 0 0 1.25rem 0;
  }

  .scroll-hint {
    font-family: var(--font-mono);
    font-size: 1.2rem;
    color: var(--accent);
    text-decoration: none;
    animation: pulse 2s ease-in-out infinite;
    display: inline-block;
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .scroll-hint:hover {
    text-decoration: none;
    opacity: 0.7;
  }

  @keyframes pulse {
    0%, 100% { transform: translateY(0); opacity: 1; }
    50% { transform: translateY(6px); opacity: 0.5; }
  }

  @media (max-width: 640px) {
    .hero {
      padding: 48px 20px 32px;
      align-items: flex-start;
    }

    .hero-inner {
      padding-top: 0;
    }

    .epigraph-area {
      margin-bottom: 2.25rem;
    }

    .epigraph {
      font-size: 0.92rem;
      line-height: 1.65;
    }

    .hero-rule {
      margin-bottom: 1.5rem;
    }

    .hero-name {
      font-size: clamp(2.6rem, 12vw, 3.4rem);
    }

    .hero-tagline {
      font-size: 0.7rem;
      letter-spacing: 0.07em;
      margin-bottom: 1.25rem;
    }

    .hero-sub {
      font-size: 0.97rem;
      line-height: 1.75;
    }

    .hero-location {
      font-size: 0.7rem;
      margin: 0 0 1.25rem 0;
    }
  }
</style>
