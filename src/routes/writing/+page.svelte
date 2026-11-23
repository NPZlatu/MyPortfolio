<script>
  import "../../global.css";
  import { writings } from "$lib/content.js";
  import Header from "../../components/Header.svelte";
  import Notebook from "../../components/Notebook.svelte";
  import Footer from "../../components/Footer.svelte";
  import QuizModal from "../../components/QuizModal.svelte";

  let showQuiz = false;
</script>

<svelte:head>
  <title>Writing — Niraj Paudel</title>
  <meta name="description" content="Technical articles, essays and side projects by Niraj Paudel." />
  <link rel="canonical" href="https://nirajpaudel.com/writing" />
</svelte:head>

<Header base="/" />
<main style="padding-top: 68px">
  <Notebook {writings} />

  <section id="side-section">
    <div class="section-container">
      <h2 class="section-title">Side Projects</h2>
      <ul class="side-list">
        <li>
          <button class="side-button" on:click={() => (showQuiz = true)}>A Good Day to Quiz Hard</button>
          <span>A movie dialogue quiz. Hacker Favorite at React Riot 2018, built with Kushal, Abish, Dipendra and Ritesh.</span>
        </li>
      </ul>
    </div>
  </section>
</main>
<Footer />

{#if showQuiz}
  <QuizModal on:close={() => (showQuiz = false)} />
{/if}

<style>
  .side-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .side-list li {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border);
  }

  .side-list span {
    font-size: 0.9rem;
    opacity: 0.7;
  }

  .side-list a,
  .side-button {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.05rem;
    color: var(--text);
    text-align: left;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
</style>
