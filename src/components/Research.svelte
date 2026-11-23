<script>
  import { observeFadeIn } from '$lib/utils/observer.js';

  const terms = [
    ['LLM', 'Large language model: the kind of AI behind ChatGPT, Claude and Gemini.'],
    ['RAG', 'Retrieval-augmented generation: an LLM that looks up the relevant documents first, then answers from them, like an open-book exam.'],
    ['RAGAS', 'A tool that scores RAG answers automatically. It uses a second LLM as the judge and gives each answer a score from 0 to 1.'],
  ];

  const findings = [
    {
      title: 'The LLM judges agreed on which answers were better',
      text: 'When one judge ranked an answer high, the others did too.',
      number: '0.89',
      unit: 'agreement out of 1',
    },
    {
      title: 'They did not agree on the exact score',
      text: 'The same answer got a different score depending on which LLM judged it.',
      number: '±0.1',
      unit: 'gap between judges',
    },
    {
      title: 'One of the three metrics missed hallucinated answers',
      text: 'Answer Relevancy scored hallucinated answers 0.84 and correct ones 0.85. Faithfulness caught them: 0.94 dropped to 0.40.',
      number: '0.84',
      unit: 'for a hallucinated answer',
    },
  ];
</script>

<section id="research-section">
  <div class="section-container">
    <div class="fade-in" use:observeFadeIn>
      <h2 class="section-title">Research</h2>
      <p class="section-subtitle">Can you trust one LLM to judge another LLM's answers?</p>
    </div>

    <div class="research-card fade-in" use:observeFadeIn>
      <div class="card-stripe"></div>
      <div class="card-body">
        <span class="card-course">Master of IT research · Auckland Institute of Studies · 2026</span>
        <h3 class="card-title">Testing the tool that tests LLMs</h3>

        <dl class="terms">
          {#each terms as t}
            <div class="term">
              <dt>{t[0]}</dt>
              <dd>{t[1]}</dd>
            </div>
          {/each}
        </dl>

        <div class="story">
          <div class="story-row">
            <h4>The question</h4>
            <p>If an LLM is the judge, can we trust its scores? Would a different LLM judge give the same score?</p>
          </div>
          <div class="story-row">
            <h4>What I did</h4>
            <p>
              I took 50 questions with correct answers, then made three bad copies on purpose:
              hallucinated answers, incomplete answers, and answers with irrelevant context added.
              I had three different LLM judges (GPT-4o mini, Gemini and Llama) score all of
              them, 1,800 scores in total, and compared the results.
            </p>
          </div>
        </div>

        <p class="card-result">
          <strong>The result:</strong> good enough to compare two versions, not good enough to trust the exact score.
        </p>

        <div class="finding-grid">
          {#each findings as f}
            <div class="finding">
              <div class="finding-number">{f.number}</div>
              <div class="finding-unit">{f.unit}</div>
              <h4>{f.title}</h4>
              <p>{f.text}</p>
            </div>
          {/each}
        </div>

        <p class="card-takeaway">The lesson for testing: check your testing tools too. They can be wrong.</p>

        <div class="card-meta-bottom">
          <a href="https://github.com/NPZlatu/RAGAS-LLM-Judge-Reliability-Study" target="_blank" rel="noopener noreferrer">Full results on GitHub →</a>
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


  .terms { margin: 0; display: grid; grid-template-columns: 1fr 1.4fr 1.4fr; gap: 12px; }
  .term { background: var(--bg-code); border-radius: 4px; padding: 14px 16px; min-width: 0; }
  .term dt { font-family: var(--font-mono); font-size: 0.8rem; font-weight: 500; color: var(--accent); margin-bottom: 0.3rem; }
  .term dd { margin: 0; font-size: 0.9rem; line-height: 1.6; }
  .story { display: flex; flex-direction: column; gap: 1rem; }
  .story-row h4, .finding h4 { font-family: var(--font-display); font-size: 0.98rem; font-weight: 700; margin: 0 0 0.3rem 0; }
  .story-row p { margin: 0; font-size: 0.95rem; line-height: 1.7; max-width: 760px; }
  .finding-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .finding { border-top: 2px solid var(--border); padding-top: 14px; min-width: 0; }
  .finding-number { font-family: var(--font-display); font-weight: 700; font-size: 1.7rem; line-height: 1.1; font-variant-numeric: tabular-nums; }
  .finding-unit { font-family: var(--font-mono); font-size: 0.7rem; opacity: 0.6; margin-bottom: 0.7rem; }
  .finding p { margin: 0; font-size: 0.88rem; line-height: 1.6; opacity: 0.8; }
  @media (max-width: 768px) { .terms, .finding-grid { grid-template-columns: 1fr; } }
  .card-takeaway { margin: 0; font-size: 0.95rem; font-weight: 600; }
</style>
