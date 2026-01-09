<script>
    import { onMount } from 'svelte';

    export let limit = 50;

    let pokemons = [];
    let loading = true;
    let error = null;
    let currentIndex = 0;

    function chooseSprite(sprites) {
        if (!sprites) return '';
        return sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default || sprites.front_default || '';
    }

    async function fetchList() {
        loading = true;
        error = null;
        pokemons = [];

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
            if (!res.ok) throw new Error('Failed to load pokemon list');
            const data = await res.json();

            const detailPromises = data.results.map(async (p) => {
                try {
                    const r = await fetch(p.url);
                    if (!r.ok) return null;
                    const d = await r.json();
                    return {
                        id: d.id,
                        name: d.name,
                        sprite: chooseSprite(d.sprites),
                    };
                } catch (e) {
                    return null;
                }
            });

            const details = await Promise.all(detailPromises);
            pokemons = details.filter(Boolean);
        } catch (e) {
            error = e.message || String(e);
        } finally {
            loading = false;
        }
    }

    function next() {
        if (pokemons.length > 0) {
            currentIndex = (currentIndex + 1) % pokemons.length;
        }
    }

    function prev() {
        if (pokemons.length > 0) {
            currentIndex = (currentIndex - 1 + pokemons.length) % pokemons.length;
        }
    }

    onMount(() => {
        fetchList();
    });
</script>

<div class="w-full px-5"> <!-- Margen lateral de ~0.5cm (20px) -->
    {#if loading}
        <div class="py-10 text-center text-white/80 animate-pulse font-medium">Cargando Pokémon...</div>
    {:else if error}
        <div class="py-10 text-center text-red-200 text-sm">Error: {error}</div>
    {:else if pokemons.length > 0}
        <div class="relative overflow-hidden rounded-lg bg-black/20 backdrop-blur-sm shadow-inner aspect-square">
            <div 
                class="flex transition-transform duration-300 ease-in-out h-full" 
                style="transform: translateX(-{currentIndex * 100}%)"
            >
                {#each pokemons as p}
                    <div class="w-full flex-shrink-0 flex flex-col items-center justify-center p-4 h-full">
                        {#if p.sprite}
                            <img 
                                src={p.sprite} 
                                alt={p.name} 
                                class="w-32 h-32 object-contain drop-shadow-lg mb-2 transition-transform hover:scale-110 duration-200" 
                            />
                        {/if}
                        <span class="capitalize font-bold text-xl text-white drop-shadow-md tracking-wide">{p.name}</span>
                    </div>
                {/each}
            </div>

            <!-- Botones de navegación -->
            <button 
                class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-10"
                on:click={prev}
                aria-label="Anterior"
            >
                &lt;
            </button>
            <button 
                class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-10"
                on:click={next}
                aria-label="Siguiente"
            >
                &gt;
            </button>
        </div>
        
        <!-- Indicador simple -->
        <div class="text-center mt-3 text-xs font-medium text-white/70">
            {currentIndex + 1} / {pokemons.length}
        </div>
    {/if}
</div>
