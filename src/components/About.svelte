<script>
  import { observeFadeIn } from '$lib/utils/observer.js';

  const skills = [
    { label: 'Test automation', value: 'Playwright, Puppeteer, Selenium, Protractor, Cucumber (BDD), UI and REST API tests' },
    { label: 'Test frameworks', value: 'Vitest, Jest, Mocha, TestRail' },
    { label: 'Testing AI', value: 'LLM evaluation with RAGAS, RAG data validation, MCP tool testing across AI clients' },
    { label: 'CI/CD', value: 'GitHub Actions, Jenkins, Docker' },
    { label: 'Languages', value: 'TypeScript, JavaScript, Python, C#, SQL' },
    { label: 'Data and cloud', value: 'PostgreSQL, vector databases, AWS, Datadog, CloudWatch' },
  ];
</script>

<section id="about-section">
  <div class="section-container">
    <div class="fade-in" use:observeFadeIn>
      <h2 class="section-title">About</h2>
    </div>
    <div class="about-prose fade-in" use:observeFadeIn>
      <p>
        I started in testing properly as an SDET on MyFonts.com, Monotype's online font store.
        I wrote the browser automation, ran it in Jenkins on every build, and took the regression
        cycle from one to two days of manual checking down to a twenty minute automated run.
      </p>
      <p>
        Before and after that I built software for ten years, including leading a team and running
        the technical side of a start-up. That is why I read the code I am testing, review pull
        requests, and design a test framework the way I would design any other piece of software.
      </p>
      <p>
        At Nylon, an AI research tool for tax and law, my work has been testing-centred inside the
        data team: checking every new data source against the original, validating what feeds the
        RAG system, and testing an MCP server against Claude, ChatGPT and Gemini before release.
        My Master's research measured how far an automated LLM evaluation tool can be trusted.
      </p>
      <p>
        I am looking for a test automation or quality engineering role in Auckland, or remote within New Zealand.
      </p>
      <a class="cv-link" href="/Niraj-Paudel-CV.pdf" target="_blank" rel="noopener">Download CV →</a>
    </div>

    <div class="colophon fade-in" use:observeFadeIn>
      <p class="colophon-label">Skills</p>
      <dl class="colophon-list">
        {#each skills as skill}
          <div class="colophon-row">
            <dt>{skill.label}</dt>
            <dd>{skill.value}</dd>
          </div>
        {/each}
      </dl>
    </div>
  </div>
</section>

<style>
  .about-prose {
    max-width: var(--max-prose);
    margin: 0 0 1.75rem;
    font-size: 1.05rem;
    line-height: 1.85;
    text-align: left;
  }

  .about-prose p {
    margin-bottom: 1.1em;
  }

  .cv-link {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--accent);
    text-decoration: underline;
    text-underline-offset: 3px;
    letter-spacing: 0.04em;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  .cv-link:hover {
    text-decoration-thickness: 2px;
  }

  /* Colophon */
  .colophon {
    background: var(--bg-code);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 24px 28px;
  }

  .colophon-label {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--accent-green);
    margin: 0 0 1rem 0;
  }

  .colophon-list {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .colophon-row {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    font-family: var(--font-mono);
    font-size: 0.82rem;
    line-height: 1.5;
  }

  dt {
    color: var(--accent);
    white-space: nowrap;
    flex-shrink: 0;
  }

  dt::after {
    content: ':';
  }

  dd {
    margin: 0;
    color: var(--text);
    opacity: 0.75;
  }

  @media (max-width: 640px) {
    .about-prose {
      font-size: 1rem;
      line-height: 1.85;
      text-align: left;
    }

    .colophon {
      padding: 20px 18px;
    }

    .colophon-list {
      gap: 0.65rem;
    }

    .colophon-row {
      font-size: 0.8rem;
      flex-direction: column;
      gap: 0.15rem;
    }

    dd {
      padding-left: 0.6rem;
      opacity: 0.7;
    }
  }
</style>
