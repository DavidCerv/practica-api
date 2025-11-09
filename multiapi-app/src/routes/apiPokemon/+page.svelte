<script>
// @ts-nocheck

  import SearchSection from '$lib/components/SearchSection.svelte';
  import PokemonCard from '$lib/components/PokemonCard.svelte';
  import { fade } from 'svelte/transition'; // Para animar la card al aparecer

  // Estados reactivos
  let pokemonData = null; // Información del Pokémon
  let evolutionData = null; // Cadena de evolución
  let isLoading = false;
  let error = null;
  let dark = false; // tema por defecto claro

  // --- Funciones de Fetching ---

  // 1. Obtener la data base del Pokémon
  async function fetchPokemon(nameOrId) {
    isLoading = true;
    error = null;
    pokemonData = null;
    evolutionData = null;
    const baseURL = "https://pokeapi.co/api/v2/pokemon/";

    try {
      const res = await fetch(`${baseURL}${nameOrId.toLowerCase()}`);
      if (!res.ok) throw new Error(`Pokémon "${nameOrId}" no encontrado.`);

      const data = await res.json();
      pokemonData = data;

      // Una vez tenemos la data base, obtenemos la evolución
      await fetchEvolutionChain(data.species.url);

    } catch (e) {
      error = e.message;
    } finally {
      isLoading = false;
    }
  }

  // 2. Obtener la cadena de evolución (requiere un fetch secundario)
  async function fetchEvolutionChain(speciesUrl) {
    try {
      // 1. Fetch de la especie para obtener la URL de la cadena
      const speciesRes = await fetch(speciesUrl);
      const speciesData = await speciesRes.json();
      const evolutionChainUrl = speciesData.evolution_chain.url;

      // 2. Fetch de la cadena de evolución
      const evolutionRes = await fetch(evolutionChainUrl);
      evolutionData = await evolutionRes.json();
      
      // console.log("Cadena de evolución:", evolutionData.chain); // Puedes ver la estructura aquí
    } catch (e) {
      console.error("Error al obtener la cadena de evolución:", e);
      // No seteamos un error principal para no bloquear la Card
    }
  }
</script>


<main class="p-4 flex flex-col items-center" class:bg-gray-900={dark} class:bg-white={!dark}>
  <div class="w-full max-w-lg flex items-center justify-between">
    <h1 class="text-4xl font-bold mb-6 text-red-600">Svelte Pokédex</h1>
    <!-- Toggle de tema -->
    <button
      class="ml-4 px-3 py-2 rounded-full border border-gray-300 bg-white text-gray-800 shadow-sm"
      on:click={() => (dark = !dark)}
      aria-pressed={dark}
      aria-label="Alternar tema oscuro"
      >
      {#if dark}
        Claro
      {:else}
        Oscuro
      {/if}
    </button>
  </div>

  <SearchSection on:search={e => fetchPokemon(e.detail)} {isLoading} />

  {#if isLoading}
    <p class="text-xl mt-8 animate-pulse text-gray-500">Buscando Pokémon...</p>
    {:else if error}
    <p class="text-xl mt-8 text-red-500 font-medium">❌ ¡{error}! Intenta con otro nombre o ID (ej: pikachu, 1).</p>
  {:else if pokemonData}
  <div transition:fade={{ duration: 300 }} class="mt-8 w-full max-w-lg">
  <PokemonCard pokemon={pokemonData} evolutionChain={evolutionData ? evolutionData.chain : null} dark={dark} />
    </div>
  {:else}
    <p class="text-xl mt-8 text-gray-400">¡Busca tu primer Pokémon!</p>
  {/if}
</main>