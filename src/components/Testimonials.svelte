<script>
  import { observeFadeIn } from '$lib/utils/observer.js';

  const testimonials = [
    {
      quote: "Niraj is an outstanding product-minded Engineer who I had the privilege to work with on MyFonts.com. He was instrumental in decreasing release cycle time from \"weeks\" to \"minutes\" by leveraging his technical expertise and keen attention to detail for building first-class test automation from the ground up. I was always impressed by his domain knowledge and constant expansion of T-shaped skills with passion for learning more, while supporting other team members hone their own skills. It was a delight to see his professional growth, and he would be a great partner on any serious team.",
      name: "James Minior",
      role: "Engineering Manager",
      company: "Monotype",
      relationship: "Direct manager · MyFonts.com",
      year: "2020",
    },
    {
      quote: "We co-founded Business Pazes together and Niraj later served the organisation as CTO. I can definitely say he is highly technical — he comes up with right technical solutions and designs for all the problems you throw at him. Besides, he mentored a lot of new employees efficiently and got them up to speed within a very short period of time. He is empathetic and knows exactly how to deal with people issues. He is a tech-savvy leader who leads teams by example. Any employer would be lucky to have him.",
      name: "Abishek Dhungel",
      role: "CEO",
      company: "Business Pazes",
      relationship: "Co-founder · CTO relationship",
      year: "2024",
    },
    {
      quote: "One of Niraj's standout qualities is his openness. He readily seeks assistance, offers support, and diplomatically declines unreasonable requests, always providing clear explanations. He ensures his availability is transparent from the outset, fostering effective communication within our Scrum team and motivating others to embrace openness. As a senior member, Niraj demonstrated strong leadership skills — and I found myself learning valuable lessons from his exemplary behaviour.",
      name: "Biplab Subedi",
      role: "Self-Management & Continuous Improvement Coach",
      company: "UBA Solutions (Monotype)",
      relationship: "Teammate · Foundry Platform",
      year: "2024",
    },
    {
      quote: "Though brief, the time I worked with Niraj was enough to notice his impressive work ethics. Niraj is hard-working, smart and a good listener — he tries to understand work from multiple perspectives. He also has a progressive mindset when it comes to decision making and problem solving. His current job speaks for itself, and I need not say more. Keep it up, Jaggu!",
      name: "Jivesh Hamal",
      role: "Software Engineer",
      company: "Spiralogics",
      relationship: "Teammate",
      year: "2021",
    },
  ];
</script>

<section id="testimonials-section">
  <div class="section-container">
    <div class="fade-in" use:observeFadeIn>
      <h2 class="section-title">In Their Words</h2>
      <p class="section-subtitle">From people I have built things with</p>
    </div>

    <div class="testimonials-grid fade-in" use:observeFadeIn>
      {#each testimonials as t}
        <div class="testimonial-card">
          <div class="quote-mark">"</div>
          <blockquote class="quote-text">{t.quote}</blockquote>
          <div class="attribution">
            <div class="attr-name">{t.name}</div>
            <div class="attr-role">{t.role} · {t.company}</div>
            <div class="attr-context">{t.relationship} · {t.year}</div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .testimonials-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
  }

  .testimonial-card {
    background: var(--bg);
    padding: 36px 40px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    transition: background 0.2s;
  }

  .testimonial-card:hover {
    background: var(--bg-card);
  }

  .quote-mark {
    font-family: var(--font-display);
    font-size: 4rem;
    line-height: 1;
    color: var(--accent);
    opacity: 0.25;
    margin-bottom: -1rem;
    font-style: italic;
  }

  .quote-text {
    font-family: var(--font-body);
    font-style: italic;
    font-size: 0.92rem;
    line-height: 1.8;
    color: var(--text);
    opacity: 0.78;
    margin: 0;
    padding: 0;
    border: none;
    flex: 1;
  }

  .attribution {
    border-top: 1px solid var(--border);
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .attr-name {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 0.95rem;
    color: var(--text);
  }

  .attr-role {
    font-family: var(--font-body);
    font-style: italic;
    font-size: 0.82rem;
    color: var(--text);
    opacity: 0.6;
  }

  .attr-context {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 0.06em;
    color: var(--accent);
    opacity: 0.7;
    text-transform: uppercase;
  }

  @media (max-width: 900px) {
    .testimonials-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .testimonial-card {
      padding: 24px 20px;
    }

    .quote-text {
      font-size: 0.88rem;
    }
  }
</style>
