<script lang="ts">
    // Definición de los datos que debe recibir el componente
    export let data: {
        city: string;
        temp: number;
        description: string;
        icon: string;
        lat: number;
        lon: number;
        humidity: number;
        windSpeed: number;
        pressure: number;
    };

    // Devuelve SVGs más llamativos según el código de OpenWeather
    function getWeatherSVG(code: string) {
        const c = code.slice(0, 2);
        switch (c) {
            case '01': // clear
                return `
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="64" height="64" role="img" aria-hidden="true">
  <g fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="32" cy="32" r="10" />
    <g stroke-width="2" fill="none">
      <line x1="32" y1="2" x2="32" y2="12"/>
      <line x1="32" y1="52" x2="32" y2="62"/>
      <line x1="2" y1="32" x2="12" y2="32"/>
      <line x1="52" y1="32" x2="62" y2="32"/>
      <line x1="10" y1="10" x2="18" y2="18"/>
      <line x1="46" y1="46" x2="54" y2="54"/>
      <line x1="46" y1="18" x2="54" y2="10"/>
      <line x1="10" y1="54" x2="18" y2="46"/>
    </g>
  </g>
</svg>`;
            case '02': // few clouds
            case '03': // scattered
            case '04': // broken
                return `
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="64" height="64" role="img" aria-hidden="true">
  <g fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20 44h28a10 10 0 0 0 0-20 14 14 0 0 0-27-2A9 9 0 0 0 20 44z"/>
  </g>
</svg>`;
            case '09': // shower rain
            case '10': // rain
                return `
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="64" height="64" role="img" aria-hidden="true">
  <g fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 36h30a9 9 0 0 0 0-18 13 13 0 0 0-25-2A8 8 0 0 0 18 36z"/>
    <g fill="currentColor" stroke="none">
      <path d="M22 44c0 2-2 5-2 5s-2-3-2-5 2-3 2-3 2 1 2 3z"/>
      <path d="M32 44c0 2-2 5-2 5s-2-3-2-5 2-3 2-3 2 1 2 3z"/>
      <path d="M44 44c0 2-2 5-2 5s-2-3-2-5 2-3 2-3 2 1 2 3z"/>
    </g>
  </g>
</svg>`;
            case '11': // thunderstorm
                return `
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="64" height="64" role="img" aria-hidden="true">
  <g fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 30h30a9 9 0 0 0 0-18 13 13 0 0 0-25-2A8 8 0 0 0 18 30z"/>
    <polygon points="30 36 24 48 34 48 28 60 40 44 30 44" />
  </g>
</svg>`;
            case '13': // snow
                return `
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="64" height="64" role="img" aria-hidden="true">
  <g fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 30h30a9 9 0 0 0 0-18 13 13 0 0 0-25-2A8 8 0 0 0 18 30z"/>
    <g stroke-width="2" fill="none">
      <circle cx="22" cy="46" r="2"/>
      <circle cx="32" cy="50" r="2"/>
      <circle cx="42" cy="46" r="2"/>
    </g>
  </g>
</svg>`;
            case '50': // mist
                return `
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="64" height="64" role="img" aria-hidden="true">
  <g fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 28h28a8 8 0 0 0 0-16 12 12 0 0 0-24-1A7 7 0 0 0 18 28z"/>
    <g stroke-width="2" fill="none">
      <line x1="10" y1="44" x2="54" y2="44"/>
      <line x1="14" y1="50" x2="50" y2="50"/>
      <line x1="18" y1="56" x2="46" y2="56"/>
    </g>
  </g>
</svg>`;
            default:
                return `
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="64" height="64" role="img" aria-hidden="true">
  <g fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="32" cy="32" r="10"/>
  </g>
</svg>`;
        }
    }

    function getIconClass(code: string) {
        const c = code.slice(0, 2);
        if (c === '01') return 'text-yellow-400';      // sun
        if (c === '02' || c === '03' || c === '04') return 'text-gray-200'; // clouds
        if (c === '09' || c === '10') return 'text-blue-400'; // rain
        if (c === '11') return 'text-indigo-400';     // thunder
        if (c === '13') return 'text-sky-200';        // snow
        if (c === '50') return 'text-gray-400';       // mist
        return 'text-white';
    }

    function getIconAnim(code: string) {
        const c = code.slice(0, 2);
        if (c === '01') return 'animate-spin-slow'; // subtle spin (define in Tailwind if needed) 
        if (c === '10' || c === '09') return 'animate-bounce';
        if (c === '11') return 'animate-pulse';
        return '';
    }
</script>

<div class="bg-gray-800 text-white rounded-xl shadow-2xl p-6 md:p-10 w-full">
    
    <h2 class="text-3xl font-bold mb-1 text-center">{data.city}</h2>
    <p class="text-md text-gray-400 mb-6 text-center">Clima Actual</p>

    <div class="flex flex-col md:flex-row items-center justify-center mb-8">
        <div
            class={`w-32 h-32 flex-shrink-0 flex items-center justify-center ${getIconClass(data.icon)} ${getIconAnim(data.icon)}`}
            aria-label={data.description}
            title={data.description}
        >
            {@html getWeatherSVG(data.icon)}
        </div>

        <div class="md:ml-6 text-center md:text-left">
            <h3 class="text-7xl font-extrabold">{data.temp}°C</h3>
            <p class="text-2xl capitalize text-yellow-400">{data.description}</p>
        </div>
    </div>

    <div class="grid grid-cols-2 gap-4 border-t border-gray-700 pt-6">
        
        <div class="flex flex-col items-center">
            <span class="text-xl font-semibold">Humedad</span>
            <span class="text-2xl font-light text-blue-400">{data.humidity}%</span>
        </div>
        
        <div class="flex flex-col items-center">
            <span class="text-xl font-semibold">Viento</span>
            <span class="text-2xl font-light text-blue-400">{data.windSpeed} m/s</span>
        </div>
        
        <div class="flex flex-col items-center mt-4 col-span-2 md:col-span-1">
            <span class="text-xl font-semibold">Presión</span>
            <span class="text-2xl font-light text-blue-400">{data.pressure} hPa</span>
        </div>

        <div class="flex flex-col items-center mt-4 col-span-2 md:col-span-1">
            <span class="text-xl font-semibold">Ubicación</span>
            <span class="text-sm font-light text-gray-400">Lat: {data.lat.toFixed(4)}, Lon: {data.lon.toFixed(4)}</span>
        </div>
    </div>

    <p class="mt-8 text-sm text-gray-500 text-center">Datos proporcionados por OpenWeatherMap.</p>
</div>