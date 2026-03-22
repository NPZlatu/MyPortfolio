<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { getRandomQuestions, getWrongOptions } from '$lib/quizData.js';

  const dispatch = createEventDispatcher();
  const TOTAL = 10;
  const TENOR_KEY = 'LIVDSRZULELA';

  const correctReactions = [
    "CINEMA ROYALTY.",
    "Absolutely disgusting levels of movie knowledge.",
    "Your parents must be proud.",
    "Film historians are taking notes.",
    "You are built different.",
    "Statistically improbable. Yet here we are.",
    "The Academy would like a word.",
    "Unhinged. Correct, but unhinged.",
    "This is deeply impressive and slightly concerning.",
    "Roger Ebert is smiling somewhere.",
  ];

  const wrongReactions = [
    "Sir, this is a movie quiz.",
    "Did you watch a different film entirely?",
    "Netflix wants to know your location.",
    "Even the director is disappointed.",
    "Your film taste is in witness protection.",
    "Incredible. Wrong, but incredible.",
    "The popcorn industry weeps.",
    "Have you considered watching more movies?",
    "This is not the answer we were looking for.",
    "Somewhere, a film critic just fainted.",
  ];

  const correctTerms = ['michael scott yes', 'happy dance celebration', 'winner trophy', 'mind blown happy'];
  const wrongTerms  = ['sad trombone fail', 'michael scott no god no', 'you had one job', 'facepalm disappointed'];

  /** @type {'start' | 'question' | 'feedback' | 'end'} */
  let phase = 'start';
  let questions = /** @type {any[]} */ ([]);
  let currentIndex = 0;
  let score = 0;
  let showHint = false;
  let selectedAnswer = '';
  let correct = false;
  /** @type {string | null} */
  let gifUrl = null;
  /** @type {any[]} */
  let options = [];
  let reaction = '';
  let shakeWrong = false;
  /** @type {string | null} */
  let prefetchedCorrectGif = null;
  /** @type {string | null} */
  let prefetchedWrongGif = null;

  $: currentQ = questions[currentIndex];
  $: isLast = currentIndex === TOTAL - 1;

  // --- Audio ---
  /** @param {'correct' | 'wrong' | 'end'} type */
  function playSound(type) {
    try {
      const ctx = new (/** @type {any} */ (window).AudioContext || /** @type {any} */ (window).webkitAudioContext)();
      if (type === 'correct') {
        [523, 659, 784].forEach((freq, i) => {
          const osc = ctx.createOscillator(); const gain = ctx.createGain();
          osc.connect(gain); gain.connect(ctx.destination);
          osc.type = 'sine'; osc.frequency.value = freq;
          gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.1);
          gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + i * 0.1 + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.45);
          osc.start(ctx.currentTime + i * 0.1); osc.stop(ctx.currentTime + i * 0.1 + 0.5);
        });
      } else if (type === 'wrong') {
        const osc = ctx.createOscillator(); const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(340, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.55);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.65);
      } else if (type === 'end') {
        [523, 659, 784, 1047].forEach((freq, i) => {
          const osc = ctx.createOscillator(); const gain = ctx.createGain();
          osc.connect(gain); gain.connect(ctx.destination);
          osc.type = 'sine'; osc.frequency.value = freq;
          gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.13);
          gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + i * 0.13 + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.13 + 0.55);
          osc.start(ctx.currentTime + i * 0.13); osc.stop(ctx.currentTime + i * 0.13 + 0.65);
        });
      }
    } catch (_) {}
  }

  // --- GIF fetch ---
  /** @param {string[]} terms */
  async function fetchGif(terms) {
    const term = terms[Math.floor(Math.random() * terms.length)];
    try {
      const res = await fetch(
        `https://api.tenor.com/v1/search?q=${encodeURIComponent(term)}&key=${TENOR_KEY}&limit=20&contentfilter=medium&media_filter=minimal`
      );
      const data = await res.json();
      if (data.results?.length) {
        const pick = data.results[Math.floor(Math.random() * Math.min(data.results.length, 10))];
        const url = pick.media?.[0]?.tinygif?.url || pick.media?.[0]?.gif?.url || null;
        if (url) { const img = new Image(); img.src = url; }
        return url;
      }
    } catch (_) {}
    return null;
  }

  // --- Game flow ---
  function startGame() {
    questions = getRandomQuestions(TOTAL);
    currentIndex = 0; score = 0;
    phase = 'question';
    buildOptions();
  }

  function buildOptions() {
    if (!questions[currentIndex]) return;
    const q = questions[currentIndex];
    const wrong = getWrongOptions(q.movie, 3);
    options = [q.movie, ...wrong].sort(() => Math.random() - 0.5);
    showHint = false; selectedAnswer = ''; gifUrl = null; reaction = '';
    prefetchedCorrectGif = null; prefetchedWrongGif = null;
    Promise.all([fetchGif(correctTerms), fetchGif(wrongTerms)]).then(([c, w]) => {
      prefetchedCorrectGif = c; prefetchedWrongGif = w;
    });
  }

  /** @type {HTMLElement | null} */
  let modalEl = null;

  function scrollModalTop() {
    if (modalEl) modalEl.scrollTop = 0;
  }

  /** @param {string} answer */
  function selectAnswer(answer) {
    if (selectedAnswer) return;
    selectedAnswer = answer;
    correct = answer === currentQ.movie;
    if (correct) { score++; playSound('correct'); }
    else {
      playSound('wrong');
      shakeWrong = true;
      setTimeout(() => (shakeWrong = false), 500);
    }
    reaction = correct
      ? correctReactions[Math.floor(Math.random() * correctReactions.length)]
      : wrongReactions[Math.floor(Math.random() * wrongReactions.length)];
    gifUrl = correct ? prefetchedCorrectGif : prefetchedWrongGif;
    phase = 'feedback';
    scrollModalTop();
  }

  function next() {
    if (isLast) { phase = 'end'; playSound('end'); }
    else { currentIndex++; phase = 'question'; buildOptions(); }
    scrollModalTop();
  }

  /** @param {number} s */
  function endMessage(s) {
    if (s === 10) return "Perfect. You are legally required to work in Hollywood.";
    if (s >= 8) return "Genuinely unsettling levels of movie knowledge. Seek help.";
    if (s >= 6) return "Solid. You can hold your own at a film festival.";
    if (s >= 4) return "Mediocre. The cinematheque has concerns about you.";
    if (s >= 2) return "You've clearly been spending time outside. Disappointing.";
    return "We need to talk. Sit down. This is serious.";
  }

  /** @param {KeyboardEvent} e */
  function handleKeydown(e) {
    if (e.key === 'Escape') dispatch('close');
  }

  onMount(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  });

  /** @param {string} option */
  function optionClass(option) {
    if (!selectedAnswer) return '';
    if (option === currentQ.movie) return 'opt-correct';
    if (option === selectedAnswer) return 'opt-wrong';
    return 'opt-dim';
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<div class="overlay" on:click|self={() => dispatch('close')} transition:fade={{ duration: 200 }}>
  <div class="modal" class:shake={shakeWrong} transition:scale={{ duration: 250, start: 0.97 }} bind:this={modalEl}>
    <button class="close-btn" on:click={() => dispatch('close')} aria-label="Close">✕</button>

    <!-- START -->
    {#if phase === 'start'}
      <div class="phase" in:fade={{ duration: 200 }}>
        <p class="eyebrow">React Riot 2018 — Hacker Favorite</p>
        <h2 class="title">A Good Day<br>to Quiz Hard</h2>
        <p class="desc">Ten movie dialogues. Guess the film.<br>Hints available. Dignity not guaranteed.</p>
        <button class="btn-primary" on:click={startGame}>Start the quiz</button>
      </div>

    <!-- QUESTION -->
    {:else if phase === 'question' && currentQ}
      <div class="phase" in:fade={{ duration: 150 }}>
        <div class="top-bar">
          <span class="counter">{currentIndex + 1} / {TOTAL}</span>
          <div class="progress"><div class="fill" style="width:{(currentIndex/TOTAL)*100}%"></div></div>
          <span class="score-label">{score} pts</span>
        </div>

        <p class="prompt">Which film is this from?</p>
        <blockquote class="dialogue">"{currentQ.dialogue}"</blockquote>
        {#if showHint}
          <p class="hint" in:fade={{ duration: 150 }}>Hint: {currentQ.hint}</p>
        {/if}
        <div class="options">
          {#each options as option}
            <button class="opt" on:click={() => selectAnswer(option)}>{option}</button>
          {/each}
        </div>
        {#if !showHint}
          <button class="hint-trigger" on:click={() => showHint = true}>I need a hint</button>
        {/if}
      </div>

    <!-- FEEDBACK -->
    {:else if phase === 'feedback'}
      <div class="phase feedback-phase" in:fade={{ duration: 150 }}>
        <div class="top-bar">
          <span class="counter">{currentIndex + 1} / {TOTAL}</span>
          <div class="progress"><div class="fill" style="width:{((currentIndex+1)/TOTAL)*100}%"></div></div>
          <span class="score-label">{score} pts</span>
        </div>

        <div class="verdict" class:verdict-correct={correct} class:verdict-wrong={!correct} in:scale={{ duration: 300, start: 0.5 }}>
          {correct ? '✓' : '✗'}
        </div>

        <p class="reaction" class:reaction-correct={correct} class:reaction-wrong={!correct}>{reaction}</p>

        {#if !correct}
          <p class="reveal">It was <strong>{currentQ.movie}</strong> ({currentQ.year})</p>
        {/if}

        <div class="gif-frame">
          {#if gifUrl}
            <img src={gifUrl} alt={correct ? 'celebration' : 'fail'} class="gif" in:fade={{ duration: 250 }} />
          {:else}
            <div class="gif-loading">loading gif...</div>
          {/if}
        </div>

        <div class="answered-options">
          {#each options as option}
            <div class="opt-result {optionClass(option)}">{option}</div>
          {/each}
        </div>

        <button class="btn-primary" on:click={next}>
          {isLast ? 'See results' : 'Next question'}
        </button>
      </div>

    <!-- END -->
    {:else if phase === 'end'}
      <div class="phase" in:fade={{ duration: 200 }}>
        <p class="eyebrow">Final Score</p>
        <div class="big-score">{score}<span class="denom">/{TOTAL}</span></div>
        <p class="end-msg">{endMessage(score)}</p>
        <div class="end-actions">
          <button class="btn-primary" on:click={startGame}>Play again</button>
          <button class="btn-ghost" on:click={() => dispatch('close')}>Back to portfolio</button>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(30, 28, 26, 0.75);
    backdrop-filter: blur(6px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }

  .modal {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    width: 100%;
    max-width: 680px;
    max-height: 95vh;
    overflow-y: auto;
    padding: 52px 56px;
    position: relative;
  }

  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(5px); }
  }
  .shake { animation: shake 0.45s ease; }

  .close-btn {
    position: absolute; top: 16px; right: 16px;
    z-index: 10;
    background: none; border: none;
    font-family: var(--font-mono); font-size: 0.8rem;
    color: var(--text); opacity: 0.3; cursor: pointer;
    padding: 6px 10px; min-height: 44px; min-width: 44px;
  }
  .close-btn:hover { opacity: 1; }

  .phase {
    display: flex; flex-direction: column;
    align-items: center; text-align: center; gap: 1.5rem;
  }

  /* Start / End */
  .eyebrow {
    font-family: var(--font-mono); font-size: 0.62rem;
    text-transform: uppercase; letter-spacing: 0.15em;
    color: var(--accent); margin: 0;
  }

  .title {
    font-family: var(--font-display); font-size: 2.8rem;
    font-weight: 700; line-height: 1.1; margin: 0;
  }

  .desc {
    font-family: var(--font-body); font-size: 1rem;
    line-height: 1.7; opacity: 0.65; margin: 0;
  }

  /* Top bar */
  .top-bar {
    width: 100%; display: flex;
    align-items: center; gap: 0.75rem;
  }

  .counter, .score-label {
    font-family: var(--font-mono); font-size: 0.68rem;
    color: var(--text); opacity: 0.45; white-space: nowrap;
  }

  .progress {
    flex: 1; height: 2px; background: var(--border);
    border-radius: 1px; overflow: hidden;
  }

  .fill {
    height: 100%; background: var(--accent);
    transition: width 0.35s ease;
  }

  .prompt {
    font-family: var(--font-mono); font-size: 0.7rem;
    text-transform: uppercase; letter-spacing: 0.1em;
    color: var(--text); opacity: 0.4; margin: 0;
  }

  /* Dialogue */
  .dialogue {
    font-family: var(--font-display); font-style: italic;
    font-size: 1.45rem; line-height: 1.55;
    border-left: 3px solid var(--accent);
    padding: 0.6rem 1.4rem; margin: 0;
    text-align: left; width: 100%;
  }

  .hint {
    font-family: var(--font-body); font-size: 0.88rem;
    font-style: italic; opacity: 0.6; margin: 0;
    background: var(--bg-code); padding: 10px 16px;
    border-radius: 3px; width: 100%; text-align: left;
  }

  /* Options */
  .options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px; width: 100%;
  }

  .opt {
    font-family: var(--font-body); font-size: 0.92rem;
    padding: 14px 16px; border: 1px solid var(--border);
    background: var(--bg-card); color: var(--text);
    border-radius: 3px; cursor: pointer; text-align: left;
    transition: border-color 0.15s, background 0.15s;
    min-height: 52px; line-height: 1.4;
  }

  .opt:hover { border-color: var(--accent); background: var(--bg); }

  .hint-trigger {
    font-family: var(--font-mono); font-size: 0.68rem;
    background: none; border: none; color: var(--text);
    opacity: 0.35; cursor: pointer; text-decoration: underline;
    text-underline-offset: 3px; letter-spacing: 0.04em; min-height: 36px;
  }
  .hint-trigger:hover { opacity: 0.7; }

  /* Feedback */
  .feedback-phase { gap: 1.1rem; }

  .verdict {
    font-size: 4rem;
    line-height: 1;
    font-weight: 700;
    font-family: var(--font-display);
  }
  .verdict-correct { color: var(--accent-green); }
  .verdict-wrong { color: var(--accent); }

  .reaction {
    font-family: var(--font-display); font-size: 1.3rem;
    font-weight: 700; margin: 0; line-height: 1.2;
  }
  .reaction-correct { color: var(--accent-green); }
  .reaction-wrong { color: var(--accent); }

  .reveal {
    font-family: var(--font-body); font-size: 0.92rem;
    opacity: 0.7; margin: 0;
  }

  /* Feedback GIF */
  .gif-frame {
    width: 260px; height: 160px;
    border-radius: 6px; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    background: var(--bg-code);
  }

  .gif {
    width: 100%; height: 100%;
    object-fit: contain; display: block;
  }

  .gif-loading {
    font-family: var(--font-mono); font-size: 0.68rem;
    opacity: 0.3; letter-spacing: 0.08em;
  }

  /* Answered options */
  .answered-options {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 8px; width: 100%;
  }

  .opt-result {
    font-family: var(--font-body); font-size: 0.88rem;
    padding: 10px 14px; border-radius: 3px;
    border: 1px solid var(--border); text-align: left;
    line-height: 1.4;
  }

  .opt-correct {
    border-color: var(--accent-green);
    background: rgba(58, 90, 64, 0.1);
    color: var(--accent-green); font-weight: 700;
  }

  .opt-wrong {
    border-color: var(--accent);
    background: rgba(184, 92, 56, 0.1);
    color: var(--accent); text-decoration: line-through;
  }

  .opt-dim { opacity: 0.25; }

  /* End */
  .big-score {
    font-family: var(--font-display); font-size: 7rem;
    font-weight: 700; line-height: 1; color: var(--accent);
  }
  .denom { font-size: 3rem; color: var(--text); opacity: 0.25; }

  .end-msg {
    font-family: var(--font-body); font-style: italic;
    font-size: 1.05rem; line-height: 1.65; opacity: 0.72;
    margin: 0; max-width: 400px;
  }

  .end-actions {
    display: flex; flex-direction: column;
    gap: 10px; align-items: center; width: 100%;
  }

  /* Buttons */
  .btn-primary {
    font-family: var(--font-mono); font-size: 0.82rem;
    letter-spacing: 0.07em; padding: 14px 36px;
    background: var(--accent); color: #fff;
    border: none; border-radius: 3px; cursor: pointer;
    transition: opacity 0.15s; min-height: 48px;
  }
  .btn-primary:hover { opacity: 0.85; }

  .btn-ghost {
    font-family: var(--font-mono); font-size: 0.76rem;
    letter-spacing: 0.06em; background: none;
    border: 1px solid var(--border); color: var(--text);
    opacity: 0.5; padding: 12px 28px; border-radius: 3px;
    cursor: pointer; min-height: 48px;
    transition: opacity 0.15s, border-color 0.15s;
  }
  .btn-ghost:hover { opacity: 1; border-color: var(--accent); color: var(--accent); }

  /* Responsive */
  @media (max-width: 640px) {
    .modal { padding: 36px 20px; max-height: 100vh; border-radius: 0; }
    .title { font-size: 2rem; }
    .dialogue { font-size: 1.1rem; padding: 0.5rem 1rem; }
    .options, .answered-options { grid-template-columns: 1fr; }
    .big-score { font-size: 5rem; }
    .gif-frame { width: 100%; height: 140px; }
  }
</style>
