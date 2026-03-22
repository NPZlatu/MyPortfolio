<script>
  import "../global.css";
  import { onMount } from "svelte";
  import { writings, featuredWritings } from "$lib/content.js";
  import Seo from "../components/Seo.svelte";
  import Header from "../components/Header.svelte";
  import Hero from "../components/Hero.svelte";
  import About from "../components/About.svelte";
  import Experience from "../components/Experience.svelte";
  import Research from "../components/Research.svelte";
  import Notebook from "../components/Notebook.svelte";
  import Education from "../components/Education.svelte";
  import Testimonials from "../components/Testimonials.svelte";
  import Contact from "../components/Contact.svelte";
  import Footer from "../components/Footer.svelte";
  import QuizModal from "../components/QuizModal.svelte";
  import ResumeModal from "../components/ResumeModal.svelte";

  let showQuiz = false;
  let showResume = false;

  onMount(() => {
    const trigger = document.getElementById("quiz-trigger");
    if (trigger) trigger.addEventListener("click", () => (showQuiz = true));

    // Auto-open resume if ?resume in URL
    if (window.location.search.includes('resume')) {
      showResume = true;
    }
  });
</script>

<Seo />
<Header on:openResume={() => (showResume = true)} />
<main style="padding-top: 60px">
  <Hero featuredWritings={[...writings.filter(w => !w.externalUrl), ...writings.filter(w => w.externalUrl).slice(0, 3)]} />
  <About on:openResume={() => (showResume = true)} />
  <Experience />
  <Research />
  <Notebook {writings} />
  <Education />
  <Testimonials />
  <Contact />
</main>
<Footer />

{#if showQuiz}
  <QuizModal on:close={() => (showQuiz = false)} />
{/if}

{#if showResume}
  <ResumeModal on:close={() => {
    showResume = false;
    const url = new URL(window.location.href);
    url.searchParams.delete('resume');
    history.replaceState({}, '', url.pathname + (url.search || ''));
  }} />
{/if}
