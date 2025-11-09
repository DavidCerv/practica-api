<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import PortalBackground from '$lib/components/./PortalBackground.svelte';
    import SearchBar from '$lib/components/./SearchBar.svelte';
    import CharacterMenu from '$lib/components/./CharacterMenu.svelte';
    import EpisodeMenu from '$lib/components/EpisodeMenu.svelte';

    // Estados para la API
    let allCharacters = [];
    let filteredCharacters = [];
    let allEpisodes = [];
    let filteredEpisodes = [];
    let loading = true;

    // Estado de búsqueda
    let searchTerm = '';

    // --- LÓGICA DE FETCHING ---
    onMount(async () => {
        try {
            // Cargar Personajes (solo la primera página para empezar)
            const characterRes = await fetch('https://rickandmortyapi.com/api/character');
            const characterData = await characterRes.json();
            allCharacters = characterData.results;

            // Cargar Episodios (solo la primera página para empezar)
            const episodeRes = await fetch('https://rickandmortyapi.com/api/episode');
            const episodeData = await episodeRes.json();
            allEpisodes = episodeData.results;
            
            // Inicializar los filtrados con todos los datos
            filteredCharacters = allCharacters;
            filteredEpisodes = allEpisodes;

            loading = false;
        } catch (error) {
            console.error("Error al cargar la API:", error);
            loading = false;
        }
    });

    // --- LÓGICA DE FILTRADO (Reactividad en Svelte) ---
    $: {
        if (searchTerm && searchTerm.length > 1) {
            const term = searchTerm.toLowerCase();
            
            // Filtrar Personajes por nombre
            filteredCharacters = allCharacters.filter(character => 
                character.name.toLowerCase().includes(term)
            );

            // Filtrar Episodios por nombre
            filteredEpisodes = allEpisodes.filter(episode => 
                episode.name.toLowerCase().includes(term)
            );
        } else {
            // Mostrar todos si no hay término de búsqueda
            filteredCharacters = allCharacters;
            filteredEpisodes = allEpisodes;
        }
    }
</script>

<div class="page-container">
    <PortalBackground /> 

    <header class="header-content">
        <h1>Rick & Morty Explorer</h1>
        <SearchBar bind:searchTerm={searchTerm} />
    </header>
    
    <main class="main-content">
        {#if loading}
            <p class="loading-message">Cargando dimensiones...</p>
        {:else}
            <section class="episodes-section">
                <h2>Episodios ({filteredEpisodes.length})</h2>
                <EpisodeMenu episodes={filteredEpisodes} />
            </section>

            <section class="characters-section">
                <h2>Personajes ({filteredCharacters.length})</h2>
                <CharacterMenu characters={filteredCharacters} /> 
            </section>
        {/if}
    </main>
</div>

<style>
    /*
        Aplica estilos al contenedor principal de la página.
    */
    .page-container {
        /* Establece el fondo en negro */
        background-color: black; 
        
        /* Asegura que el contenedor ocupe al menos toda la altura de la ventana */
        min-height: 100vh;
        
        /* Opcional: Establece el color de texto por defecto a blanco para contrastar */
        color: white; 
        
        /* Opcional: Añade un poco de padding al contenido */
        padding: 20px;
        
        /* Asegura que el contenido quede por encima del fondo animado */
        position: relative; 
        z-index: 1; /* Esto es opcional si el body no tiene un background*/
    }

    /* Opcional: Mejora el estilo de los encabezados si es necesario */
    h1, h2 {
        color: limegreen; /* Ejemplo de color temático Rick & Morty */
    }

    /* Opcional: Si el PortalBackground tiene z-index: -1, el fondo negro del
       .page-container se verá. Si no, necesitarías poner el fondo negro
       en el <body> usando CSS global.
    */
</style>