<script>
  import { observeFadeIn } from '$lib/utils/observer.js';

  const tier1 = [
    {
      company: 'Nylon (formerly Law Cyborg)',
      location: 'Auckland, New Zealand',
      role: 'Software Engineer, Data Team',
      period: 'May 2025 — Present',
      url: 'https://usenylon.com',
      summary: 'AI research tools for tax and law professionals. Software engineer on the data team. My work is half building and half verification, both with AI.',
      points: [
        ['Knowledge base pipeline', 'My main work: built scrapers and ingestion for legal sources across New Zealand, Australia and the UK on Node.js, AWS Lambda and SQS, loading a Qdrant vector database. Includes Puppeteer scrapers for sites behind Cloudflare and Akamai.'],
        ['Weekly scraper runs', 'Ran the weekly scraper across the legal sources on staging and production, reviewed what changed, and manually verified the results before they reached production.'],
        ['Data validation', 'Checked each new source against the original site: record counts, broken links, missing and duplicate documents, and whether a search returns the right text. Wrote the staging to production sync for Qdrant with a dry run and an ID-by-ID parity check.'],
        ['Monitoring', 'Set up Datadog monitoring for the pipeline, showing what each step is processing and where a run fails.'],
        ['MCP server', 'Built the MCP server that puts Nylon’s legal search inside Claude, ChatGPT and Gemini, and tested the OAuth 2.1 sign-in and every tool against each client before release.'],
        ['End to end tests', 'Added Playwright end to end tests, written with Claude Code, to the web app’s GitHub Actions pipeline.'],
      ],
      tags: ['Claude Code', 'MCP', 'Playwright', 'Puppeteer', 'Vitest', 'Jest', 'GitHub Actions', 'TypeScript', 'Node.js', 'AWS Lambda', 'Terraform', 'Qdrant', 'PostgreSQL', 'Datadog'],
    },
    {
      company: 'UBA Solutions (client: Monotype, USA)',
      location: 'Lalitpur, Nepal',
      role: 'Software Development Engineer in Test',
      period: 'May 2019 — Jan 2021',
      url: 'https://www.myfonts.com',
      summary: 'Full-time test automation on MyFonts.com, Monotype’s online font store, inside the product’s Scrum team.',
      points: [
        ['Automation', 'Wrote browser and API tests in Protractor, Selenium and Cucumber for the main site, its micro-sites and its microservices, turning acceptance criteria into scenarios the whole team could read.'],
        ['Regression', 'Cut the regression cycle from one to two days of manual checking to a twenty minute automated run.'],
        ['CI and performance', 'Ran the suites in Jenkins on every build and investigated each failure. Load tested services with JMeter.'],
        ['Functional testing', 'Tested new features by hand before automating them, reported bugs with clear steps, and retested each fix.'],
        ['Test management', 'Kept test cases and runs current in TestRail so the team could see what each release covered.'],
      ],
      tags: ['Protractor', 'Selenium', 'Cucumber', 'JMeter', 'Postman', 'Jenkins', 'TestRail', 'Docker'],
    },
  ];

  const tier2 = [
    {
      company: 'UBA Solutions (client: Monotype, USA)',
      location: 'Lalitpur, Nepal',
      role: 'Senior Software Engineer and Team Lead',
      period: '2022 — 2024',
      description: 'Returned to the MyFonts team as a developer. Moved the site from Vue 2 to Vue 3 and built the Bundles feature, with tests for each release. Reviewed code and coached less experienced teammates.',
    },
    {
      company: 'Business Pazes',
      location: 'Kathmandu, Nepal',
      role: 'Senior Software Engineer and CTO',
      period: '2021 — 2022',
      description: 'Ran the technical side of a start-up hands-on: chose the stack, built the product with a small team, and set up code review and testing before every release.',
    },
    {
      company: 'B.M. Nepal and Spiralogics',
      location: 'Kathmandu, Nepal',
      role: 'Software Developer',
      period: '2015 — 2019',
      description: 'Built modules for the Bookmundi travel booking site, payment gateway integrations, and web applications on the MEAN stack.',
    },
  ];
</script>

<section id="experience-section">
  <div class="section-container">
    <div class="fade-in" use:observeFadeIn>
      <h2 class="section-title">Experience</h2>
      <p class="section-subtitle">Software engineering and test automation</p>
    </div>

    <div class="tier1-grid fade-in" use:observeFadeIn>
      {#each tier1 as job}
        <div class="chapter-card">
          <div class="chapter-period">{job.period}</div>
          <h3 class="chapter-company">
            <a href={job.url} target="_blank" rel="noopener noreferrer">{job.company}</a>
            <span class="chapter-location">{job.location}</span>
          </h3>
          <p class="chapter-role">{job.role}</p>
          <p class="chapter-narrative">{job.summary}</p>
          <ul class="chapter-points">
            {#each job.points as point}
              <li><strong>{point[0]}.</strong> {point[1]}</li>
            {/each}
          </ul>
          <div class="tag-row">
            {#each job.tags as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </div>
      {/each}
    </div>

    <div class="other-chapters-header fade-in" use:observeFadeIn>
      <span>earlier software engineering</span>
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
    grid-template-columns: 1fr;
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
    font-size: 0.78rem;
    border-left: 2px solid var(--accent);
    padding: 0.25rem 1rem;
    margin: 0 0 1.25rem 0;
    color: var(--accent);
    opacity: 0.65;
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
    background: var(--bg-code);
    color: var(--accent-green);
    border: 1px solid var(--border);
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
      font-size: 0.75rem;
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

  .chapter-narrative { margin-bottom: 1rem; }
  .chapter-role { font-style: normal; font-weight: 600; opacity: 0.85; margin-bottom: 0.75rem; }
  .chapter-narrative, .chapter-points { max-width: 820px; }
  .chapter-points { margin: 0 0 1.5rem 0; padding-left: 1.1rem; display: flex; flex-direction: column; gap: 0.55rem; }
  .chapter-points li { font-size: 0.9rem; line-height: 1.6; }
  .chapter-points strong { font-weight: 600; }
  .tier2-role { font-style: normal; }

</style>
