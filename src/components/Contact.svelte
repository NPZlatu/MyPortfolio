<script>
  import { observeFadeIn } from '$lib/utils/observer.js';

  const contactItems = [
    {
      icon: '✉',
      label: 'itsmenirajpaudel@gmail.com',
      href: 'mailto:itsmenirajpaudel@gmail.com',
    },
    {
      icon: '☎',
      label: '+64 021 025 24460',
      href: 'tel:+6402102524460',
    },
    {
      icon: '⌖',
      label: 'Auckland, New Zealand',
      href: 'https://maps.app.goo.gl/UeLEx1j2CyDb6TRH8',
      external: true,
    },
  ];

  const socialItems = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/itsmenirajpaudel/' },
    { label: 'GitHub', href: 'https://github.com/NPZlatu' },
    { label: 'Medium', href: 'https://medium.com/@nirajpaudel' },
  ];
</script>

<section id="contact-section">
  <div class="section-container">
    <div class="contact-inner fade-in" use:observeFadeIn>
      <h2 class="section-title">Say Hello</h2>
      <p class="section-subtitle">I read every message and reply to most of them</p>

      <div class="contact-list">
        {#each contactItems as item}
          <a
            href={item.href}
            class="contact-line"
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
          >
            <span class="contact-icon">{item.icon}</span>
            <span class="contact-label">{item.label}</span>
          </a>
        {/each}
      </div>

      <div class="social-list">
        {#each socialItems as item}
          <a
            href={item.href}
            class="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >{item.label}</a>
        {/each}
      </div>

      <p class="contact-form-note">
        Or send a note via the
        <a href="https://forms.gle/rkP71gVVFyq77GUi6" target="_blank" rel="noopener noreferrer">contact form</a>.
      </p>
    </div>
  </div>
</section>

<style>
  .contact-inner {
    max-width: 480px;
    margin: 0 auto;
    text-align: center;
  }

  .contact-inner :global(.section-subtitle) {
    margin-bottom: 1.25rem;
  }

  .contact-list {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-bottom: 1.25rem;
  }

  .contact-line {
    font-family: var(--font-mono);
    font-size: 0.88rem;
    color: var(--text);
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    padding: 5px 0;
    line-height: 1.6;
    transition: color 0.2s;
  }

  .contact-line:hover {
    color: var(--accent);
    text-decoration: none;
  }

  .contact-icon {
    font-size: 0.85rem;
    opacity: 0.45;
    flex-shrink: 0;
  }

  .contact-label {
    color: inherit;
  }

  .social-list {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 1.25rem;
    flex-wrap: wrap;
  }

  .social-link {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text);
    text-decoration: none;
    opacity: 0.5;
    transition: opacity 0.2s, color 0.2s;
  }

  .social-link:hover {
    opacity: 1;
    color: var(--accent);
    text-decoration: none;
  }

  .contact-form-note {
    font-family: var(--font-body);
    font-style: italic;
    font-size: 0.88rem;
    color: var(--text);
    opacity: 0.55;
    margin: 0;
  }

  .contact-form-note a {
    color: var(--accent);
    font-style: normal;
  }

  @media (max-width: 640px) {
    .social-list {
      gap: 0.9rem;
    }

    .contact-line {
      font-size: 0.8rem;
      gap: 0.45rem;
    }

    .contact-form-note {
      font-size: 0.82rem;
    }
  }
</style>
