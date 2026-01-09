<script>    
	import PokemonWidget from '$lib/components/PokemonWidget.svelte';
	import WeatherWidget from '$lib/components/WeatherWidget.svelte';
	import YoutubeWidget from '$lib/components/YoutubeWidget.svelte';

 let  {data } = $props(); 
    

    
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-6 text-gray-100">
	<h1 class="mb-12 text-5xl font-extrabold text-white">Explora Nuestras APIs</h1>
<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
	{#if data.pokemonData}
		<div
			class="group block transform overflow-hidden rounded-xl bg-gradient-to-br from-red-600 to-red-800 p-4
                text-white shadow-lg transition-shadow duration-300 hover:-translate-y-1"
		>
			<div class="mb-2 flex items-start justify-between">
				<span class="text-2xl">⚡ Pokémon</span>
				<a href="/apiPokemon" class="text-sm text-red-100 hover:underline">Ir a Pokémon →</a>
			</div>
			<div class="w-full">
				<PokemonWidget limit={50} />
			</div>
		</div>
	{:else}{/if}
	<!-- Clima (ícono: 🌤) - si hay datos mostramos el widget dentro de la tarjeta -->
	{#if data.weatherData}
		<div class="group block transform overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 p-4
                        text-white shadow-lg transition-shadow duration-300 hover:-translate-y-1"
		>
			<div class="mb-2 flex items-start justify-between">
				<span class="text-2xl">🌤 Clima</span>
				<a href="/apiClima" class="text-sm text-blue-100 hover:underline">Ir a Clima →</a>
			</div>
			<!-- Envolvemos el widget para que herede el estilo oscuro -->
			<div class="w-full">
				<WeatherWidget
					city={data.weatherData.city}
					temp={data.weatherData.temp}
					description={data.weatherData.description}
					icon={data.weatherData.icon}
				/>
			</div>
		</div>
	{:else}
		<a
			href="/apiClima"
			class="group block flex transform flex-col items-center justify-center overflow-hidden rounded-xl
                                       bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-center text-white shadow-lg transition-shadow duration-300 hover:-translate-y-1"
		>
			<span class="mb-2 text-2xl">🌤 Clima</span>
			<p class="mb-2 font-semibold text-red-300">Clima no disponible</p>
			<span class="text-sm text-blue-100 hover:underline">Ir a la sección de Clima →</span>
		</a>
	{/if}

	<!-- Rick and Morty (ícono: 👽) -->
	<a
		href="/apiRickyMorty"
		class="group block transform overflow-hidden rounded-xl bg-gradient-to-br from-green-600 to-green-800 text-white
                                      shadow-lg transition-shadow duration-300 hover:-translate-y-1"
	>
		<div class="flex flex-col items-center p-6">
			<video
				src="/rickymorty.mp4"
				autoplay
				loop
				muted
				playsinline
				class="mb-4 h-full w-full rounded-lg object-cover"
			></video>
			<span class="mb-1 text-2xl">👽 Rick & Morty</span>
			<p class="text-center text-sm text-green-100">Explora el multiverso y sus personajes.</p>
		</div>
	</a>

	<!-- YouTube (ícono: ▶️) -->
	<div
		class="group block transform overflow-hidden rounded-xl bg-gradient-to-br from-red-600 to-red-800 text-white
                                     shadow-lg transition-shadow duration-300 hover:-translate-y-1"
	>
		<div class="flex flex-col items-center p-6">
			<div
				class="mb-4 flex h-48 w-full items-center justify-center overflow-hidden rounded-md bg-black/20"
			>
				<YoutubeWidget query="programming tips" limit={5} />
			</div>
			<span class="mb-1 text-2xl">▶️ YouTube</span>
			<p class="text-center text-sm text-red-100">Encuentra videos y tendencias.</p>
		</div>
	</div>
</div>
</div>

<!-- Agregamos el widget de Pokémon debajo del grid principal para mostrar los primeros 50 -->
