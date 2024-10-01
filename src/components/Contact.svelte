<script>
  import {
    LinkedinBrand,
    TwitterBrand,
    InstagramBrand,
    FacebookBrand,
  } from "svelte-awesome-icons";

  export let contactDetails = [
    {
      title: "Address",
      content: "Mount Albert, Auckland, New Zealand",
      href: "https://maps.app.goo.gl/UeLEx1j2CyDb6TRH8",
    },
    {
      title: "Contact Number",
      content: "+6402102524460",
      href: "tel:+640210254460",
    },
    {
      title: "Email Address",
      content: "itsmenirajpaudel@gmail.com",
      href: `mailto: itsmenirajpaudel@gmail.com`,
    },
    {
      title: "Download Resume",
      content: "Click to download ",
      href: "https://drive.google.com/file/d/10GA-HhOuR6og6u6Se1QghmJxBCMy8CHy/view?usp=sharing",
    },
  ];

  export let contactFormLink = "https://forms.gle/rkP71gVVFyq77GUi6";

  export let socialLinks = [
    {
      icon: LinkedinBrand,
      link: "https://www.linkedin.com/in/itsmenirajpaudel/",
    },
    { icon: TwitterBrand, link: "https://twitter.com/NirajPaudel62" },
    { icon: FacebookBrand, link: "https://www.facebook.com/niraz.paudel/" },
    { icon: InstagramBrand, link: "https://www.instagram.com/nirazlatu/" },
  ];
</script>

<section class="ftco-section contact-section ftco-no-pb" id="contact-section">
  <div class="container">
    <div class="row justify-content-center mb-5 pb-5">
      <div class="col-md-12 heading-section text-center ftco-animate">
        <h1 class="big big-2">Contact Me</h1>
        <p class="caption">Below are the details to reach out to me!</p>
      </div>
    </div>

    <div class="row d-flex contact-info mb-5">
      {#each contactDetails as detail}
        <div class="col-md-6 col-lg-3 d-flex ftco-animate">
          <div class="align-self-stretch box p-4 text-center">
            <h3 class="mb-4">{detail.title}</h3>
            {#if !!detail.href}
              <a href={detail.href} target="_blank">{detail.content}</a>
            {:else}
              <p>{detail.content}</p>
            {/if}
          </div>
        </div>
      {/each}

      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-12 ftco-animate text-center queries">
            <h2>
              Have any <span> queries? </span>
              <a
                target="_blank"
                href={contactFormLink}
                class="btn btn-primary py-3 px-5">Click Here</a
              >
            </h2>
          </div>
        </div>
        <ul
          class="ftco-footer-social list-unstyled d-flex justify-content-center align-items-center mb-0"
        >
          <li class="ftco-animate normal-txt">Find me on:</li>
          {#each socialLinks as link}
            <li class="ftco-animate">
              <a target="_blank" href={link.link}>
                <div class="round-icon">
                  <svelte:component this={link.icon} />
                </div>
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</section>

<style>
  .contact-section {
    background-color: black;
    color: #999999;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  .big-2 {
    font-size: 40px;
    font-weight: 700;
    color: white;
    margin-bottom: 20px;
  }

  .caption {
    font-size: 16px;
  }

  .contact-info .box {
    background-color: #333333;
    border-radius: 10px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .contact-info .box:hover {
    box-shadow: 0px 15px 40px -10px rgba(0, 0, 0, 0.2); /* Larger box shadow on hover */
  }

  .contact-info .box h3 {
    font-size: 20px;
    margin-bottom: 10px;
    color: #ffbd39;
  }

  .contact-info .box p,
  .contact-info .box a {
    font-size: 16px; /* Content font size */
    color: #fff; /* Content color */
  }

  .btn-primary:hover {
    background-color: #ffbd39; /* Button background color on hover */
    border-color: #ffbd39; /* Button border color on hover */
    color: #000000; /* Button text color on hover */
  }

  .ftco-footer-social {
    display: flex;
    justify-content: center; /* Center the items horizontally */
    align-items: center; /* Center the items vertically */
    margin-bottom: 0;
    margin-top: 40px;
  }

  .ftco-footer-social .normal-txt {
    margin-right: 10px; /* Adjust margin between text and icons */
    font-size: 16px;
    color: white;
  }

  .ftco-footer-social li {
    margin-right: 10px; /* Adjust margin between icons */
  }

  .round-icon {
    width: 40px; /* Set width and height for the icon container */
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%; /* Make the container round */
    background-color: #ffbd39; /* Set background color */
  }

  .round-icon {
    color: black; /* Set icon color */
    font-size: 20px; /* Set icon size */
  }

  .round-icon:hover {
    background-color: #ffbd39; /* Change background color on hover */
  }

  .queries {
    margin-top: 40px;
    color: white;
  }

  .btn-primary {
    cursor: pointer;
    border-radius: 20px;
    box-shadow: 0px 12px 24px -8px rgba(0, 0, 0, 0.09);
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 600;
    background: #ffbd39;
    border: 1px solid #ffbd39;
    color: #000000;
    padding: 1rem 2rem;
  }
</style>
