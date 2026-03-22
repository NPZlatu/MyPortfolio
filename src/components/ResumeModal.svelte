<script>
  import { createEventDispatcher } from 'svelte';
  import { fade, scale } from 'svelte/transition';

  const dispatch = createEventDispatcher();

  const CSS = `
    *, *::before, *::after { box-sizing: border-box; }
    body { margin: 0; padding: 32px 48px; font-family: 'Lora', Georgia, serif; color: #2C2C2C; background: #fff; }
    a { color: inherit; text-decoration: none; }
    .r-header { text-align: center; margin-bottom: 1.5rem; }
    .r-name { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 2.2rem; font-weight: 700; margin: 0 0 0.2rem 0; }
    .r-title { font-family: 'Lora', Georgia, serif; font-style: italic; font-size: 1rem; color: #B85C38; margin: 0 0 0.75rem 0; }
    .r-contact { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; letter-spacing: 0.03em; color: #555; display: flex; flex-wrap: wrap; justify-content: center; gap: 0.3rem 0.5rem; align-items: center; }
    .r-sep { opacity: 0.4; }
    .r-rule { border: none; border-top: 1px solid #D4CFC7; margin: 1.25rem 0; }
    .r-section { margin-bottom: 1.5rem; }
    .r-section-title { font-family: 'Cormorant Garamond', serif; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.18em; color: #B85C38; margin: 0 0 0.75rem 0; padding-bottom: 0.35rem; border-bottom: 1px solid #D4CFC7; }
    .r-body { font-size: 0.87rem; line-height: 1.75; margin: 0; color: #444; }
    .r-job { margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #EDE8DE; page-break-inside: avoid; }
    .r-job:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
    .r-job-header { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.3rem 0.5rem; margin-bottom: 0.1rem; }
    .r-company { font-family: 'Cormorant Garamond', serif; font-size: 1.02rem; font-weight: 700; }
    .r-job-sep { color: #D4CFC7; }
    .r-role { font-style: italic; font-size: 0.87rem; color: #555; flex: 1; }
    .r-period { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; color: #B85C38; white-space: nowrap; margin-left: auto; }
    .r-location { font-family: 'JetBrains Mono', monospace; font-size: 0.63rem; color: #888; margin: 0 0 0.4rem 0; }
    .r-desc { font-size: 0.86rem; line-height: 1.68; color: #444; margin: 0 0 0.4rem 0; }
    .r-tags { font-family: 'JetBrains Mono', monospace; font-size: 0.63rem; color: #3A5A40; margin: 0; }
    .r-skills { display: flex; flex-direction: column; gap: 0.35rem; }
    .r-skill-row { display: flex; gap: 0.75rem; font-family: 'JetBrains Mono', monospace; font-size: 0.76rem; line-height: 1.5; }
    .r-skill-label { color: #B85C38; white-space: nowrap; width: 110px; flex-shrink: 0; }
    .r-skill-value { color: #444; }
    @media print { body { padding: 16px 24px; } }
  `;

  function download() {
    const resumeEl = document.getElementById('resume-area');
    if (!resumeEl) return;

    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;';
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(`<!DOCTYPE html><html><head><meta charset="utf-8">
      <title>Niraj Paudel — Resume</title>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
      <style>${CSS}</style>
      </head><body>${resumeEl.innerHTML}</body></html>`);
    doc.close();

    // Wait for fonts to load then print
    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => document.body.removeChild(iframe), 1000);
    }, 800);
  }

  /** @param {KeyboardEvent} e */
  function handleKeydown(e) {
    if (e.key === 'Escape') dispatch('close');
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<div class="overlay" on:click|self={() => dispatch('close')} transition:fade={{ duration: 200 }}>
  <div class="modal" transition:scale={{ duration: 250, start: 0.97 }}>

    <div class="modal-toolbar">
      <span class="toolbar-label">Resume Preview</span>
      <div class="toolbar-actions">
        <button class="btn-download" on:click={download}>Download PDF ↓</button>
        <button class="btn-close" on:click={() => dispatch('close')} aria-label="Close">✕</button>
      </div>
    </div>

    <div class="resume-scroll">
      <div id="resume-area">

        <!-- Header -->
        <div class="r-header">
          <h1 class="r-name">Niraj Paudel</h1>
          <p class="r-title">Software Engineer</p>
          <div class="r-contact">
            <span>Auckland, New Zealand</span>
            <span class="r-sep">·</span>
            <a href="mailto:itsmenirajpaudel@gmail.com">itsmenirajpaudel@gmail.com</a>
            <span class="r-sep">·</span>
            <span>+64 021 025 24460</span>
            <span class="r-sep">·</span>
            <a href="https://linkedin.com/in/itsmenirajpaudel" target="_blank" rel="noopener">linkedin.com/in/itsmenirajpaudel</a>
            <span class="r-sep">·</span>
            <a href="https://github.com/NPZlatu" target="_blank" rel="noopener">github.com/NPZlatu</a>
          </div>
        </div>

        <div class="r-rule"></div>

        <!-- Profile -->
        <div class="r-section">
          <h2 class="r-section-title">Profile</h2>
          <p class="r-body">
            Software engineer with ten years of experience across full-stack development, testing, team leadership,
            and AI-assisted engineering. Built products for companies in Nepal and overseas, led engineering teams,
            and now working on legal AI at Law Cyborg in Auckland. Strong focus on correctness, TDD, and building
            systems that hold up. Currently pursuing a Master of Information Technology at Auckland Institute of Studies.
          </p>
        </div>

        <!-- Experience -->
        <div class="r-section">
          <h2 class="r-section-title">Experience</h2>

          <div class="r-job">
            <div class="r-job-header">
              <span class="r-company">Law Cyborg</span>
              <span class="r-job-sep">·</span>
              <span class="r-role">Software Engineer, Data Team</span>
              <span class="r-period">2025 — Present</span>
            </div>
            <p class="r-location">Auckland, New Zealand</p>
            <p class="r-desc">
              Building and maintaining RAG pipelines for legal question-answering across 30+ practice areas.
              Contributing to the Artifact System and platform expansion from New Zealand into Australia and the United Kingdom.
              AI-first workflows daily — Cursor and Claude Code are part of how the work gets done.
              Originated as an intern through the AIS Intensive Internship Course; hired part-time after internship ended.
            </p>
            <p class="r-tags">TypeScript · Node.js · AWS · Terraform · RAG · Claude Code · Scrum</p>
          </div>

          <div class="r-job">
            <div class="r-job-header">
              <span class="r-company">UBA Solutions</span>
              <span class="r-job-sep">·</span>
              <span class="r-role">Senior Software Engineer &amp; Team Lead</span>
              <span class="r-period">2022 — 2024</span>
            </div>
            <p class="r-location">Lalitpur, Nepal</p>
            <p class="r-desc">
              Led Vue 2 → Vue 3 migration for the Monotype Foundry Platform. Built the Bundles feature end-to-end
              (PHP Lumen + Node.js + Vue). Managed user migration from Fonts.com to MonotypeFonts.com.
              Implemented localised email delivery with RabbitMQ across monolith and microservices.
            </p>
            <p class="r-tags">Vue.js · PHP Lumen · Node.js · RabbitMQ · PostgreSQL</p>
          </div>

          <div class="r-job">
            <div class="r-job-header">
              <span class="r-company">Business Pazes</span>
              <span class="r-job-sep">·</span>
              <span class="r-role">Senior Software Engineer &amp; CTO</span>
              <span class="r-period">2021 — 2022</span>
            </div>
            <p class="r-location">Kathmandu, Nepal</p>
            <p class="r-desc">
              Led a startup as full-time CTO. Architected solutions, managed the engineering team,
              collaborated with marketing, ran sprints, and made strategic tech decisions for scalability and growth.
            </p>
          </div>

          <div class="r-job">
            <div class="r-job-header">
              <span class="r-company">UBA Solutions</span>
              <span class="r-job-sep">·</span>
              <span class="r-role">Software Development Engineer in Test</span>
              <span class="r-period">2019 — 2021</span>
            </div>
            <p class="r-location">Lalitpur, Nepal</p>
            <p class="r-desc">
              Embedded in the scrum team for myfonts.com — Monotype's font distribution portal holding 43% of the
              online paid Latin font market. Wrote automation scripts, built internal tools to speed up QA,
              and designed micro-sites and micro-services.
            </p>
            <p class="r-tags">Protractor · Cucumber · Docker · ElasticSearch · React · Go · Node.js · Jenkins · Redis · Kubernetes · AWS · Grafana</p>
          </div>

          <div class="r-job">
            <div class="r-job-header">
              <span class="r-company">B.M. Nepal (Bookmundi)</span>
              <span class="r-job-sep">·</span>
              <span class="r-role">Software Developer</span>
              <span class="r-period">2018 — 2019</span>
            </div>
            <p class="r-location">Kathmandu, Nepal</p>
            <p class="r-desc">
              Built modules for the Bookmundi travel booking portal: Trip Planner, Travel Experts, Notifications,
              Search, Maps. Full-stack with SEO focus.
            </p>
          </div>

          <div class="r-job">
            <div class="r-job-header">
              <span class="r-company">Spiralogics</span>
              <span class="r-job-sep">·</span>
              <span class="r-role">Full Stack Developer</span>
              <span class="r-period">2015 — 2018</span>
            </div>
            <p class="r-location">Kathmandu, Nepal</p>
            <p class="r-desc">
              Payment gateway integrations (Vericheck), MEAN stack applications.
              First professional years — learned clean code, Docker, AWS, and microservices.
            </p>
          </div>
        </div>

        <!-- Research -->
        <div class="r-section">
          <h2 class="r-section-title">Research</h2>

          <div class="r-job">
            <div class="r-job-header">
              <span class="r-company">Reliability of RAGAS Metrics across LLM Judges</span>
              <span class="r-period">2025 — Present</span>
            </div>
            <p class="r-desc">
              COMP903, Auckland Institute of Studies. Tournament methodology with WikiEval dataset,
              4 quality variants, comparing GPT-4o mini / Llama-3.1-8B / Gemini-1.5-Flash.
            </p>
            <p class="r-tags">RAG · RAGAS · LLM-as-Judge · NLP Evaluation</p>
          </div>

          <div class="r-job">
            <div class="r-job-header">
              <span class="r-company">"Small Wins" Slack Bot</span>
              <span class="r-period">2024</span>
            </div>
            <p class="r-desc">
              COMP902, Auckland Institute of Studies. Two delivery modes (real-time + daily digest)
              for team recognition. Built with Node.js, Slack API, GitHub/Trello webhooks, PostgreSQL.
            </p>
            <p class="r-tags">Slack API · Node.js · Webhooks · PostgreSQL · Behavioral Design</p>
          </div>
        </div>

        <!-- Education -->
        <div class="r-section">
          <h2 class="r-section-title">Education</h2>

          <div class="r-job">
            <div class="r-job-header">
              <span class="r-company">Auckland Institute of Studies</span>
              <span class="r-period">2024 — Present</span>
            </div>
            <p class="r-desc">
              Master of Information Technology · Supervised by Dr. Shabana Ali
              <br>
              <em>Certificate of Academic Excellence — Postgraduate High Achievement, Trimester 2 2025</em>
            </p>
          </div>

          <div class="r-job">
            <div class="r-job-header">
              <span class="r-company">Kantipur Engineering College, Tribhuvan University</span>
              <span class="r-period">2010 — 2014</span>
            </div>
            <p class="r-desc">Bachelor of Electronics and Communication Engineering · 72.8%</p>
          </div>
        </div>

        <!-- Skills -->
        <div class="r-section">
          <h2 class="r-section-title">Skills</h2>
          <div class="r-skills">
            <div class="r-skill-row">
              <span class="r-skill-label">Fluent in</span>
              <span class="r-skill-value">JavaScript, TypeScript, Python, C#, Rust, PHP</span>
            </div>
            <div class="r-skill-row">
              <span class="r-skill-label">Practiced in</span>
              <span class="r-skill-value">Node.js, React, Vue, .NET, Django, SvelteKit</span>
            </div>
            <div class="r-skill-row">
              <span class="r-skill-label">Versed in</span>
              <span class="r-skill-value">PostgreSQL, MongoDB, Redis, ElasticSearch</span>
            </div>
            <div class="r-skill-row">
              <span class="r-skill-label">Familiar with</span>
              <span class="r-skill-value">Azure, AWS, Docker, Terraform, CI/CD, Scrum</span>
            </div>
            <div class="r-skill-row">
              <span class="r-skill-label">Exploring</span>
              <span class="r-skill-value">RAG pipelines, AI workflows, LLM evaluation</span>
            </div>
          </div>
        </div>

      </div><!-- /resume-area -->
    </div><!-- /resume-scroll -->

  </div>
</div>

<style>
  /* --- Modal chrome --- */
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(30, 28, 26, 0.75);
    backdrop-filter: blur(6px);
    z-index: 200;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 24px 16px;
  }

  .modal {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    width: 100%;
    max-width: 780px;
    max-height: calc(100vh - 48px);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .modal-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 24px;
    border-bottom: 1px solid var(--border);
    background: var(--bg);
    flex-shrink: 0;
  }

  .toolbar-label {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--text);
    opacity: 0.4;
  }

  .toolbar-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .btn-download {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.06em;
    background: var(--accent);
    color: #fff;
    border: none;
    border-radius: 2px;
    padding: 8px 16px;
    cursor: pointer;
    min-height: 36px;
    transition: opacity 0.15s;
  }
  .btn-download:hover { opacity: 0.85; }

  .btn-close {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    background: none;
    border: 1px solid var(--border);
    color: var(--text);
    opacity: 0.45;
    border-radius: 2px;
    padding: 6px 10px;
    cursor: pointer;
    min-height: 36px;
    min-width: 36px;
    transition: opacity 0.15s;
  }
  .btn-close:hover { opacity: 1; }

  .resume-scroll {
    overflow-y: auto;
    flex: 1;
    padding: 40px 52px;
  }

  /* --- Resume document --- */
  #resume-area {
    font-family: 'Lora', Georgia, serif;
    color: #2C2C2C;
    max-width: 680px;
    margin: 0 auto;
  }

  .r-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .r-name {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 2.4rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    margin: 0 0 0.2rem 0;
    color: #2C2C2C;
  }

  .r-title {
    font-family: 'Lora', Georgia, serif;
    font-style: italic;
    font-size: 1rem;
    color: #B85C38;
    margin: 0 0 0.75rem 0;
  }

  .r-contact {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.03em;
    color: #2C2C2C;
    opacity: 0.6;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.3rem 0.5rem;
    align-items: center;
  }

  .r-contact a {
    color: inherit;
    text-decoration: none;
  }
  .r-contact a:hover { color: #B85C38; opacity: 1; }

  .r-sep {
    opacity: 0.35;
  }

  .r-rule {
    border: none;
    border-top: 1px solid #D4CFC7;
    margin: 1.25rem 0;
  }

  .r-section {
    margin-bottom: 1.75rem;
  }

  .r-section-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: #B85C38;
    margin: 0 0 0.85rem 0;
    padding-bottom: 0.4rem;
    border-bottom: 1px solid #D4CFC7;
  }

  .r-body {
    font-size: 0.9rem;
    line-height: 1.75;
    margin: 0;
    color: #2C2C2C;
    opacity: 0.8;
  }

  .r-job {
    margin-bottom: 1.1rem;
    padding-bottom: 1.1rem;
    border-bottom: 1px solid #EDE8DE;
  }

  .r-job:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .r-job-header {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.3rem 0.5rem;
    margin-bottom: 0.1rem;
  }

  .r-company {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.05rem;
    font-weight: 700;
    color: #2C2C2C;
  }

  .r-job-sep {
    color: #D4CFC7;
    font-size: 0.8rem;
  }

  .r-role {
    font-family: 'Lora', Georgia, serif;
    font-style: italic;
    font-size: 0.88rem;
    color: #2C2C2C;
    opacity: 0.65;
    flex: 1;
  }

  .r-period {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    color: #B85C38;
    white-space: nowrap;
    margin-left: auto;
  }

  .r-location {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    color: #2C2C2C;
    opacity: 0.4;
    margin: 0 0 0.5rem 0;
    letter-spacing: 0.03em;
  }

  .r-desc {
    font-size: 0.88rem;
    line-height: 1.7;
    color: #2C2C2C;
    opacity: 0.75;
    margin: 0 0 0.5rem 0;
  }

  .r-tags {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    color: #3A5A40;
    opacity: 0.8;
    margin: 0;
    letter-spacing: 0.03em;
  }

  /* Skills */
  .r-skills {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .r-skill-row {
    display: flex;
    gap: 0.75rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.78rem;
    line-height: 1.5;
  }

  .r-skill-label {
    color: #B85C38;
    white-space: nowrap;
    flex-shrink: 0;
    width: 110px;
  }

  .r-skill-value {
    color: #2C2C2C;
    opacity: 0.72;
  }

  @media (max-width: 640px) {
    .resume-scroll { padding: 24px 20px; }
    .r-name { font-size: 1.8rem; }
    .r-contact { font-size: 0.62rem; }
    .r-skill-row { flex-direction: column; gap: 0.1rem; }
    .r-skill-label { width: auto; }
    .r-period { margin-left: 0; }
  }
</style>
