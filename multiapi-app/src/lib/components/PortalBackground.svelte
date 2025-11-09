<script>
  // No se necesita lógica aquí
</script>

<div class="fondo-giratorio">
  </div>

<style>
  .fondo-giratorio {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    z-index: -1;
    pointer-events: none;

    /* **¡Añadimos un color de fondo negro sólido!** */
    background-color: black;

    /* La imagen del universo que girará */
    background-image: url('https://i.redd.it/lwwt86ci5anz.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    animation: rotacion-fondo 60s linear infinite;
  }

  @keyframes rotacion-fondo {
    from {
      transform: rotate(0deg) scale(1.2);
    }
    to {
      transform: rotate(360deg) scale(1.2);
    }
  }
</style>