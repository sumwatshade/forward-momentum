<script context="module">
  export async function preload({ params }) {
    const [state, district] = params.state;
    const res = await this.fetch(`representatives/state/${state}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return {
        reps: data,
        state: state.toUpperCase(),
        district,
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


  export let reps;
  export let state;
  export let district;

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
  
  onMount(() => {
    if (district && houseRefs[district]) {
      houseRefs[district].showPopup();
    } else if (district) {
      warning = true;
    }
  });
</script>

<style>
.grid {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}

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

<svelte:head>
  <title>{state}</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</svelte:head>

<Modal>
  {#if warning}
  <div data-automation="invalid-rep-warning" class="warning">
    <p>You requested district <strong>{district}</strong>, which could not be found. Search for your representative below</p>
    <a href='district-map'>Click here to go back to the map</a>
  </div>
  {/if}

  {#if senate.length}
    <h1>US Senate ({senate.length})</h1>
    <div class="grid">
      {#each senate as rep}
        <!-- we're using the non-standard `rel=prefetch` attribute to
                tell Sapper to load the data for the page as soon as
                the user hovers over the link or taps it, instead of
                waiting for the 'click' event -->
        <Representative {rep} />
      {/each}
    </div>
  {/if}

  {#if house.length}
    <h1>House of representatives ({house.length})</h1>
    <div class="grid">
      {#each house as rep}
        <!-- we're using the non-standard `rel=prefetch` attribute to
                tell Sapper to load the data for the page as soon as
                the user hovers over the link or taps it, instead of
                waiting for the 'click' event -->
        <Representative {rep} bind:this={houseRefs[rep.term.district]}/>
      {/each}
    </div>
  {/if}
</Modal>
