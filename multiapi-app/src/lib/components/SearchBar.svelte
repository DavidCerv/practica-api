<script>
    // Usamos el modificador `export let` para que el padre pueda enlazar (bind) esta prop.
    export let searchTerm = '';
</script>

<div class="search-container">
    <input
        type="text"
        placeholder="Buscar personajes o episodios por nombre..."
        bind:value={searchTerm}
    />
</div>

<style>
    .search-container {
        margin: 20px auto;
        max-width: 600px;
    }
    input {
        width: 100%;
        padding: 12px 15px;
        font-size: 1.1em;
        /* Estilo temático viscoso */
        background: rgba(40, 200, 40, 0.2); 
        border: 2px solid #33ff33;
        border-radius: 8px;
        color: #000000;
        box-shadow: 0 0 15px #33ff33;
        transition: box-shadow 0.3s;
    }
    input::placeholder {
        color: rgba(0, 0, 0, 0.7);
    }
    input:focus {
        outline: none;
        box-shadow: 0 0 25px #33ff33, 0 0 5px #e5ff00;
    }
</style>