<script>
  const year = new Date().getFullYear();
</script>

<footer class="site-footer">
  <div class="footer-inner">
    <p class="footer-quote">"The fish who is searching for his ocean."</p>
    <div class="footer-nav">
      <a href="#about-section">About</a>
      <span class="dot">·</span>
      <a href="#experience-section">Work</a>
      <span class="dot">·</span>
      <a href="#notebook-section">Notebook</a>
      <span class="dot">·</span>
      <a href="#contact-section">Contact</a>
    </div>
    <p class="footer-copy">© {year} Niraj Paudel &nbsp;·&nbsp; Auckland, New Zealand</p>
  </div>
</footer>

<style>
  .site-footer {
    border-top: 1px solid var(--border);
    padding: 48px 24px;
    text-align: center;
  }

  .footer-inner {
    max-width: var(--max-wide);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .footer-quote {
    font-family: var(--font-display);
    font-style: italic;
    font-size: 1.1rem;
    color: var(--text);
    opacity: 0.65;
    margin: 0;
  }

  .footer-nav {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .footer-nav a {
    font-family: var(--font-nav);
    font-size: 0.75rem;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--text);
    text-decoration: none;
    opacity: 0.45;
    transition: opacity 0.2s;
  }

  .footer-nav a:hover {
    opacity: 0.85;
    text-decoration: none;
  }

  .dot {
    font-size: 0.6rem;
    color: var(--border);
  }

  .footer-copy {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.05em;
    color: var(--text);
    opacity: 0.3;
    margin: 0;
  }

  @media (max-width: 640px) {
    .site-footer {
      padding: 36px 16px;
    }

    .footer-quote {
      font-size: 1rem;
    }
  }
</style>
