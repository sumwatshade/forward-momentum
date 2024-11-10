<script>
	import { fade } from 'svelte/transition';

	export let district;
</script>

<div
	in:fade
	data-automation="invalid-rep-warning"
	class="border-l-4 border-orange-500 bg-orange-100 p-4 text-orange-700"
	role="alert"
>
	<p>
		You requested district <span class="font-bold">{district}</span>, which could not be found.
		Search for your representative below..
	</p>
	<a href="district-map">... or click here to go back to the map</a>
</div>
