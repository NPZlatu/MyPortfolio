<script>
  import { observeFadeIn } from '$lib/utils/observer.js';

  const projects = [
    {
      course: 'COMP902 — Advanced IT Specialised Project',
      institution: 'Auckland Institute of Studies',
      supervisor: 'Dr. Shabana Ali',
      year: '2024',
      title: '"Small Wins" Slack Bot: Dual Modes',
      summary: `Built a Slack bot that automates team recognition in software engineering teams. Two delivery modes: real-time "tiny win" notifications when teammates complete tasks (GitHub commits, Trello card moves), and a daily digest that batches all wins into a single end-of-day summary. Addresses research on notification fatigue and the psychology of small wins in remote and hybrid teams.`,
      tags: ['Slack API', 'Node.js', 'Webhooks', 'PostgreSQL', 'GitHub', 'Trello', 'Behavioral Design'],
    },
    {
      course: 'COMP903 — IT Applied Research Project',
      institution: 'Auckland Institute of Studies',
      supervisor: 'Dr. Shabana Ali',
      year: '2025 — Ongoing',
      title: 'Reliability of RAGAS Metrics across LLM Judges',
      summary: `Investigating whether RAG evaluation metrics (RAGAS) produce consistent results across different LLM judges — GPT-4o mini, Llama-3.1-8B, and Gemini-1.5-Flash. Uses a controlled tournament methodology with the WikiEval dataset across four quality variants: high quality, poor quality, noisy context, and hallucinated. Analysing score differences, ranking consistency, and inter-judge disagreement to determine whether RAGAS metrics are reliable or too dependent on the judge model.`,
      tags: ['RAG', 'RAGAS', 'LLM-as-Judge', 'NLP Evaluation', 'GPT-4o', 'Llama', 'Gemini', 'Research'],
    },
  ];
</script>

<section id="research-section">
  <div class="section-container">
    <div class="fade-in" use:observeFadeIn>
      <h2 class="section-title">The Research</h2>
      <p class="section-subtitle">Academic work at Auckland Institute of Studies</p>
    </div>

    <div class="research-grid fade-in" use:observeFadeIn>
      {#each projects as project}
        <div class="research-card">
          <div class="card-stripe"></div>
          <div class="card-body">
            <div class="card-meta-top">
              <span class="card-course">{project.course}</span>
            </div>
            <h3 class="card-title">{project.title}</h3>
            <p class="card-summary">{project.summary}</p>
            <div class="tag-row">
              {#each project.tags as tag}
                <span class="tag">{tag}</span>
              {/each}
            </div>
            <div class="card-meta-bottom">
              <span class="card-institution">{project.institution}</span>
              <span class="card-dot">·</span>
              <span class="card-year">{project.year}</span>
              <span class="card-dot">·</span>
              <span class="card-supervisor">Supervisor: {project.supervisor}</span>
            </div>
          </div>
        </div>
      {/each}
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
</style>
