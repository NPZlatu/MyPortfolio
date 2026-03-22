<script>
  import { observeFadeIn } from '$lib/utils/observer.js';

  const earlier = [
    {
      degree: 'Bachelor of Electronics and Communication Engineering',
      institution: 'Kantipur Engineering College, Tribhuvan University',
      location: 'Nepal',
      period: '2010 — 2014',
      grade: '72.8%',
    },
    {
      degree: 'Proficiency Certificate Level (Science & Technology)',
      institution: "St. Xavier's College, Tribhuvan University",
      location: 'Nepal',
      period: '2008 — 2010',
      grade: '69.7%',
    },
  ];

  let showCertificate = false;
</script>

{#if showCertificate}
  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
  <div class="cert-overlay" on:click={() => showCertificate = false}>
    <div class="cert-modal" on:click|stopPropagation>
      <button class="cert-close" on:click={() => showCertificate = false} aria-label="Close">✕</button>
      <img src="/academic_excellence.jpeg" alt="Certificate of Academic Excellence" class="cert-image" />
    </div>
  </div>
{/if}

<section id="education-section">
  <div class="section-container">
    <div class="fade-in" use:observeFadeIn>
      <h2 class="section-title">The Learning</h2>
      <p class="section-subtitle">Formal education and the institutions that shaped me</p>
    </div>

    <div class="education-featured fade-in" use:observeFadeIn>
      <div class="featured-stripe"></div>
      <div class="featured-body">
        <div class="featured-tag">Currently Enrolled</div>
        <h3 class="featured-degree">Master of Information Technology</h3>
        <p class="featured-institution">Auckland Institute of Studies</p>
        <p class="featured-location">Auckland, New Zealand &nbsp;·&nbsp; 2024 — Present</p>
        <p class="featured-note">
          This is where both academic research projects were developed, and where the Law Cyborg
          internship originated through the Intensive Internship Course. Supervised by Dr. Shabana Ali.
        </p>

        <button class="award-badge" on:click={() => showCertificate = true}>
          <span class="award-icon">★</span>
          <span class="award-text">
            <span class="award-title">Certificate of Academic Excellence</span>
            <span class="award-sub">Postgraduate High Achievement · Trimester 2, 2025 · Awarded 12 March 2026</span>
          </span>
          <span class="award-view">view →</span>
        </button>
      </div>
    </div>

    <div class="earlier-education fade-in" use:observeFadeIn>
      <div class="earlier-label">Earlier education</div>
      {#each earlier as edu}
        <div class="earlier-item">
          <div class="earlier-period">{edu.period}</div>
          <div class="earlier-content">
            <span class="earlier-degree">{edu.degree}</span>
            <span class="earlier-sep">·</span>
            <span class="earlier-institution">{edu.institution}</span>
            <span class="earlier-sep">·</span>
            <span class="earlier-grade">{edu.grade}</span>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .education-featured {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 2.5rem;
    display: flex;
    flex-direction: column;
  }

  .featured-stripe {
    height: 3px;
    background: var(--accent);
  }

  .featured-body {
    padding: 36px 40px;
  }

  .featured-tag {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--accent);
    margin-bottom: 0.75rem;
  }

  .featured-degree {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 0.3rem 0;
  }

  .featured-institution {
    font-family: var(--font-display);
    font-style: italic;
    font-size: 1rem;
    color: var(--text);
    opacity: 0.7;
    margin: 0 0 0.3rem 0;
  }

  .featured-location {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--accent);
    margin: 0 0 1.25rem 0;
  }

  .featured-note {
    font-size: 0.9rem;
    line-height: 1.7;
    color: var(--text);
    opacity: 0.7;
    margin: 0 0 1.5rem 0;
    max-width: 600px;
  }

  /* Award badge */
  .award-badge {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: rgba(58, 90, 64, 0.07);
    border: 1px solid rgba(58, 90, 64, 0.25);
    border-radius: 4px;
    padding: 14px 18px;
    cursor: pointer;
    text-align: left;
    transition: background 0.2s, border-color 0.2s;
    width: 100%;
    max-width: 560px;
  }

  .award-badge:hover {
    background: rgba(58, 90, 64, 0.13);
    border-color: var(--accent-green);
  }

  .award-icon {
    font-size: 1.2rem;
    color: var(--accent-green);
    flex-shrink: 0;
    line-height: 1;
  }

  .award-text {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    flex: 1;
  }

  .award-title {
    font-family: var(--font-body);
    font-weight: 700;
    font-size: 0.9rem;
    color: var(--accent-green);
  }

  .award-sub {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 0.05em;
    color: var(--text);
    opacity: 0.5;
  }

  .award-view {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    color: var(--accent-green);
    opacity: 0.6;
    flex-shrink: 0;
    letter-spacing: 0.05em;
  }

  .award-badge:hover .award-view {
    opacity: 1;
  }

  /* Certificate lightbox */
  .cert-overlay {
    position: fixed;
    inset: 0;
    background: rgba(30, 28, 26, 0.82);
    backdrop-filter: blur(6px);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  .cert-modal {
    position: relative;
    max-width: 860px;
    width: 100%;
    max-height: 90vh;
    background: var(--bg);
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid var(--border);
  }

  .cert-close {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 10;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 2px;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text);
    opacity: 0.6;
    cursor: pointer;
    padding: 6px 10px;
    min-height: 36px;
    min-width: 36px;
    transition: opacity 0.15s;
  }

  .cert-close:hover { opacity: 1; }

  .cert-image {
    width: 100%;
    height: auto;
    max-height: 90vh;
    object-fit: contain;
    display: block;
  }

  /* Earlier education */
  .earlier-label {
    font-family: var(--font-nav);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--text);
    opacity: 0.35;
    margin-bottom: 1rem;
  }

  .earlier-item {
    display: flex;
    gap: 1.5rem;
    padding: 1rem 0;
    border-top: 1px solid var(--border);
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .earlier-item:last-child {
    border-bottom: 1px solid var(--border);
  }

  .earlier-period {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--accent);
    white-space: nowrap;
    flex-shrink: 0;
    width: 100px;
    padding-top: 2px;
  }

  .earlier-content {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    align-items: baseline;
    flex: 1;
  }

  .earlier-degree {
    font-family: var(--font-body);
    font-weight: 700;
    font-size: 0.9rem;
    color: var(--text);
  }

  .earlier-sep {
    color: var(--border);
    font-size: 0.8rem;
  }

  .earlier-institution {
    font-family: var(--font-body);
    font-style: italic;
    font-size: 0.85rem;
    color: var(--text);
    opacity: 0.6;
  }

  .earlier-grade {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--accent-green);
  }

  @media (max-width: 640px) {
    .featured-body {
      padding: 24px 20px;
    }

    .earlier-item {
      flex-direction: column;
      gap: 0.3rem;
    }

    .earlier-period {
      width: auto;
    }

    .award-badge {
      gap: 0.75rem;
      padding: 12px 14px;
    }

    .award-view {
      display: none;
    }
  }
</style>
