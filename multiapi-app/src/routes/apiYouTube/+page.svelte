<script lang="ts">
  import { fade } from 'svelte/transition';

  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  let query = '';

  // ✨ Definimos el tipo de video
  interface YouTubeVideo {
    id: { videoId: string };
    snippet: {
      title: string;
      channelTitle: string;
      thumbnails: { medium: { url: string } };
    };
  }

  // 👇 Y ahora declaramos videos con ese tipo
  let videos: YouTubeVideo[] = [];

  const searchVideos = async () => {
    if (query.trim() === '') return;

    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=6&q=${encodeURIComponent(
        query
      )}&key=${API_KEY}`
    );

    const data = await res.json();
    videos = data.items as YouTubeVideo[];
  };
</script>


<!-- 🌊 Fondo y estructura principal -->
<div
  class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-blue-600 text-white font-pirate relative overflow-hidden"
>
  <!-- 🌟 Sombrero flotante -->
  <img
    src="/sombrero.jpg"
    alt="Sombrero de Paja"
    class="w-40 mb-6 animate-float drop-shadow-lg"
  />

  <!-- 🏴‍☠️ Título -->
  <h1 class="text-4xl mb-8 font-bold drop-shadow-md" transition:fade>
    🏴‍☠️ One Piece YouTube Explorer
  </h1>

  <!-- 🔎 Barra de búsqueda -->
  <div
    class="flex items-center bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden w-[90%] max-w-lg border border-yellow-400/50 shadow-lg shadow-yellow-400/10"
  >
    <input
      bind:value={query}
      type="text"
      placeholder="Busca tu video..."
      class="flex-1 bg-transparent text-white placeholder-gray-300 p-3 outline-none"
      on:keydown={(e) => e.key === 'Enter' && searchVideos()}
    />
    <button
      on:click={searchVideos}
      class="p-3 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold transition-colors relative overflow-hidden"
    >
      Buscar 🔍
    </button>
  </div>

  <p class="mt-4 text-sm opacity-80">Powered by YouTube API</p>

  <!-- 🎥 Resultados -->
  {#if videos.length > 0}
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-[90%] max-w-5xl"
      transition:fade
    >
      {#each videos as video}
        <a
          href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
          target="_blank"
          class="bg-white/10 p-3 rounded-xl hover:bg-yellow-400/20 transition transform hover:scale-105"
        >
          <img
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            class="rounded-lg mb-2 w-full"
          />
          <h2 class="text-lg font-bold line-clamp-2">{video.snippet.title}</h2>
          <p class="text-sm opacity-70">{video.snippet.channelTitle}</p>
        </a>
      {/each}
    </div>
  {/if}
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Pirata+One&display=swap');

  .font-pirate {
    font-family: 'Pirata One', cursive;
  }

  /* 🌊 Fondo animado de olas */
  body {
    background: linear-gradient(to bottom, #001f3f, #0074D9);
    overflow: hidden;
  }

  body::after {
    content: "";
    position: absolute;
    width: 200%;
    height: 200px;
    bottom: 0;
    left: -50%;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    animation: wave 6s infinite linear;
  }

  @keyframes wave {
    0% { transform: translateX(0); }
    100% { transform: translateX(50%); }
  }

  /* 🎩 Sombrero flotante */
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  /* ✨ Efecto de brillo dorado en el botón */
  button::after {
    content: "";
    position: absolute;
    top: 0;
    left: -75%;
    width: 50%;
    height: 100%;
    background: linear-gradient(120deg, rgba(255,255,255,0.5), rgba(255,255,255,0));
    transform: skewX(-25deg);
    animation: shine 3s infinite;
  }

  @keyframes shine {
    0% { left: -75%; }
    100% { left: 125%; }
  }

  /* 🖼️ Evita saltos bruscos en títulos */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
