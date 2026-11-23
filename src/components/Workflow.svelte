<script>
  import { observeFadeIn } from '$lib/utils/observer.js';

  const steps = [
    ['We plan', 'The engineer breaks the work down, decides what has to be true when it is done, and sets the test strategy before any code exists.'],
    ['Agents build', 'Claude Code agents write the code and the tests, often several in parallel, connected to our databases, logs and tickets through MCP servers.'],
    ['A second agent attacks it', 'A separate review agent, with no stake in the change, tries to break it. CodeRabbit reviews the pull request as well.'],
    ['We verify', 'Nothing ships on an agent’s word. The engineer runs it end to end on staging, checks the data it produced, and only then releases.'],
  ];
</script>

<section id="workflow-section">
  <div class="section-container">
    <div class="fade-in" use:observeFadeIn>
      <h2 class="section-title">Working in an AI-Native Team</h2>
      <p class="section-subtitle">The AI workflows we built as a team at Nylon and work in every day, and why verification is the human job</p>
    </div>

    <ol class="steps fade-in" use:observeFadeIn>
      {#each steps as step, i}
        <li class="step">
          <span class="step-num">{i + 1}</span>
          <h3 class="step-title">{step[0]}</h3>
          <p class="step-text">{step[1]}</p>
        </li>
      {/each}
    </ol>

    <dl class="usage fade-in" use:observeFadeIn>
      <div><dt>164 hours</dt><dd>of Claude Code agent sessions</dd></div>
      <div><dt>34 days</dt><dd>with at least one session</dd></div>
      <div><dt>4.7 billion</dt><dd>tokens processed</dd></div>
      <p class="usage-note">My own Claude Code logs, 12 October to 24 November 2026.</p>
    </dl>

    <p class="workflow-note fade-in" use:observeFadeIn>
      Working this way is why I moved towards testing. When agents can write code this fast, the
      limit on what a team can ship is how quickly and how well someone can prove it is correct.
    </p>
  </div>
</section>

<style>
  .steps {
    list-style: none;
    margin: 0 0 1.75rem 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .step {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 22px 20px;
    min-width: 0;
  }

  .step-num {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--accent);
  }

  .step-title {
    font-family: var(--font-display);
    font-size: 1.05rem;
    font-weight: 700;
    margin: 0.35rem 0 0.5rem 0;
  }

  .step-text {
    font-size: 0.88rem;
    line-height: 1.6;
    margin: 0;
    opacity: 0.8;
  }

  .usage {
    display: grid;
    grid-template-columns: repeat(3, auto) 1fr;
    align-items: baseline;
    gap: 8px 40px;
    margin: 0 0 1.75rem 0;
    padding: 18px 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .usage dt {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.5rem;
    font-variant-numeric: tabular-nums;
  }

  .usage dd {
    margin: 0;
    font-size: 0.82rem;
    opacity: 0.7;
  }

  .usage-note {
    grid-column: 1 / -1;
    margin: 0;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    opacity: 0.55;
  }

  .workflow-note {
    max-width: var(--max-prose);
    font-size: 1rem;
    line-height: 1.75;
    margin: 0;
  }

  @media (max-width: 900px) {
    .steps {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 640px) {
    .usage {
      grid-template-columns: 1fr;
    }

    .steps {
      grid-template-columns: 1fr;
    }
  }
</style>
