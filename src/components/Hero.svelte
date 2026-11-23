<script>
  const facts = [
    { value: 'SDET', label: 'Two years of full-time test automation on Monotype’s MyFonts.com' },
    { value: '1–2 days → 20 min', label: 'Regression cycle after moving the suite into CI' },
    { value: 'AI systems', label: 'Built and tested: an MCP server, RAG data pipelines and LLM evaluation' },
    { value: '10 years', label: 'Building software, so I read the code I test' },
  ];
</script>

<section id="hero-section" class="hero">
  <div class="hero-inner">
    <p class="hero-tagline">SDET &nbsp;·&nbsp; Test Automation Engineer &nbsp;·&nbsp; Software Engineering background</p>
    <h1 class="hero-name">Niraj Paudel</h1>
    <p class="hero-sub">
      Software engineer with ten years of building products, two of them as a full-time SDET.
      As AI writes more of the code, the harder and more valuable work is proving that what
      it built is correct. That is where I am taking my career: test automation and quality engineering.
    </p>
    <p class="hero-location">Auckland, New Zealand &nbsp;·&nbsp; NZ resident, full work rights</p>

    <div class="hero-actions">
      <a class="btn btn-primary" href="/Niraj-Paudel-CV.pdf" target="_blank" rel="noopener">Download CV</a>
      <a class="btn" href="https://github.com/NPZlatu" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a class="btn" href="https://www.linkedin.com/in/itsmenirajpaudel/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    </div>

    <dl class="hero-facts">
      {#each facts as fact}
        <div class="fact">
          <dt>{fact.value}</dt>
          <dd>{fact.label}</dd>
        </div>
      {/each}
    </dl>
  </div>
</section>

<style>
  .hero {
    padding: 72px 24px 48px;
  }

  .hero-inner {
    max-width: var(--max-wide);
    margin: 0 auto;
  }

  .hero-tagline {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent);
    margin: 0 0 0.75rem 0;
  }

  .hero-name {
    font-family: var(--font-display);
    font-size: clamp(2.6rem, 7vw, 4.5rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    margin: 0 0 1rem 0;
    line-height: 1.05;
  }

  .hero-sub {
    font-size: 1.15rem;
    line-height: 1.7;
    max-width: 640px;
    margin: 0 0 0.75rem 0;
  }

  .hero-location {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    letter-spacing: 0.04em;
    opacity: 0.6;
    margin: 0 0 1.75rem 0;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 2.5rem;
  }

  .btn {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    letter-spacing: 0.04em;
    padding: 10px 18px;
    border: 1px solid var(--text);
    border-radius: 3px;
    color: var(--text);
    text-decoration: none;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    transition: background 0.15s, color 0.15s;
  }

  .btn:hover {
    background: var(--text);
    color: var(--bg);
    text-decoration: none;
  }

  .btn-primary {
    background: var(--accent);
    border-color: var(--accent);
    color: #fff;
  }

  .btn-primary:hover {
    background: var(--text);
    border-color: var(--text);
  }

  .hero-facts {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    margin: 0;
    border-top: 1px solid var(--border);
  }

  .fact {
    padding: 18px 20px 0 0;
  }

  .fact dt {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.05rem;
    margin-bottom: 0.3rem;
  }

  .fact dd {
    margin: 0;
    font-size: 0.85rem;
    line-height: 1.5;
    opacity: 0.7;
  }

  @media (max-width: 900px) {
    .hero-facts {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 640px) {
    .hero {
      padding: 40px 20px 32px;
    }

    .hero-sub {
      font-size: 1.02rem;
    }

    .hero-facts {
      grid-template-columns: 1fr;
    }
  }
</style>
