<script lang="ts">
    import WeatherCard from '$lib/components/WeatherCard.svelte';

    // Reemplaza con tu clave de API (Asegúrate de que SOLO sea la clave)
    const API_KEY = "8b620a252272976a42746c3ac9afac42"; 

    // Estados para la UI
    let searchCity: string = ''; // Ciudad que escribe el usuario
    let loading = false;
    let weatherData: any = null;
    let error: string | null = null;
    
    // Función de búsqueda
    async function searchWeather() {
        if (!searchCity.trim()) {
            error = "Por favor, ingresa el nombre de una ciudad.";
            return;
        }

        loading = true;
        error = null;
        weatherData = null;

        try {
            // Reemplazamos la geolocalización por la búsqueda por nombre de ciudad (q=)
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.trim()}&units=metric&appid=${API_KEY}`;
            
            const response = await fetch(url);
            
            if (response.status === 404) {
                throw new Error(`Ciudad "${searchCity}" no encontrada.`);
            }
            if (!response.ok) {
                // Captura el error 401 (Unauthorized) si la clave es incorrecta
                throw new Error('Error al obtener los datos. Revisa la clave de API.');
            }

            const data = await response.json();
            
            // Mapeamos los datos al formato de nuestro WeatherCard
            weatherData = {
                city: data.name,
                temp: Math.round(data.main.temp),
                description: data.weather[0].description,
                icon: data.weather[0].icon,
                lat: data.coord.lat,
                lon: data.coord.lon,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                pressure: data.main.pressure
            };
            
        } catch (e: any) {
            error = e.message;
        } finally {
            loading = false;
        }
    }
</script>

<div class="min-h-screen bg-black text-white p-8">
    <h1 class="text-4xl font-extrabold mb-10 text-center">Búsqueda de Clima Global 🌎</h1>

    <div class="max-w-xl mx-auto">
        <form on:submit|preventDefault={searchWeather} class="flex mb-10 shadow-lg rounded-xl overflow-hidden">
            <input 
                bind:value={searchCity}
                type="text" 
                placeholder="Ingresa el nombre de una ciudad (ej: Londres, Tokio)"
                class="w-full p-4 text-lg bg-gray-800 border-none focus:ring-4 focus:ring-red-500 text-white placeholder-gray-500 transition duration-200"
            />
            
            <button 
                type="submit" 
                disabled={loading}
                class="p-4 bg-red-600 hover:bg-red-700 text-white font-bold text-lg disabled:opacity-50 transition duration-200 focus:outline-none focus:ring-4 focus:ring-red-500"
            >
                {loading ? 'Buscando...' : 'Buscar Clima'}
            </button>
        </form>

        {#if loading && !weatherData}
            <p class="text-lg text-red-400 text-center">Cargando datos climáticos...</p>
        {:else if error}
            <div class="bg-red-900 border-l-4 border-red-500 text-red-100 p-4 rounded-lg">
                <p class="font-bold">Error en la Consulta:</p>
                <p>{error}</p>
            </div>
        {/if}

        {#if weatherData}
            <WeatherCard data={weatherData} />
        {/if}
    </div>
</div>