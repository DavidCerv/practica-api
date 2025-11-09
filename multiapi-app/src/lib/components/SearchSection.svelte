<script>
  import { createEventDispatcher } from 'svelte';

  export let isLoading = false;
  let searchInput = '';

  const dispatch = createEventDispatcher();

  function handleSearch() {
    if (searchInput.trim()) {
      dispatch('search', searchInput.trim());
    }
  }
</script>

<div class="flex items-center space-x-2 w-full max-w-sm">
  <input
    type="text"
    placeholder="Nombre o ID del Pokémon..."
    bind:value={searchInput}
    on:keypress={e => e.key === 'Enter' && handleSearch()}
    disabled={isLoading}
    class="flex-grow p-3 border-2 border-gray-300 rounded-full focus:outline-none focus:border-red-500 transition duration-300 shadow-inner"
  />

<button
    on:click={handleSearch}
    disabled={isLoading}
    class="w-16 h-16 rounded-full border-4 border-gray-800 shadow-xl relative overflow-hidden
                 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
    class:animate-spin-slow={isLoading}
    title="Buscar Pokémon"
>
    <!-- Dos mitades: arriba rojo, abajo blanco -->
    <div class="absolute inset-0 flex flex-col pointer-events-none">
        <div class="flex-1 bg-red-600"></div>
        <div class="flex-1 bg-white"></div>
    </div>

    <!-- Línea divisoria negra -->
    <div class="absolute left-0 right-0 top-1/2 h-2 bg-gray-800 transform -translate-y-1/2 pointer-events-none"></div>

    <!-- Círculo central que une las mitades (como la bisagra del Pokéball) -->
    <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full border-4 border-gray-800 z-10 pointer-events-none"></div>
</button>
</div>

<style>
  /* Define una animación más lenta para que el spin se vea como un giro interesante, no rápido */
  .animate-spin-slow {
    animation: spin-slow 2s linear infinite;
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>