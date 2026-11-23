<script>
  import { observeFadeIn } from '$lib/utils/observer.js';

  const findings = [
    ['The markers agreed on which answers were better', 'So the tool is reliable for comparing two versions of a system, or for catching a drop in quality after a change.'],
    ['They did not agree on the exact score', 'The same answer got marks about 10% apart depending on which AI did the marking. A fixed pass mark is not safe.'],
    ['One of the three measures missed made-up answers', 'It gave invented answers the same mark as correct ones, with every marker. The other two measures caught them.'],
  ];

  const numbers = [
    { value: '3', label: 'AI markers compared: GPT-4o mini, Gemini and Llama' },
    { value: '1,800', label: 'marks collected and analysed' },
    { value: '15 of 18', label: 'times the markers correctly spotted a deliberately bad answer set' },
  ];
</script>

<section id="research-section">
  <div class="section-container">
    <div class="fade-in" use:observeFadeIn>
      <h2 class="section-title">Research</h2>
      <p class="section-subtitle">Can you trust an AI to mark another AI's answers?</p>
    </div>

    <div class="research-card fade-in" use:observeFadeIn>
      <div class="card-stripe"></div>
      <div class="card-body">
        <span class="card-course">Master of IT applied research · Auckland Institute of Studies · 2026</span>
        <h3 class="card-title">Reliability of RAGAS Metrics across LLM Judges</h3>
        <p class="card-summary">
          Companies test AI products with tools where one AI model marks another model's answers.
          I checked whether the marker itself can be trusted. I gave the same answers to three
          different AI markers and compared the marks they gave.
        </p>

        <p class="card-result">
          <strong>The result:</strong> you can trust it to compare, but not for exact scores.
        </p>

        <ul class="finding-list">
          {#each findings as f}
            <li><strong>{f[0]}.</strong> {f[1]}</li>
          {/each}
        </ul>

        <dl class="result-grid">
          {#each numbers as n}
            <div class="result">
              <dt>{n.value}</dt>
              <dd>{n.label}</dd>
            </div>
          {/each}
        </dl>

        <p class="card-summary">
          Why it matters for testing: before you rely on an automated check, test the check itself.
        </p>

        <div class="card-meta-bottom">
          <a href="https://github.com/NPZlatu/RAGAS-LLM-Judge-Reliability-Study" target="_blank" rel="noopener noreferrer">Code and results on GitHub →</a>
          <span class="card-dot">·</span>
          <span>Supervisor: Dr. Shabana Ali</span>
        </div>
      </div>
    </div>

    <div class="research-card secondary fade-in" use:observeFadeIn>
      <div class="card-body">
        <span class="card-course">Master of IT specialised project · 2024</span>
        <h3 class="card-title">“Small Wins” Slack Bot</h3>
        <p class="card-summary">
          A Slack bot that recognises small developer wins from GitHub and Trello events, either
          as they happen or in one daily digest.
        </p>
        <div class="card-meta-bottom">
          <a href="https://github.com/NPZlatu/dual-mode-recognition-slack-bot" target="_blank" rel="noopener noreferrer">Code on GitHub →</a>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .research-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .research-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .card-stripe {
    height: 3px;
    background: var(--accent);
    flex-shrink: 0;
  }

  .card-body {
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
  }

  .card-meta-top {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .card-course {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent-green);
  }

  .card-title {
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 700;
    line-height: 1.3;
    margin: 0;
  }

  .card-summary {
    font-size: 0.9rem;
    line-height: 1.75;
    color: var(--text);
    opacity: 0.75;
    margin: 0;
    flex: 1;
  }

  .tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  .tag {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    padding: 3px 7px;
    border-radius: 2px;
    background: var(--bg-code);
    color: var(--accent-green);
    border: 1px solid var(--border);
    letter-spacing: 0.02em;
  }

  .card-meta-bottom {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--text);
    opacity: 0.45;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    align-items: center;
  }

  .card-dot {
    opacity: 0.4;
  }

  @media (max-width: 768px) {
    .research-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .card-body {
      padding: 24px 20px;
    }
  }

  .research-card.secondary { margin-top: 24px; }
  .card-sub { font-family: var(--font-mono); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--accent); margin: 0.5rem 0 0 0; }
  .card-result { font-size: 1.1rem; line-height: 1.5; margin: 0; padding: 12px 16px; background: var(--bg-code); border-left: 3px solid var(--accent); border-radius: 3px; }
  .result-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 0; padding: 16px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
  .result dt { font-family: var(--font-display); font-weight: 700; font-size: 1.5rem; font-variant-numeric: tabular-nums; }
  .result dd { margin: 0.2rem 0 0 0; font-size: 0.8rem; line-height: 1.5; opacity: 0.7; }
  .finding-list { margin: 0; padding-left: 1.1rem; display: flex; flex-direction: column; gap: 0.5rem; }
  .finding-list li { font-size: 0.9rem; line-height: 1.65; }
  .finding-list.method li { opacity: 0.75; font-size: 0.85rem; }
  .card-meta-bottom { opacity: 1; }
  .card-meta-bottom span { opacity: 0.5; }
  .card-summary { flex: none; }
  @media (max-width: 768px) { .result-grid { grid-template-columns: 1fr; } }

</style>
