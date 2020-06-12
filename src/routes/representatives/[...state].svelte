<script context="module">
  export async function preload({ params }) {
    const [state] = params.state;
    const res = await this.fetch(`representatives/state/${state}.json`);
    const data = await res.json();
  
    if (res.status === 200) {
      return {
        reps: data,
        state: state.toUpperCase(),
      };
    }

    this.error(res.status, data.message);
    return null;
  }
</script>

<script>
  import { onMount } from 'svelte';
  import Modal from '../../components/Modal.svelte';
  import Representative from '../../components/Representative.svelte';
  import InvalidRepWarning from '../../components/InvalidRepWarning.svelte';
  import { codeToStateMap } from '../../utils/state-map';

  export let reps;
  export let state;
  let district;
  
  let warning = false;
  const houseRefs = {};
  const senate = [];
  const house = reps.filter((rep) => {
    if (rep.term.type === 'sen') {
      senate.push(rep);
      return false;
    }

    return true;
  }).sort((a, b) => a.term.district - b.term.district);
  
  const houseToken = house.length > 1 ? `${house.length} House Representatives` : 'One House Representative';

  onMount(() => {
    const params = window.location.search.substring(1).split('&');

    params.some((param) => {
      const pair = param.split('=');
      if (decodeURIComponent(pair[0]) === 'rep_id') {
        district = decodeURIComponent(pair[1]);
        return true;
      }
      return false;
    });

    if (district && houseRefs[district]) {
      houseRefs[district].showPopup();
    } else if (district) {
      warning = true;
    }
  });

  const seoDescription = `A listing of members of congress from ${state}`;
  const seoTitle = codeToStateMap[state];
  const seoKeywords = [
    'state',
    'congress',
    'representatives',
    'government',
    'US',
    state,
    codeToStateMap[state],
  ].join(',');
  const seoUrl = `https://whoaremyrepresentatives.us/representatives/${state}`;
  // TODO: add state-level seo image
  const seoImage = null;
</script>

<style>
.grid {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}

</style>

<svelte:head>
  <title>{seoTitle}</title>
  <meta name="description" content={seoDescription} />
  <meta name="keywords" content={seoKeywords}/>

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content={seoUrl}>
  <meta property="og:title" content={seoTitle}>
  <meta property="og:description" content={seoDescription}>
  {#if seoImage}
  <meta property="og:image" content="{seoImage}">
  {/if}

  <!-- Twitter -->
  <meta property="twitter:card" content="summary">
  <meta property="twitter:url" content={seoUrl}>
  <meta property="twitter:title" content={seoTitle}>
  <meta property="twitter:description" content={seoDescription}>
  {#if seoImage}
  <meta property="twitter:image" content="{seoImage}">
  {/if}
</svelte:head>

<Modal>
  {#if warning}
    <InvalidRepWarning {district} />
  {/if}

  <h1>{codeToStateMap[state]}</h1>
  {#if senate.length}
    <h2>US Senators</h2>
    <div class="grid">
      {#each senate as rep}
        <!-- we're using the non-standard `rel=prefetch` attribute to
                tell Sapper to load the data for the page as soon as
                the user hovers over the link or taps it, instead of
                waiting for the 'click' event -->
        <Representative {rep} {state} />
      {/each}
    </div>
  {/if}

  {#if house.length}
    <h2>{houseToken}</h2>
    <div class="grid">
      {#each house as rep}
        <!-- we're using the non-standard `rel=prefetch` attribute to
                tell Sapper to load the data for the page as soon as
                the user hovers over the link or taps it, instead of
                waiting for the 'click' event -->
        <Representative {rep} {state} bind:this={houseRefs[rep.term.district]}/>
      {/each}
    </div>
  {/if}
</Modal>
