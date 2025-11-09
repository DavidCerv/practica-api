<script>
    import CharacterCard from './CharacterCard.svelte';

    // Recibe la lista de personajes del componente padre (Home)
    export let characters = [];
</script>

<div class="character-grid">
    {#each characters as character (character.id)}
        <CharacterCard character={character} />
    {:else}
        <p class="no-results">¡Wubba Lubba Dub Dub! No se encontraron personajes.</p>
    {/each}
</div>

<style>
    .character-grid {
        display: grid;
        /* Cuadrícula responsiva: 
           - minmax(280px, 1fr) asegura que la tarjeta tenga al menos 280px de ancho. 
           - repeat(auto-fit, ...) crea tantas columnas como sea posible. */
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
        padding: 10px 0;
    }

    .no-results {
        grid-column: 1 / -1; /* Ocupa todo el ancho de la cuadrícula */
        text-align: center;
        font-size: 1.5em;
        color: #ff00ff; /* Un color de error llamativo */
        text-shadow: 0 0 10px #ff00ff;
        padding: 50px 0;
    }
</style>