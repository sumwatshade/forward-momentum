<script>
  import {onMount} from 'svelte';
  import SocialMedia from './SocialMedia.svelte';
  export let data;

  const { social, term } = data;
  const title = term.type === 'sen' ? 'Senator' : 'Representative';
  const districtInfo = term.type === 'sen' ? '' : `, District ${term.district}`;
</script>

<style>
  h2 {
		font-size: 2rem;
	}
</style>

<h2>{data.name.official_full}</h2>
<h3>{term.party} {title}{districtInfo}</h3>
<SocialMedia media={social} />