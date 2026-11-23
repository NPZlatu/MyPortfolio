<script>
  import "../global.css";
  import Seo from "../components/Seo.svelte";
  import Header from "../components/Header.svelte";
  import Hero from "../components/Hero.svelte";
  import About from "../components/About.svelte";
  import Experience from "../components/Experience.svelte";
  import Research from "../components/Research.svelte";
  import Education from "../components/Education.svelte";
  import Testimonials from "../components/Testimonials.svelte";
  import Contact from "../components/Contact.svelte";
  import Footer from "../components/Footer.svelte";
</script>

<Seo />
<Header />
<main style="padding-top: 68px">
  <Hero />
  <About />
  <Experience />
  <Research />
  <Testimonials />
  <Education />
  <Contact />
</main>
<Footer />
