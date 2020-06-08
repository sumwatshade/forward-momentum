<script>
  import {onMount} from 'svelte';
  export let data;

  const { social } = data;
</script>

<style>
  h2 {
		font-size: 2rem;
	}
</style>

<h2>{data.name.official_full}</h2>
<ul>
    {#each Object.keys(social).filter(t => t.indexOf('_id') === -1) as mediaType}
      <li><strong>{mediaType}:</strong> {social[mediaType]}</li>
    {/each}
</ul>