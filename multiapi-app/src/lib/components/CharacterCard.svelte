<script>
    // La 'prop' que recibirá los datos de un personaje
    export let character;

    // Función para determinar la clase de estilo basada en el estado
    function getStatusClass(status) {
        if (status === 'Alive') return 'status-alive';
        if (status === 'Dead') return 'status-dead';
        return 'status-unknown';
    }
</script>

<div class="card">
    <img src={character.image} alt={character.name} class="character-image" />
    
    <div class="info">
        <h3 class="name">{character.name}</h3>
        
        <p class="status">
            <span class="status-indicator {getStatusClass(character.status)}"></span>
            {character.status} - {character.species}
        </p>

        <p class="location-text">Última ubicación:</p>
        <p class="location-name">{character.location.name}</p>
    </div>
</div>

<style>
    .card {
        background: rgba(0, 0, 0, 0.8); /* Fondo oscuro viscoso */
        border: 2px solid #33ff33; /* Borde verde neón */
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 0 10px rgba(51, 255, 51, 0.5);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        margin: 10px;
        cursor: pointer;
    }

    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 20px rgba(51, 255, 51, 0.8), 0 0 30px #e5ff00;
    }

    .character-image {
        width: 100%;
        height: auto;
        display: block;
        object-fit: cover;
    }

    .info {
        padding: 15px;
        color: #e5ff00;
    }

    .name {
        font-size: 1.3em;
        margin-top: 0;
        margin-bottom: 8px;
        text-shadow: 0 0 5px #e5ff00;
    }

    .status {
        display: flex;
        align-items: center;
        font-size: 0.9em;
        margin-bottom: 10px;
    }

    .status-indicator {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 8px;
    }

    /* Estilos basados en el estado */
    .status-alive { background-color: #33ff33; box-shadow: 0 0 5px #33ff33; }
    .status-dead { background-color: #d90000; box-shadow: 0 0 5px #d90000; }
    .status-unknown { background-color: #999999; box-shadow: 0 0 5px #999999; }

    .location-text {
        font-size: 0.8em;
        color: #99ff99;
        margin-bottom: 2px;
    }
    .location-name {
        font-size: 0.9em;
        font-weight: bold;
    }
</style>