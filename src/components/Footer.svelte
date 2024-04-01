<script>
  export let year = new Date().getFullYear(); // Get current year dynamically
</script>

<footer class="ftco-footer ftco-section">
  <div class="container">
    <div class="row">
      <div class="col-md-12 text-center">
        <p>
          Copyright &copy; {year} All rights reserved | This website is designed
          by <a href="https://nirajpaudel.me" target="_blank">Niraj Paudel</a>
          using inspiration from
          <a href="https://colorlib.com" target="_blank">Colorlib</a>.
        </p>
      </div>
    </div>
  </div>
</footer>

<style>
  /* Custom styles based on provided CSS */

  .ftco-footer {
    background-color: black;
    color: #999999; /* Text color */
    margin-top: 40px; /* Top margin */
    margin-bottom: 40px; /* Bottom margin */
  }

  .ftco-footer p {
    font-size: 16px; /* Font size */
    margin-bottom: 0; /* Remove bottom margin for paragraph */
  }

  .ftco-footer a {
    color: #ffbd39; /* Link color */
  }

  .ftco-footer a:hover {
    color: #ffbd39; /* Link color on hover */
  }
</style>
