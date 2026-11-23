<script>
  import { observeFadeIn } from '$lib/utils/observer.js';

  const steps = [
    ['I plan', 'I break the work down, decide what has to be true when it is done, and write the test strategy before any code exists.'],
    ['Agents build', 'Claude Code agents write the code and the tests, often several in parallel, connected to our databases, logs and tickets through MCP servers.'],
    ['A second agent attacks it', 'A separate review agent, with no stake in the change, tries to break it. CodeRabbit reviews the pull request as well.'],
    ['I verify', 'Nothing ships on an agent’s word. I run it end to end on staging, check the data it produced, and only then release.'],
  ];
</script>

<section id="workflow-section">
  <div class="section-container">
    <div class="fade-in" use:observeFadeIn>
      <h2 class="section-title">How I Work with AI</h2>
      <p class="section-subtitle">An AI-native workflow, every day, where verification is the human job</p>
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
    .steps {
      grid-template-columns: 1fr;
    }
  }
</style>
