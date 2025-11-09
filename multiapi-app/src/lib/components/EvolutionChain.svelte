<script>
  export let chain; // El objeto 'chain' de la respuesta de evolution-chain

  // Función para extraer una lista plana de nombres de la cadena anidada
  /**
	 * @param {{ species: { name: any; }; evolves_to: any[]; }} chainObj
	 */
  // @ts-ignore
  function getEvolutionNames(chainObj, names = []) {
    // Añade el nombre del Pokémon actual
    names.push(chainObj.species.name);

    // Recorre las evoluciones de este Pokémon
    if (chainObj.evolves_to && chainObj.evolves_to.length > 0) {
      chainObj.evolves_to.forEach(nextChain => {
        // Llama a la función recursivamente para el siguiente nivel de evolución
        getEvolutionNames(nextChain, names);
      });
    }
    return names;
  }

  // Lista de nombres de la cadena (ej: ['charmander', 'charmeleon', 'charizard'])
  $: evolutionNames = getEvolutionNames(chain); 
</script>

<div class="flex flex-wrap justify-center items-center space-x-2">
  {#each evolutionNames as name, i}
    <div class="flex flex-col items-center">
      <span class="capitalize text-sm font-semibold text-gray-700">{name}</span>
      
      {#if i < evolutionNames.length - 1}
        <span class="text-lg text-red-500 font-extrabold mt-1">→</span>
      {/if}
    </div>
  {/each}
</div>