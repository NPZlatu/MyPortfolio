<script>
  import { observeFadeIn } from '$lib/utils/observer.js';

  const results = [
    { value: '1,800', label: 'scores from 3 judges, 4 dataset variants and 3 metrics' },
    { value: '±0.1', label: 'how far a score moves when only the judge model changes (mean absolute error 0.097)' },
    { value: '15 of 18', label: 'comparisons where the judges caught a deliberately broken answer set' },
    { value: '0.89', label: 'rank agreement between judges on Answer Correctness (0.82 Faithfulness, 0.59 Answer Relevancy)' },
  ];

  const findings = [
    ['Scores are relative, not absolute', 'Changing the judge from GPT-4o mini to Gemini 2.5 Flash-Lite or Llama 3.1 8B moved a score by about 0.1 on a 0 to 1 scale. A pass mark set on one judge does not carry to another.'],
    ['Rankings hold even when scores do not', 'The judges disagreed on the number but agreed on the order. That is enough to compare two versions of a system or to catch a regression in a CI run.'],
    ['One metric has a blind spot', 'Answer Relevancy did not drop when answers were hallucinated, on any of the three judges. It cannot be used to detect unfaithful answers. Faithfulness can.'],
    ['Disagreement is a signal', 'When judges split widely on one sample, that sample is the one worth a human look. Most samples can go through a single cheap judge.'],
  ];

  const method = [
    'WikiEval dataset, 50 questions, rebuilt into four variants: a gold set, a hallucinated set, a poor-quality set and a noisy-context set.',
    'Every variant scored by three judges on Faithfulness, Answer Relevancy and Answer Correctness, with the embedding model held constant so the judge was the only variable.',
    'Mean absolute error for score agreement, Mann-Whitney U and Kruskal-Wallis for sensitivity, Spearman rank correlation for ranking stability.',
  ];
</script>

<section id="research-section">
  <div class="section-container">
    <div class="fade-in" use:observeFadeIn>
      <h2 class="section-title">Testing AI Systems</h2>
      <p class="section-subtitle">Master's research: can you trust an automated judge?</p>
    </div>

    <div class="research-card fade-in" use:observeFadeIn>
      <div class="card-stripe"></div>
      <div class="card-body">
        <span class="card-course">Master of IT applied research · Auckland Institute of Studies</span>
        <h3 class="card-title">Reliability of RAGAS Metrics across LLM Judges</h3>
        <p class="card-summary">
          Teams that ship RAG products test them with tools like RAGAS, where one language model
          marks another model's answers. I tested the test: if you swap the judge model and change
          nothing else, do you get the same result? I built a controlled tournament to find out.
        </p>

        <dl class="result-grid">
          {#each results as r}
            <div class="result">
              <dt>{r.value}</dt>
              <dd>{r.label}</dd>
            </div>
          {/each}
        </dl>

        <h4 class="card-sub">What it means for testing an AI product</h4>
        <ul class="finding-list">
          {#each findings as f}
            <li><strong>{f[0]}.</strong> {f[1]}</li>
          {/each}
        </ul>

        <h4 class="card-sub">Method</h4>
        <ul class="finding-list method">
          {#each method as m}
            <li>{m}</li>
          {/each}
        </ul>

        <div class="tag-row">
          {#each ['RAGAS', 'LLM-as-a-judge', 'RAG evaluation', 'Python', 'Statistical testing', 'GPT-4o mini', 'Gemini', 'Llama'] as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>
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
          A Slack bot that recognises small developer wins from GitHub and Trello events, in two
          modes: a real-time notification or one daily digest. Built to compare the two against
          research on notification fatigue.
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
    background: rgba(58, 90, 64, 0.1);
    color: var(--accent-green);
    border: 1px solid rgba(58, 90, 64, 0.2);
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
  .result-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin: 0; padding: 16px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
  .result dt { font-family: var(--font-display); font-weight: 700; font-size: 1.5rem; font-variant-numeric: tabular-nums; }
  .result dd { margin: 0.2rem 0 0 0; font-size: 0.8rem; line-height: 1.5; opacity: 0.7; }
  .finding-list { margin: 0; padding-left: 1.1rem; display: flex; flex-direction: column; gap: 0.5rem; }
  .finding-list li { font-size: 0.9rem; line-height: 1.65; }
  .finding-list.method li { opacity: 0.75; font-size: 0.85rem; }
  .card-meta-bottom { opacity: 1; }
  .card-meta-bottom span { opacity: 0.5; }
  .card-summary { flex: none; }
  @media (max-width: 768px) { .result-grid { grid-template-columns: 1fr 1fr; } }

</style>
