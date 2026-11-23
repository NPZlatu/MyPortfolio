<script>
  import { observeFadeIn } from '$lib/utils/observer.js';

  const skills = [
    { label: 'Test automation', value: 'Playwright, Puppeteer, Selenium, Protractor, Cucumber (BDD), UI and REST API tests, Postman' },
    { label: 'Testing', value: 'Functional, regression, exploratory and end to end testing, test planning and strategy' },
    { label: 'Test frameworks', value: 'Vitest, Jest, Mocha, JMeter (performance testing), TestRail' },
    { label: 'Testing AI', value: 'LLM evaluation with RAGAS, RAG data validation, MCP tool testing across AI clients' },
    { label: 'CI/CD and infrastructure', value: 'GitHub Actions, Jenkins, Docker, Terraform' },
    { label: 'Languages and runtime', value: 'TypeScript, JavaScript, Node.js, Python, C#, SQL' },
    { label: 'Cloud and data', value: 'AWS (Lambda, SQS, S3, ECS), PostgreSQL, Qdrant vector database, Datadog, CloudWatch' },
  ];
</script>

<section id="about-section">
  <div class="section-container">
    <div class="fade-in" use:observeFadeIn>
      <h2 class="section-title">About</h2>
    </div>
    <div class="about-prose fade-in" use:observeFadeIn>
      <p>
        I am a software engineer. Over ten years I have built products, led a team and run the
        technical side of a start-up, and for two of those years I worked as a full-time SDET on
        MyFonts.com, Monotype's online font store. There I wrote the browser automation, ran it
        in Jenkins on every build, and took the regression cycle from one to two days of manual
        checking down to a twenty minute automated run.
      </p>
      <p>
        At Nylon, an AI research tool for tax and law, I work as a software engineer on the data
        team in an AI-assisted workflow. I build and test end to end: data ingestion pipelines on
        Node.js and AWS that load a Qdrant vector database, an MCP server tested against Claude,
        ChatGPT and Gemini, and Playwright end to end tests wired into CI.
      </p>
      <p>
        Working that way changed what I think the job is. As AI writes more of the code, the
        harder and more valuable work is proving that what it built is correct: is the data
        complete, is the answer right, did the release break anything. That is the work I enjoy
        most, and it is where I am taking my career. My Master's research went the same way: it
        measured how far an automated LLM evaluation tool can be trusted.
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
