<script>
    import { fade } from 'svelte/transition';

    export let district;
</script>

<div in:fade data-automation="invalid-rep-warning" class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
  <p>You requested district <span class="font-bold">{district}</span>, which could not be found. Search for your representative below..</p>
  <a href='district-map'>... or click here to go back to the map</a>
</div>