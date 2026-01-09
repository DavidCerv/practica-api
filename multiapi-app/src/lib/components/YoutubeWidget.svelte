<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';

  // Props
  export let query = 'programming music';
  export let limit = 5;

  // State
  let videos: any[] = [];
  let currentIndex = 0;
  let loading = true;
  let error: string | null = null;
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  onMount(async () => {
    if (!API_KEY) {
      error = 'Falta API Key';
      loading = false;
      return;
    }
    await fetchVideos();
  });

  async function fetchVideos() {
    try {
      loading = true;
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${limit}&q=${encodeURIComponent(
          query
        )}&key=${API_KEY}`
      );

      if (!res.ok) {
        throw new Error(`Error ${res.status}`);
      }

      const data = await res.json();
      videos = data.items || [];
    } catch (e: any) {
      console.error(e);
      error = 'Error al cargar videos';
    } finally {
      loading = false;
    }
  }

  function next() {
    if (videos.length > 0) {
      currentIndex = (currentIndex + 1) % videos.length;
    }
  }

  function prev() {
    if (videos.length > 0) {
      currentIndex = (currentIndex - 1 + videos.length) % videos.length;
    }
  }
</script>

<div class="relative h-full w-full overflow-hidden rounded-lg bg-black/20">
  {#if loading}
    <div class="flex h-full flex-col items-center justify-center space-y-2">
      <div
        class="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent"
      ></div>
      <p class="text-xs text-white/70">Cargando...</p>
    </div>
  {:else if error}
    <div class="flex h-full items-center justify-center p-4 text-center">
      <p class="text-sm text-red-300">⚠️ {error}</p>
    </div>
  {:else if videos.length > 0}
    <!-- Carousel Container -->
    <div class="group relative h-full w-full">
      {#key currentIndex}
        <div
          class="absolute inset-0 flex flex-col"
          in:fade={{ duration: 300 }}
          out:fade={{ duration: 300 }}
        >
          <!-- Thumbnail / Video Link -->
          <a
            href={`/apiYouTube?v=${videos[currentIndex].id.videoId}`}
            class="relative flex-1 overflow-hidden"
          >
            <img
              src={videos[currentIndex].snippet.thumbnails.high.url}
              alt={videos[currentIndex].snippet.title}
              class="h-full w-full object-cover opacity-80 transition-transform duration-500 hover:scale-110 hover:opacity-100"
            />
            <!-- Play Icon Overlay -->
            <div
              class="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
            >
              <div class="rounded-full bg-red-600 p-3 shadow-lg">
                <svg
                  class="h-6 w-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </a>

          <!-- Info Overlay -->
          <div class="absolute bottom-0 w-full bg-gradient-to-t from-black/90 to-transparent p-3 pt-8">
            <h3 class="line-clamp-1 text-sm font-bold text-white">
              {videos[currentIndex].snippet.title}
            </h3>
            <p class="text-xs text-gray-300">
              {videos[currentIndex].snippet.channelTitle}
            </p>
          </div>
        </div>
      {/key}

      <!-- Controls -->
      <button
        on:click|preventDefault|stopPropagation={prev}
        class="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-black/50 p-1 text-white opacity-0 transition-all hover:bg-red-600 group-hover:opacity-100"
      >
        <svg
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        on:click|preventDefault|stopPropagation={next}
        class="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-black/50 p-1 text-white opacity-0 transition-all hover:bg-red-600 group-hover:opacity-100"
      >
        <svg
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <!-- Dots Indicator -->
      <div class="absolute bottom-1 left-0 right-0 flex justify-center space-x-1">
        {#each videos as _, i}
          <div
            class="h-1.5 w-1.5 rounded-full transition-colors {i ===
            currentIndex
              ? 'bg-red-500'
              : 'bg-white/30'}"
          ></div>
        {/each}
      </div>
    </div>
  {:else}
    <div class="flex h-full items-center justify-center">
      <p class="text-xs text-white/50">No hay videos</p>
    </div>
  {/if}
</div>
