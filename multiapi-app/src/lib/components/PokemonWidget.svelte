<script>
// @ts-nocheck
import { onMount } from 'svelte';

export let limit = 50; // número de pokémon a mostrar (por defecto 50)

let pokemons = [];
let loading = true;
let error = null;

// --- VARIABLES DEL CARRUSEL CENTRADO ---
let currentItemIndex = 0; // Índice del ítem actualmente centrado

// Ancho de un ítem (240px) + gap (16px) = 256px de espacio total por ítem
const itemWidth = 256; 

// El padding horizontal total del contenedor (.group con p-6). 
// p-6 en Tailwind es 1.5rem, que son 24px. Total: 24px * 2 = 48px
const CONTAINER_PADDING = 48; 

let innerWidth = 0;       // Ancho total de la ventana
let containerWidth = 0;   // Ancho real del contenedor (sin padding)
let carouselOffset = 0;   // Posición de desplazamiento en píxeles (translateX)

// Cálculo reactivo del índice máximo al que se puede llegar
$: maxIndex = pokemons.length > 0 ? pokemons.length - 1 : 0;

// CALCULA LA POSICIÓN DE DESPLAZAMIENTO (translateX) para centrar el ítem
$: {
    // 1. Calcular el ancho interno real del área de visualización del carrusel
    containerWidth = innerWidth - CONTAINER_PADDING; 

    // 2. Calcular el desplazamiento necesario para que el ítem centrado 
    //    quede en el centro del 'containerWidth'.
    // Formula: -(index * itemWidth) + (containerWidth / 2) - (itemWidth / 2)
    carouselOffset = -(currentItemIndex * itemWidth) + (containerWidth / 2) - (itemWidth / 2);
}

// Función para deslizar el carrusel
function slide(direction) {
    // direction: 1 (atrás/izquierda), -1 (adelante/derecha)
    let newIndex = currentItemIndex - direction; 

    // Lógica para limitar el desplazamiento
    if (newIndex < 0) {
        newIndex = 0; // No ir más allá del primer ítem
    } else if (newIndex > maxIndex) {
        newIndex = maxIndex; // No ir más allá del último ítem
    }

    currentItemIndex = newIndex;
}

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

// Inicializa el ancho de la ventana y escucha cambios para centrado responsivo
onMount(() => {
    fetchList();

    // Capturar el ancho de la ventana
    innerWidth = window.innerWidth;
    const handleResize = () => {
        innerWidth = window.innerWidth;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
});
</script>

<style>
    .slider-view {
    overflow: hidden;
    width: 100%;
    padding: 0;
    }
    .slider-track {
        display: flex;
        gap: 1rem;
        white-space: nowrap;
        transition: transform 300ms ease-in-out;
    }
    .poke-item {
        width: 240px;
        height: 240px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04));
        border-radius: 20px;
        padding: 12px;
        box-shadow: 0 6px 18px rgba(0,0,0,0.25);
        transition: transform 200ms ease;
    }

    .poke-item img { max-width: 192px; max-height: 192px; }

    .poke-item:hover { transform: translateY(-8px) scale(1.03); }

    .slider-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.6);
        color: white;
        border: 2px solid white;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 10;
        border-radius: 50%;
        transition: opacity 200ms, background 200ms;
        user-select: none;
    }

    .slider-button.left { left: 10px; }
    .slider-button.right { right: 10px; }

    .slider-button:hover:not(:disabled) {
        background: rgba(0, 0, 0, 0.8);
    }

    .slider-button:disabled {
        opacity: 0.3;
        cursor: not-allowed;
        border-color: rgba(255, 255, 255, 0.3);
    }
</style>

<div class="w-full">
  <div 
    class="group block rounded-xl shadow-lg transform hover:-translate-y-1 transition-shadow duration-300 overflow-hidden 
           p-6 bg-gradient-to-br from-indigo-700 to-indigo-900 text-white min-h-[12rem] items-center relative" >
    <header class="flex justify-between items-center mb-4 z-10 relative">
        <h2 class="text-3xl font-bold flex items-center">
            <span class="mr-2 text-red-500">⚡</span>Pokémon
        </h2>
        <a href="#link" class="text-sm font-semibold text-gray-200 hover:text-white transition">
            Ir a Pokémon &rarr;
        </a>
    </header>
          
    {#if loading}
      <div class="py-6 text-center text-xl font-semibold">Cargando Pokémon…</div>
    {:else if error}
      <div class="py-6 text-center text-red-300">Error: {error}</div>
    {:else}
      
            <div class="slider-view"> 
                <div 
            class="slider-track" 
            style="transform: translateX({carouselOffset}px);"
        >
          {#each pokemons as p}
            <div class="poke-item" title={p.name}>
              {#if p.sprite}
                <img src={p.sprite} alt={p.name} loading="lazy"
                class="w-40 h-40 object-contain mb-4 filter drop-shadow-lg"
                />
              {:else}
                <div class="text-xs">{p.name}</div>
              {/if}
            </div>
          {/each}
                  </div>
      </div>
      
      <button 
          class="slider-button left" 
          on:click={() => slide(1)} 
          disabled={currentItemIndex === 0}
      >
          &lt;
      </button>

      <button 
          class="slider-button right" 
          on:click={() => slide(-1)}
          disabled={currentItemIndex === maxIndex}
      >
          &gt;
      </button>
    {/if}
  </div>
</div>