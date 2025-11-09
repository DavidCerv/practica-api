// src/routes/+page.js (Modificado para incluir Pokémon)

// Reemplaza con tu clave de API
const API_KEY = "8b620a252272976a42746c3ac9afac42"; 

// Ciudad de respaldo si no hay ubicación guardada
const DEFAULT_CITY = 'Mexico City'; 

// Número total de Pokémon que usaremos para la aleatoriedad
// La PokéAPI tiene alrededor de 1300, pero usaremos un límite común.
const POKEMON_LIMIT = 1000; 

// Función principal de carga de datos para la página
export async function load({ fetch }) {
    
    // --- LÓGICA DEL CLIMA (sin cambios) ---
    let weatherUrl;

    if (typeof window !== 'undefined') {
        const userLat = localStorage.getItem('userLat');
        const userLon = localStorage.getItem('userLon');

        if (userLat && userLon) {
            weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLon}&units=metric&appid=${API_KEY}`;
        }
    }
    
    if (!weatherUrl) {
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${DEFAULT_CITY}&units=metric&appid=${API_KEY}`;
    }

    let weatherData = null;
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            weatherData = {
                city: data.name,
                temp: Math.round(data.main.temp),
                description: data.weather[0].description,
                icon: data.weather[0].icon
            };
        }
    } catch (error) {
        console.error("Error al cargar el clima:", error);
    }
    
    // --- LÓGICA DEL POKÉMON (NUEVO) ---
    let pokemonData = null;
    try {
        // 1. Generar un ID aleatorio (de 1 a POKEMON_LIMIT)
        const randomId = Math.floor(Math.random() * POKEMON_LIMIT) + 1;
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

        // 2. Llamar a la API del Pokémon aleatorio
        const response = await fetch(pokemonUrl);
        
        if (!response.ok) {
            throw new Error('No se pudo obtener el Pokémon.');
        }

        const data = await response.json();
        
        // 3. Formatear y retornar solo los datos necesarios
        pokemonData = {
            id: data.id,
            name: data.name.charAt(0).toUpperCase() + data.name.slice(1), // Capitalizar nombre
            image: data.sprites.front_default, // Imagen frontal por defecto
            type: data.types.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)).join(' / ') // Tipos
        };

    } catch (error) {
        console.error("Error al cargar el Pokémon:", error);
    }


    // --- RETORNO FINAL: COMBINAR AMBOS DATOS ---
    return {
        weatherData, // Datos de clima
        pokemonData  // Datos de Pokémon
    };
}