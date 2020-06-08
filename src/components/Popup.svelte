<script>
  import {onMount} from 'svelte';
  export let data;

  let contactData = {};

  onMount(async () => {
		const res = await fetch(`representatives/${data.id.bioguide}.media`);
		contactData = await res.json();
	});

</script>

<style>
  h2 {
		font-size: 2rem;
	}
</style>

<h2>{data.name.official_full}</h2>
<ul>
    {#each Object.keys(contactData).filter(t => t.indexOf('_id') === -1) as mediaType}
      <li><strong>{mediaType}:</strong> {contactData[mediaType]}</li>
    {/each}
</ul>