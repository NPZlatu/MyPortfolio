<script>
  import { onMount } from "svelte";
  import bg1Img from "$lib/images/bg_1.webp";

  let imageLoaded = false;

  let typingTexts = [
    "An Engineer",
    "A Dishwasher",
    "A Leader",
    `And my wife's follower`,
    "I write sometimes",
    "I follow Jordan Peterson",
    "Clean your room 😁",
  ];

  let currentText = typingTexts[0];
  let typingIndex = 0;
  /**
   * @type {number | undefined}
   */
  let typingInterval;
  /**
   * @type {string}
   */
  let typedText;

  function startTypingAnimation() {
    typingInterval = setInterval(() => {
      if (typingIndex < currentText.length) {
        typedText = currentText.substring(0, typingIndex + 1);
        typingIndex++;
      } else {
        clearInterval(typingInterval);
        typingIndex = 0;
        startTypingAnimation();
        currentText =
          typingTexts[
            (typingTexts.indexOf(currentText) + 1) % typingTexts.length
          ];
      }
    }, 200);
  }

  onMount(() => {
    const img = new Image();
    img.onload = () => {
      imageLoaded = true;
    };
    img.src = bg1Img;
  });
  startTypingAnimation();
</script>

<div class="hero container-fluid" id="hero-section">
  {#if !imageLoaded}
    <div class="loader-container">
      <div class="loader"></div>
    </div>
  {:else}
    <div class="row">
      <div class="col-md-6 hero__content">
        <div class="small-text">HELLO!</div>
        <h1 class="name">I'm <span>Niraj Paudel</span></h1>
        <div class="animated-text">{typedText}</div>
        <h2 class="role">Software Engineer</h2>
        <div class="buttons">
          <a
            href="https://www.linkedin.com/in/itsmenirajpaudel"
            target="_blank"
            class="btn btn-primary">LinkedIn</a
          >
          <a
            href="https://github.com/npzlatu"
            target="_blank"
            class="btn btn-secondary">GitHub</a
          >
        </div>
      </div>
      <div class="col-md-6 hero__image">
        <img src={bg1Img} alt="niraj background" />
      </div>
    </div>
  {/if}
</div>

<style>
  /* Loader styles */
  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #ffbd39;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /* Your existing styles */
  .hero {
    position: relative;
    background-color: black;
    color: #fff;
    padding: 10px;
    overflow: hidden;
  }

  /* Hero component */
  .row {
    display: flex;
    flex-direction: column-reverse; /* Rearrange columns on small screens */
  }

  .hero__content {
    max-width: 100%;
    margin-bottom: 20px; /* Add space between content and image */
  }

  .hero__content .small-text {
    font-size: 14px;
    font-weight: 600;
    color: #ffbd39;
    text-transform: capitalize;
  }

  .hero__content .name {
    font-size: 40px;
    margin-bottom: 20px;
    line-height: 1.2;
    font-weight: 800;
  }

  .hero__content .name span {
    color: #ffbd39;
  }

  .hero__content .animated-text {
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 20px;
  }

  .hero__content .role {
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 20px;
  }

  .hero__content .buttons {
    display: flex;
    flex-wrap: wrap; /* Allow buttons to wrap on small screens */
    margin-top: 10px;
  }

  .hero__content .buttons .btn {
    font-size: 14px;
    padding: 10px 20px;
    border-radius: 50px;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    letter-spacing: 2px;
  }

  .hero__image {
    max-width: 100%;
    padding-left: 20px;
  }

  .hero__image img {
    max-width: 100%;
    height: auto;
  }

  @media screen and (min-width: 768px) {
    .hero {
      height: auto;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .row {
      flex-direction: row; /* Revert to default row layout on larger screens */
    }

    .hero__content {
      max-width: 50%;
    }

    .hero__image {
      max-width: 50%;
    }

    .hero__content .name {
      font-size: 50px;
      margin-bottom: 20px;
      line-height: 1.2;
      font-weight: 800;
    }

    .hero__content .animated-text,
    .hero__content .role {
      font-size: 30px;
    }
  }

  /* LinkedIn button */
  .btn-primary {
    background: #ffbd39;
    border: 1px solid #ffbd39;
    color: #000;
  }

  /* GitHub button */
  .btn-secondary {
    border: 1px solid rgba(255, 255, 255, 0.5);
    background: transparent;
    color: #fff;
  }
</style>
