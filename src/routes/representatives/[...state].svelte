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
  import InvalidRepWarning from '../../components/InvalidRepWarning.svelte';
  import { codeToStateMap } from '../../utils/state-map';

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
  
  const houseToken = house.length > 1 ? `${house.length} House Representatives` : 'One House Representative';

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

</style>

<svelte:head>
  <title>{state}</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
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
        <Representative {rep} />
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
        <Representative {rep} bind:this={houseRefs[rep.term.district]}/>
      {/each}
    </div>
  {/if}
</Modal>
