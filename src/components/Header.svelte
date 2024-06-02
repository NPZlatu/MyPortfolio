<!-- Header.svelte -->
<script>
  import { BarsSolid } from "svelte-awesome-icons";

  function viewMenu() {
    // @ts-ignore
    document.querySelector(".menu-toggle").style.display = "none";
    // @ts-ignore
    document.querySelector(".menu").style.display = "block";
  }

  /**
   * @param {{ target: any; }} element
   */
  function scrollIntoView(element) {
    const { target } = element;
    const el = document.querySelector(target.getAttribute("href"));
    if (!el) return;
    el.scrollIntoView({
      behavior: "smooth",
    });
  }

  /**
   * @param {{ key: string; }} event
   */
  function handleKeyPress(event) {
    if (event.key === "Enter" || event.key === " ") {
      viewMenu();
    }
  }
</script>

<div class="header">
  <div class="logo">Niraj Paudel</div>
  <div
    role="button"
    class="menu-toggle"
    tabindex="0"
    on:click={viewMenu}
    on:keydown={handleKeyPress}
  >
    <BarsSolid />
  </div>
  <ul class="menu">
    <li>
      <a href="#hero-section" on:click|preventDefault={scrollIntoView}>
        Home
      </a>
    </li>
    <li>
      <a href="#about-section" on:click|preventDefault={scrollIntoView}>
        About
      </a>
    </li>
    <li>
      <a href="#resume-section" on:click|preventDefault={scrollIntoView}>
        Resume
      </a>
    </li>
    <li>
      <a href="#article-section" on:click|preventDefault={scrollIntoView}>
        Articles
      </a>
    </li>
    <li>
      <a href="#contact-section" on:click|preventDefault={scrollIntoView}>
        Contact
      </a>
    </li>

    <li>
      <a
        href="https://itsmenirajpaudel.github.io/theme-based-marksheet-conversion"
        target="_blank"
      >
        Theme Marksheet
      </a>
    </li>
  </ul>
</div>

<style>
  .header {
    background-color: black;
    color: white;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: "Roboto", sans-serif;
  }

  .logo {
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    transition: color 0.3s;
  }

  .logo:hover {
    color: #ffbd39;
  }

  .menu {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
    padding-left: 20px; /* Add left padding */
    padding-right: 20px; /* Add right padding */
  }

  .menu li {
    margin-left: 20px;
    cursor: pointer;
    position: relative;
    font-size: 16px;
    transition: color 0.3s;
  }

  .menu li a {
    font-size: 16px;
    color: white;
    text-decoration: none;
  }

  .menu li:hover:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 100%;
    height: 2px;
    background-color: #ffbd39;
  }

  .menu-toggle {
    display: none;
  }

  @media screen and (max-width: 768px) {
    .menu {
      display: none;
    }

    .menu-toggle {
      display: flex;
    }

    .menu li:hover:after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0px;
      width: 100%;
      height: 2px;
      background-color: #ffbd39;
    }
  }
</style>
