<script>
  import { observeFadeIn } from '$lib/utils/observer.js';
  import ResumeModal from './ResumeModal.svelte';
  let showResume = false;

  const skills = [
    { label: 'Fluent in', value: 'JavaScript, TypeScript, Python, C#, Rust, PHP' },
    { label: 'Practiced in', value: 'Node.js, React, Vue, .NET, Django, SvelteKit' },
    { label: 'Versed in', value: 'PostgreSQL, MongoDB, Redis, ElasticSearch' },
    { label: 'Familiar with', value: 'Azure, AWS, Docker, Terraform, CI/CD, Scrum' },
    { label: 'Currently exploring', value: 'RAG pipelines, AI workflows, Claude Code, LLM evaluation' },
  ];
</script>

<section id="about-section">
  <div class="section-container">
    <div class="about-prose fade-in" use:observeFadeIn>
      <p>
        Ten years of building software. Started in Kathmandu, built products for companies in Nepal
        and overseas, led teams, was briefly a CTO, and ended up in Auckland working on legal AI.
        The path wasn't linear.
      </p>
      <p>
        I care about correctness. I love testing — TDD, thinking through edge cases, building things
        that hold up. It's where I feel most like myself in code.
      </p>
      <p>
        AI is changing what engineers do and I find that more interesting than frightening. I work
        with it daily at Law Cyborg — building RAG pipelines, working with AI tools, thinking about
        how the tools reshape the work.
      </p>
      <p>
        I also write. Essays, parables, reflections on why people do what they do. I think the
        engineers who last are the ones who understand people, not just systems.
      </p>
      <button class="cv-link" on:click={() => showResume = true}>Preview Resume →</button>
    </div>

    <div class="colophon fade-in" use:observeFadeIn>
      <p class="colophon-label">Technical Inventory</p>
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

{#if showResume}
  <ResumeModal on:close={() => showResume = false} />
{/if}

<style>
  .about-prose {
    max-width: var(--max-prose);
    margin: 0 auto 1.75rem;
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
      font-size: 0.95rem;
      text-align: left;
    }

    .colophon {
      padding: 18px 16px;
    }

    .colophon-row {
      font-size: 0.75rem;
      flex-direction: column;
      gap: 0.1rem;
    }

    dd {
      padding-left: 0.5rem;
    }
  }
</style>
