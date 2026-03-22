<script>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let menuOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  function closeMenu() {
    menuOpen = false;
  }

  /** @param {MouseEvent & { currentTarget: HTMLAnchorElement }} event */
  function scrollToSection(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    if (!href) return;
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  }

  onMount(() => {
    /** @param {MouseEvent} event */
    function handleClickOutside(event) {
      if (menuOpen && !(/** @type {HTMLElement} */ (event.target))?.closest('nav')) {
        menuOpen = false;
      }
    }
    function handleScroll() {
      if (menuOpen) menuOpen = false;
    }
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const navLinks = [
    { href: '#about-section', label: 'About' },
    { href: '#experience-section', label: 'Work' },
    { href: '#research-section', label: 'Research' },
    { href: '#notebook-section', label: 'Notebook' },
    { href: '#education-section', label: 'Education' },
    { href: '#contact-section', label: 'Contact' },
  ];
</script>

<header>
  <nav class="nav-container">
    <a href="#hero-section" class="logo" on:click={scrollToSection}>
      <img src="/favicon.svg" alt="NP" class="logo-mark" />
    </a>

    <ul class="nav-links" class:open={menuOpen}>
      {#each navLinks as link}
        <li>
          <a href={link.href} on:click={scrollToSection}>{link.label}</a>
        </li>
      {/each}
      <li>
        <button class="nav-resume" on:click={() => { closeMenu(); dispatch('openResume'); }}>Resume</button>
      </li>
    </ul>

    <button class="hamburger" aria-label="Toggle navigation menu" on:click={toggleMenu}>
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>
  </nav>
</header>

<style>
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    background-color: rgba(250, 246, 240, 0.92);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--border);
  }

  .nav-container {
    max-width: var(--max-wide);
    margin: 0 auto;
    padding: 0 24px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    font-family: var(--font-display);
    font-style: italic;
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--text);
    text-decoration: none;
    letter-spacing: -0.01em;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .logo:hover {
    color: var(--accent);
    text-decoration: none;
  }

  .logo-mark {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    flex-shrink: 0;
  }

  .nav-links {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 2rem;
    align-items: center;
  }

  .nav-links a {
    font-family: var(--font-nav);
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text);
    text-decoration: none;
    transition: color 0.2s;
  }

  .nav-links a:hover {
    color: var(--accent);
    text-decoration: none;
  }

  .nav-resume {
    font-family: var(--font-nav);
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    background: none;
    color: var(--accent);
    border: none;
    padding: 0;
    cursor: pointer;
    transition: color 0.2s;
    min-height: auto;
    white-space: nowrap;
  }

  .nav-resume:hover { color: var(--text); }

  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    min-height: 44px;
    min-width: 44px;
    align-items: center;
    justify-content: center;
  }

  .bar {
    display: block;
    width: 22px;
    height: 1.5px;
    background: var(--text);
    transition: transform 0.3s, opacity 0.3s;
  }

  @media (max-width: 640px) {
    .hamburger {
      display: flex;
    }

    .nav-links {
      display: none;
      position: absolute;
      top: 60px;
      left: 0;
      right: 0;
      background-color: rgba(250, 246, 240, 0.97);
      border-bottom: 1px solid var(--border);
      flex-direction: column;
      gap: 0;
      padding: 8px 0;
    }

    .nav-links.open {
      display: flex;
    }

    .nav-links li {
      width: 100%;
    }

    .nav-links a {
      display: block;
      padding: 14px 24px;
      font-size: 0.85rem;
      min-height: 44px;
    }

    .nav-resume {
      display: block;
      width: 100%;
      text-align: left;
      padding: 14px 24px;
      font-size: 0.85rem;
      min-height: 44px;
    }
  }
</style>
