<script>
    import { fade } from 'svelte/transition';

    export let district;
</script>

<style>
    .warning {
        border-radius: 3px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        place-items: center;
        border: 1px solid 	#dab600;
        background-color: 	#f8ed62;
        color: #947700;
        margin-bottom: 20px;
    }
</style>

<div in:fade data-automation="invalid-rep-warning" class="warning">
    <p>You requested district <strong>{district}</strong>, which could not be found. Search for your representative below...</p>
    <a href='district-map'>... or click here to go back to the map</a>
</div>