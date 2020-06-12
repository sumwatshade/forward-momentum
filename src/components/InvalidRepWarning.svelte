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

<div in:fade data-automation="invalid-rep-warning" class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
  <p>You requested district <span class="font-bold">{district}</span>, which could not be found. Search for your representative below..</p>
  <a href='district-map'>... or click here to go back to the map</a>
</div>