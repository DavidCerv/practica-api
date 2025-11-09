<script>
// @ts-nocheck

  import StatBar from './StatBar.svelte';
  import EvolutionChain from './EvolutionChain.svelte';

  export let pokemon = {};
  export let evolutionChain = null;
  export let dark = false; // si es true, aplica fondo oscuro a la card

  // Función para obtener el sprite animado o el default
  function getSpriteUrl(sprites) {
    // Intenta obtener el sprite animado de las versiones recientes (ej. Cristal o Blanco/Negro)
    const animatedSprite = sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default;
    
    // Si no hay animado, usa el sprite por defecto
    return animatedSprite || sprites.front_default;
  }

  // Estilo de color para el tipo (puedes expandir esto)
  const typeColors = {
    grass: 'bg-green-500', fire: 'bg-red-500', water: 'bg-blue-500', electric: 'bg-yellow-400',
    normal: 'bg-gray-400', poison: 'bg-purple-500', flying: 'bg-indigo-400', bug: 'bg-lime-500',
    // ... agrega más colores para todos los tipos
  };
</script>

<!-- Wrapper dorado brillante (margen) -->
<div class="rounded-xl p-1 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 shadow-lg" aria-hidden="true">
  <div class="rounded-xl shadow-2xl p-6 border-t-8 border-red-500" class:bg-gray-900={dark} class:bg-white={!dark}>
  <header class="flex flex-col items-center">
    <h2 class="text-4xl font-extrabold capitalize mb-1" class:text-gray-800={!dark} class:text-gray-100={dark}>
      {pokemon.name} <span class="text-2xl font-light" class:text-gray-500={!dark} class:text-gray-300={dark}>#{pokemon.id}</span>
    </h2>
    <img
      src={getSpriteUrl(pokemon.sprites)}
      alt={pokemon.name}
      class="w-40 h-40 object-contain mb-4 filter drop-shadow-lg"
    />
    
    <div class="flex space-x-2">
      {#each pokemon.types as typeInfo}
        <span class="{typeColors[typeInfo.type.name] || 'bg-gray-500'} text-white text-sm font-bold px-3 py-1 rounded-full capitalize shadow-md">
          {typeInfo.type.name}
        </span>
      {/each}
    </div>
  </header>

  <hr class="my-4" class:border-gray-200={!dark} class:border-gray-700={dark} />

  <section class="mb-6">
  <h3 class="text-xl font-bold mb-3 text-red-600 border-b pb-1" class:border-gray-200={!dark} class:border-gray-700={dark}>Estadísticas Base</h3>
    {#each pokemon.stats as stat}
      <StatBar 
        name={stat.stat.name} 
        baseStat={stat.base_stat}
        maxStat={255}
      />
      <!-- El máximo base_stat es 255 (Blissey HP) -->
    {/each}
  </section>
  
  <hr class="my-4" class:text-gray-800={!dark} class:text-gray-100={dark} />

  <section>
  <h3 class="text-xl font-bold mb-3 text-red-600 border-b pb-1" class:border-gray-200={!dark} class:border-gray-700={dark}>Cadena de Evolución</h3>
    {#if evolutionChain}
      <EvolutionChain chain={evolutionChain} />
    {:else}
  <p class="text-sm" class:text-gray-500={!dark} class:text-gray-300={dark}>No se pudo cargar la cadena de evolución.</p>
    {/if}
  </section>
  
  <hr class="my-4" class:text-gray-800={!dark} class:text-gray-100={dark} />

  <section>
    <h3 class="text-xl font-bold mb-3 text-red-600 border-b pb-1" class:border-gray-200={!dark} class:border-gray-700={dark}>Habilidades</h3>
    <ul class="list-disc list-inside space-y-1" class:text-gray-700={!dark} class:text-gray-300={dark}>
      {#each pokemon.abilities as abilityInfo}
        <li class="capitalize">
          {abilityInfo.ability.name} 
          {#if abilityInfo.is_hidden}
            <span class="text-xs font-semibold px-2 rounded-full ml-1" class:bg-yellow-100={!dark} class:text-yellow-800={!dark} class:bg-yellow-700={dark} class:text-yellow-200={dark}> (Oculta)</span>
          {/if}
        </li>
      {/each}
    </ul>
  </section>
    </div>
  </div>
