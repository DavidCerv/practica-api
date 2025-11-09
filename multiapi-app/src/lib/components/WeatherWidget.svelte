<script lang="ts">
    import { fly, scale } from 'svelte/transition';
    export let city: string;
    export let temp: number;
    export let description: string;
    export let icon: string;

    function getWeatherIconUrl(iconCode: string) {
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    }
</script>

<a href="/apiClima"
     class="group block bg-black rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform"
     in:fly={{ y: 10, duration: 300 }}>
    <div class="p-6 flex flex-col items-center widget" in:scale={{ duration: 300 }}>
        <img
            src={getWeatherIconUrl(icon)}
            alt={description}
            class="weather-icon w-48 h-48 mx-auto mb-2 object-contain"
            loading="lazy"
        />

        <h2 class="text-4xl font-bold mb-1 neon">{temp}°C</h2>
        <p class="text-center text-lg mb-4 capitalize neon-dim">{description}</p>
        <p class="text-sm font-semibold neon">{city}</p>
    </div>
</a>

<style>
    .widget {
        width: 100%;
        max-width: 320px;
        margin: 0 auto;
        border-radius: 0.75rem;
        box-sizing: border-box;
    }

    /* Icon: base size doubled (≈200%) y animación */
    .weather-icon {
        transform-origin: center;
        transition: transform 220ms cubic-bezier(.2,.9,.3,1), filter 220ms;
        animation: icon-breathe 3s ease-in-out infinite;
        filter: drop-shadow(0 8px 18px rgba(0,255,150,0.25));
    }
    .group:hover .weather-icon {
        transform: scale(2.05);
        filter: drop-shadow(0 18px 36px rgba(0,255,150,0.35));
    }
    @keyframes icon-breathe {
        0% { transform: scale(1); }
        50% { transform: scale(1.06); }
        100% { transform: scale(1); }
    }

    /* Efecto neón y pulso en texto */
    .neon {
        color: #fff;
        text-shadow:
            0 0 6px rgba(255,255,255,0.9),
            0 0 16px rgba(0,255,150,0.85),
            0 0 28px rgba(0,255,150,0.6);
        animation: neon-pulse 2.6s ease-in-out infinite;
    }
    .neon-dim {
        color: #fff;
        text-shadow:
            0 0 4px rgba(255,255,255,0.85),
            0 0 10px rgba(0,255,150,0.5);
        animation: neon-dim-pulse 2.6s ease-in-out infinite;
    }

    @keyframes neon-pulse {
        0% { text-shadow: 0 0 6px rgba(255,255,255,0.9), 0 0 16px rgba(0,255,150,0.6), 0 0 28px rgba(0,255,150,0.35); opacity: 1; }
        50% { text-shadow: 0 0 8px rgba(255,255,255,0.95), 0 0 22px rgba(0,255,150,0.9), 0 0 40px rgba(0,255,150,0.6); opacity: 0.95; }
        100% { text-shadow: 0 0 6px rgba(255,255,255,0.9), 0 0 16px rgba(0,255,150,0.6), 0 0 28px rgba(0,255,150,0.35); opacity: 1; }
    }
    @keyframes neon-dim-pulse {
        0% { opacity: 1; } 50% { opacity: 0.9; } 100% { opacity: 1; }
    }

    /* Lift al hacer hover en la tarjeta */
    .group {
        will-change: transform;
    }
    .group:hover {
        transform: translateY(-6px);
    }

    /* Responsive: evita overflow en pantallas pequeñas */
    @media (max-width: 420px) {
        .weather-icon { width: 128px; height: 128px; }
        .widget { max-width: 260px; padding: 1rem; }
    }
</style>