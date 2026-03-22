<script>
  import { observeFadeIn } from '$lib/utils/observer.js';

  const tier1 = [
    {
      chapter: 'Chapter I',
      company: 'Law Cyborg',
      location: 'Auckland, New Zealand',
      role: 'Software Engineer, Data Team',
      period: '2025 — Present',
      url: 'https://lawcyborg.com',
      pullQuote: 'Where the classical engineer meets the AI transition, in real time.',
      narrative: `Started as an intern through the AIS Intensive Internship Course — and was hired part-time after the internship ended, which meant something. Now working on data preparation for legal AI: building and maintaining RAG pipelines for legal question-answering across 30+ practice areas, and the Artifact System. Contributing to the platform's expansion from New Zealand into Australia and the United Kingdom. Using AI-first workflows daily — Cursor and Claude Code are part of how the work gets done.`,
      tags: ['RAG', 'TypeScript', 'Node.js', 'AWS', 'Terraform', 'Claude Code', 'Data Pipelines', 'Scrum'],
    },
    {
      chapter: 'Chapter II',
      company: 'UBA Solutions',
      location: 'Lalitpur, Nepal',
      role: 'Software Development Engineer in Test',
      period: '2019 — 2021',
      url: 'https://ubasolutions.com',
      pullQuote: 'The role where I fell in love with the craft of building software.',
      narrative: `Part of the scrum team for myfonts.com — Monotype's font distribution portal holding 43% of the online paid Latin font market. This was not just testing. I was embedded in the product team: writing automation scripts that caught regressions before they shipped, building internal tools to speed up QA, designing micro-sites and micro-services. The product was global, the team was tight, and the work had direct impact on millions of font users. This is where the craft became something I cared about deeply.`,
      tags: ['Protractor', 'Cucumber', 'Docker', 'ElasticSearch', 'React', 'Go', 'Node.js', 'Jenkins', 'Redis', 'Kubernetes', 'AWS', 'Grafana'],
    },
  ];

  const tier2 = [
    {
      company: 'UBA Solutions',
      location: 'Lalitpur, Nepal',
      role: 'Senior Software Engineer & Team Lead',
      period: '2022 — 2024',
      description: 'Led Vue2→Vue3 migration for Monotype Foundry Platform. Built the Bundles feature end-to-end (PHP Lumen + Node.js + Vue). Managed user migration from Fonts.com to MonotypeFonts.com. Implemented localised email delivery with RabbitMQ across monolith and microservices.',
    },
    {
      company: 'Business Pazes',
      location: 'Kathmandu, Nepal',
      role: 'Senior Software Engineer & CTO',
      period: '2021 — 2022',
      description: 'Led a startup as full-time CTO. Architected solutions, managed the engineering team, collaborated with marketing, ran sprints. Made strategic tech decisions for scalability and growth.',
    },
    {
      company: 'B.M. Nepal',
      location: 'Kathmandu, Nepal',
      role: 'Software Developer',
      period: '2018 — 2019',
      description: 'Built modules for Bookmundi travel booking portal: Trip Planner, Travel Experts, Notifications, Search, Maps. Full-stack with SEO focus.',
    },
    {
      company: 'Spiralogics',
      location: 'Kathmandu, Nepal',
      role: 'Full Stack Developer → Junior Developer',
      period: '2015 — 2018',
      description: 'Payment gateway integrations (Vericheck), MEAN stack applications. First professional years — learned clean code, Docker, AWS, microservices.',
    },
  ];
</script>

<section id="experience-section">
  <div class="section-container">
    <div class="fade-in" use:observeFadeIn>
      <h2 class="section-title">The Work</h2>
      <p class="section-subtitle">A decade of shipping software</p>
    </div>

    <div class="tier1-grid fade-in" use:observeFadeIn>
      {#each tier1 as job}
        <div class="chapter-card">
          <div class="chapter-label">{job.chapter}</div>
          <div class="chapter-period">{job.period}</div>
          <h3 class="chapter-company">
            <a href={job.url} target="_blank" rel="noopener noreferrer">{job.company}</a>
            <span class="chapter-location">{job.location}</span>
          </h3>
          <p class="chapter-role">{job.role}</p>
          <blockquote class="chapter-pull-quote">"{job.pullQuote}"</blockquote>
          <p class="chapter-narrative">{job.narrative}</p>
          <div class="tag-row">
            {#each job.tags as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </div>
      {/each}
    </div>

    <div class="hackathon-badge fade-in" use:observeFadeIn>
      <span class="badge-label">Hackathon</span>
      <span class="badge-title">React Riot 2018 — Hacker Favorite</span>
      <span class="badge-desc">Built <em>A Good Day to Quiz Hard</em> — a movie dialogue quiz with GIFs, hints, and scoring. Selected as Hacker Favorite by Hackbit out of all React Riot entries. Built with the team: Kushal, Abish, Dipendra &amp; Ritesh.</span>
      <button class="badge-play" id="quiz-trigger">Play it →</button>
    </div>

    <div class="other-chapters-header fade-in" use:observeFadeIn>
      <span>— other chapters —</span>
    </div>

    <div class="tier2-list fade-in" use:observeFadeIn>
      {#each tier2 as job}
        <div class="tier2-item">
          <div class="tier2-period">{job.period}</div>
          <div class="tier2-content">
            <div class="tier2-header">
              <span class="tier2-company">{job.company}</span>
              <span class="tier2-location">{job.location}</span>
              <span class="tier2-role">{job.role}</span>
            </div>
            <p class="tier2-description">{job.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .tier1-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 3rem;
  }

  .chapter-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 32px;
    transition: box-shadow 0.25s ease;
  }

  .chapter-card:hover {
    box-shadow: 0 4px 20px rgba(44, 44, 44, 0.07);
  }

  .chapter-label {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--accent-green);
    margin-bottom: 0.5rem;
  }

  .chapter-period {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--accent);
    margin-bottom: 0.75rem;
  }

  .chapter-company {
    font-family: var(--font-display);
    font-size: 1.4rem;
    font-weight: 700;
    margin: 0 0 0.2rem 0;
  }

  .chapter-company a {
    color: var(--text);
    text-decoration: none;
  }

  .chapter-company a:hover {
    color: var(--accent);
  }

  .chapter-location {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    font-weight: 400;
    color: var(--text);
    opacity: 0.45;
    letter-spacing: 0.04em;
    margin-top: 0.2rem;
  }

  .chapter-role {
    font-family: var(--font-body);
    font-style: italic;
    font-size: 0.9rem;
    color: var(--text);
    opacity: 0.65;
    margin: 0 0 1.25rem 0;
  }

  .chapter-pull-quote {
    font-family: var(--font-display);
    font-style: italic;
    font-size: 0.95rem;
    border-left: 2px solid var(--accent);
    padding: 0.25rem 1rem;
    margin: 0 0 1.25rem 0;
    color: var(--accent);
    opacity: 0.9;
  }

  .chapter-narrative {
    font-size: 0.9rem;
    line-height: 1.75;
    color: var(--text);
    opacity: 0.8;
    margin-bottom: 1.5rem;
  }

  .tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .tag {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    padding: 3px 8px;
    border-radius: 2px;
    background: rgba(58, 90, 64, 0.1);
    color: var(--accent-green);
    border: 1px solid rgba(58, 90, 64, 0.2);
    letter-spacing: 0.03em;
  }

  /* Hackathon badge */
  .hackathon-badge {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-left: 3px solid var(--accent);
    border-radius: 4px;
    padding: 20px 24px;
    margin-bottom: 2rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.6rem 1.25rem;
  }

  .badge-label {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--accent);
    flex-shrink: 0;
  }

  .badge-title {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 700;
    color: var(--text);
    flex-shrink: 0;
  }

  .badge-desc {
    font-family: var(--font-body);
    font-size: 0.85rem;
    line-height: 1.6;
    color: var(--text);
    opacity: 0.65;
    width: 100%;
  }

  .badge-play {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.07em;
    background: var(--accent);
    color: #fff;
    border: none;
    padding: 8px 18px;
    border-radius: 2px;
    cursor: pointer;
    transition: opacity 0.15s;
    min-height: 36px;
    flex-shrink: 0;
  }

  .badge-play:hover { opacity: 0.85; }

  /* Other chapters divider */
  .other-chapters-header {
    text-align: center;
    margin: 2rem 0;
    color: var(--border);
  }

  .other-chapters-header span {
    font-family: var(--font-nav);
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: lowercase;
    color: var(--text);
    opacity: 0.35;
  }

  /* Tier 2 */
  .tier2-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .tier2-item {
    display: flex;
    gap: 2rem;
    padding: 1.25rem 0;
    border-top: 1px solid var(--border);
    align-items: flex-start;
  }

  .tier2-item:last-child {
    border-bottom: 1px solid var(--border);
  }

  .tier2-period {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--accent);
    white-space: nowrap;
    flex-shrink: 0;
    width: 100px;
    padding-top: 2px;
  }

  .tier2-content {
    flex: 1;
  }

  .tier2-header {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: baseline;
    margin-bottom: 0.35rem;
  }

  .tier2-company {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1rem;
    color: var(--text);
  }

  .tier2-location {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--text);
    opacity: 0.4;
    letter-spacing: 0.03em;
  }

  .tier2-role {
    font-family: var(--font-body);
    font-style: italic;
    font-size: 0.85rem;
    color: var(--text);
    opacity: 0.6;
  }

  .tier2-description {
    font-size: 0.875rem;
    line-height: 1.65;
    color: var(--text);
    opacity: 0.7;
    margin: 0;
  }

  @media (max-width: 900px) {
    .tier1-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .tier2-item {
      flex-direction: column;
      gap: 0.4rem;
    }

    .tier2-period {
      width: auto;
    }

    .chapter-card {
      padding: 20px 16px;
    }

    .chapter-company {
      font-size: 1.2rem;
    }

    .chapter-pull-quote {
      font-size: 0.88rem;
    }

    .chapter-narrative {
      font-size: 0.85rem;
    }

    .tier2-company {
      font-size: 0.9rem;
    }

    .tier2-description {
      font-size: 0.82rem;
    }
  }
</style>
