<script>
  import { onMount } from "svelte";
  import aboutMeImgSrc from "$lib/images/about-me.webp";

  let counter = 1;

  onMount(() => {
    const interval = setInterval(() => {
      if (counter < 31) {
        counter += 1;
      } else {
        clearInterval(interval);
      }
    }, 200);
  });

  const progress = {
    "Backend Development": 95,
    Leadership: 80,
    "Frontend Development": 60,
    Automation: 70,
    "Project Management": 60,
  };

  const technologies = {
    Languages: `JavaScript, TypeScript, Rust, PHP, C#, Go`,
    Frameworks: `Node.js (Express), PHP (Yii, CakePHP, Laravel), Rust (Axum), .Net Core`,
    Frontend: `React.js, Next.js, Vue.js, Svelte.js, Angular.js, Nuxt.js, Jquery`,
    Database: `MySQL, PostgreSQL, MongoDB, InfluxDB, ElasticSearch, Redis`,
    APIs: `REST, GraphQL`,
    "Unit Testing": `Jest, Mocha, Vitest, Entity Framework, Rust's testing framework`,
    Automation: `Protractor, Cucumber, Selenium, Jmeter, TestRail`,
    "CI/CD": `Jenkins, GitHub Actions, Octopus`,
    DevOps: `GitHub, SVN, AWS, Docker, Kibana`,
    Architecture: `Monolith, Microservice, Serverless`,
    SDLC: `Jira, Agile, Scrum, Sportify, Kanban, Mob Programming, TDD, Peer Programming`,
    Others: `RabbitMQ, Excel, Google Analytics & SEO`,
    Interests: `Philosophy, Writing, Travelling, Teaching`,
  };
</script>

<div class="container" id="about-section">
  <div class="left">
    <div class="image-wrapper">
      <img class="image" src={aboutMeImgSrc} alt="about niraj" />
      <div class="info">
        <p>Name: Niraj Paudel</p>
        <p>Role: Software Engineer</p>
        <p>Experience: 9 Years</p>
        <p>Address: Kathmandu, Nepal</p>
      </div>
    </div>
    <div class="skills">
      <p class="section-title">Skills:</p>

      {#each Object.entries(progress) as [skill, percentage]}
        <div class="skill">
          <p>{`${skill} (${percentage}%)`}</p>
          <div class="progress">
            <div class="bar" style="width: {percentage}%;"></div>
          </div>
        </div>
      {/each}
    </div>
  </div>
  <div class="right">
    <div class="about-me">
      <p class="section-title main-header">About Me</p>
      <p>
        With nine years of experience in software development, I excel in
        designing and delivering top-tier products. My expertise spans a wide
        range of programming languages, backend and frontend frameworks,
        databases, and API development. I am adept in ensuring software quality
        through rigorous testing and implementing efficient CI/CD pipelines and
        DevOps practices. Whether as a Solution Architect, Senior Full-Stack
        Software Engineer, Senior Backend Engineer, or Automation Engineer, I
        bring finesse and efficiency to every role. With a deep understanding of
        software architecture and SDLC methodologies, I am committed to driving
        success through innovation and collaboration in any project or team
        setting.
      </p>
    </div>
    <div class="interest">
      {#each Object.entries(technologies) as [key, value]}
        <p>
          <span class="section-title">{key}:</span>
          {value}
        </p>
      {/each}
    </div>
  </div>
</div>

<div class="row project-counter">
  <p>
    <span>{counter > 30 ? "30+" : counter}</span> Projects completed
  </p>
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
    color: #999999;
    font-weight: 400;
    font-size: 16px;
    margin-top: 20px;
  }

  .left {
    flex: 1;
    padding-right: 20px;
  }

  .right {
    flex: 2;
    padding-left: 20px;
  }

  .image-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .image {
    max-width: 150px;
    border-radius: 50%;
    margin-right: 20px;
  }

  .info,
  .skills {
    font-size: 16px;
    line-height: 1.8;
    font-weight: 400;
  }

  .skill {
    margin-bottom: 20px;
  }

  .progress {
    background-color: #333;
    height: 15px;
    border-radius: 10px;
    overflow: hidden;
  }

  .bar {
    background-color: #ffbd39;
    height: 100%;
  }

  .section-title {
    color: white;
    margin-bottom: 10px;
  }

  .main-header {
    font-size: 40px;
    font-weight: 700;
  }

  .interest {
    margin-top: 30px;
  }

  .interest p {
    display: inline-block;
  }

  .section-title {
    color: white;
    margin-bottom: 5px;
  }

  .project-counter {
    text-align: center;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  .project-counter p {
    font-size: 20px;
    color: white;
  }

  .project-counter p span {
    color: #ffbd39;
    padding-right: 10px;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
    }

    .left,
    .right {
      border: none;
      padding: 0;
    }

    .image {
      max-width: 80px;
    }
  }
</style>
