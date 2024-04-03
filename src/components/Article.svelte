<script>
  import proj1Image from "$lib/images/proj_1.webp";
  import proj2Image from "$lib/images/proj_2.webp";
  import proj3Image from "$lib/images/proj_3.webp";
  import proj4Image from "$lib/images/proj_4.webp";
  import proj5Image from "$lib/images/proj_5.webp";
  import proj6Image from "$lib/images/proj_6.webp";

  let articles = [
    {
      title: "Why and How to Create a Portfolio Website Using Svelte?",
      imageUrl: proj6Image,
      description:
        "This article illustrates the process of building a high-performing portfolio website with Svelte.js, providing a step-by-step guide and practical insights. #Svelte #Portfolio #WebDev",
      url: "https://medium.com/@nirajpaudel/why-and-how-to-create-a-portfolio-website-using-svelte-465daff4ebf3",
    },
    {
      title:
        "Functional Programming for Beginners: Understanding the Core Principles",
      imageUrl: proj1Image,
      description:
        "This guide introduces beginners to the principles of Functional Programming (FP), emphasizing the utilization of pure functions, immutability, and function composition for writing cleaner and more maintainable code.",
      url: "https://medium.com/@nirajpaudel/functional-programming-for-beginners-understanding-the-core-principles-fa8df00966f7",
    },
    {
      title:
        "Understanding Rust’s Memory Management: Ownership, Borrowing, and Lifetimes",
      imageUrl: proj2Image,
      description:
        "Rust's memory management, facilitated by its Borrow Checker, ensures both memory safety and performance by enforcing rules during compilation, eliminating runtime overhead associated with garbage collection or manual memory allocation/deallocation.",
      url: "https://www.linkedin.com/pulse/understanding-rusts-memory-management-ownership-borrowing-paudel-izwhc/?trackingId=0ZfPiPOlTeWB6TfVml2Yzw%3D%3D",
    },
    {
      title:
        "Concurrency Models in Node.js: Single-Threaded, Multi-Threaded, and Multi-Process Configurations",
      imageUrl: proj3Image,
      description:
        "JavaScript, including Node.js, primarily operates on a single-threaded model, but it can handle concurrent operations efficiently through non-blocking I/O, although there are methods available for utilizing multiple threads in Node.js, necessitating an understanding of its concurrency models.",
      url: "https://medium.com/@nirajpaudel/concurrency-models-in-node-js-single-threaded-multi-threaded-and-multi-process-configurations-0080488a1c0b",
    },
    {
      title: "5 THINGS I LEARNED FROM ELON MUSK",
      imageUrl: proj4Image,
      description:
        "Elon Musk's groundbreaking achievements underscore the importance of visionary leadership, teamwork, and relentless pursuit of ambitious goals, serving as a powerful inspiration for aspiring entrepreneurs like myself.",
      url: "https://bpazes.com/story/5-things-i-learned-from-elon-musk-884604d4-7468-4998-b90f-8fc7dfeec95c",
    },
    {
      title: "Empowering Nepali Businesses: A Dive into Bpazes application",
      imageUrl: proj5Image,
      description:
        "This video serves as an instructional guide about Business Pazes and demonstrates the advantages that local businesses in Nepal can gain from using the BPazes app. The content is in Nepali language, and both the video and the audio are my own creation.",
      url: "https://www.youtube.com/watch?v=Gqkg4ihUbVw",
    },
  ];
</script>

<section class="ftco-section" id="article-section">
  <div class="container">
    <div class="row justify-content-center mb-5 pb-5">
      <div class="col-md-12 heading-section text-center ftco-animate">
        <h1 class="big big-2">Articles</h1>
        <p class="caption">
          Below are some of the articles I have written, covering a range of
          topics from technology and innovation to entrepreneurship and personal
          development, each crafted to inform, inspire, and provoke thought
          among readers seeking insights and ideas to navigate our rapidly
          evolving world.
        </p>
      </div>
    </div>
    <div class="row justify-content-center">
      {#each articles as article, index}
        <div class="col-md-4 d-flex ftco-animate {index > 2 ? 'mt-md-4' : ''}">
          <div class="card">
            <a href={article.url} target="_blank">
              <img
                src={article.imageUrl}
                class="card-img-top"
                alt={article.title}
              />
            </a>
            <div class="card-body">
              <h5 class="card-title">
                <a href={article.url} target="_blank">{article.title}</a>
              </h5>
              <p class="card-text">
                {article.description}
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  #article-section {
    color: #999999;
    font-size: 16px;
    margin-top: 40px;
  }

  .big-2 {
    font-size: 40px;
    font-weight: 700;
    color: white;
    margin-bottom: 20px;
  }

  .caption {
    color: #999999;
    font-size: 16px;
    margin-bottom: 20px;
  }

  .card {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 30px;
    transition: transform 0.3s ease;
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .card-img-top {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .card-body {
    padding: 20px;
  }

  .card-title a {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 10px;
    color: white;
    cursor: pointer;
    transition: color 0.3s ease;
    text-decoration: none;
  }

  .card-title a:hover {
    color: #ffbd39;
    text-decoration: none;
  }

  .card-text {
    color: #999999;
  }

  @media (max-width: 768px) {
    .card {
      margin-bottom: 20px;
    }
  }
</style>
