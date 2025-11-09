<script>
    /**
	 * @type {any[] | null | undefined}
	 */
     export let episodes = [];
</script>

<div class="episode-scroll-container">
    {#each episodes as episode (episode.id)}
        <div class="episode-card">
            <span class="episode-code">{episode.episode}</span>
            <h4 class="episode-name">{episode.name}</h4>
            <p class="air-date">{episode.air_date}</p>
        </div>
    {:else}
        <p class="no-results">No se encontraron episodios.</p>
    {/each}
</div>

<style>
    .episode-scroll-container {
        display: flex; /* Habilita el layout horizontal */
        overflow-x: auto; /* Habilita el scroll horizontal */
        padding: 15px 0;
        /* Estilo para la barra de scroll (opcional y dependiente del navegador) */
        scrollbar-width: thin;
        scrollbar-color: #33ff33 #000;
    }

    .episode-scroll-container::-webkit-scrollbar {
        height: 8px;
    }
    .episode-scroll-container::-webkit-scrollbar-thumb {
        background-color: #33ff33;
        border-radius: 10px;
    }
    .episode-scroll-container::-webkit-scrollbar-track {
        background: #000;
    }

    .episode-card {
        flex: 0 0 auto; /* Importante: evita que las tarjetas se estiren */
        width: 250px;
        background: rgba(40, 40, 40, 0.9);
        border: 1px solid #00ff00;
        border-radius: 8px;
        padding: 15px;
        margin-right: 15px; /* Espacio entre tarjetas */
        box-shadow: 0 0 8px rgba(0, 255, 0, 0.4);
        transition: background 0.3s;
    }
    
    .episode-card:hover {
        background: rgba(60, 60, 60, 0.9);
    }

    .episode-code {
        font-size: 0.8em;
        color: #99ff99;
        display: block;
        margin-bottom: 5px;
    }
    
    .episode-name {
        font-size: 1.1em;
        color: #e5ff00;
        margin: 0 0 5px 0;
    }
    
    .air-date {
        font-size: 0.9em;
        color: #ccc;
    }

    .no-results {
        color: #fff;
        font-size: 1.2em;
        padding: 15px;
    }
</style>