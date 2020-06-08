<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`representatives/${params.state}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { reps: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import Representative from "../../components/Representative.svelte";
  import Modal from "../../components/Modal.svelte";
  export let reps;

  const senate = [];
  const house = reps.filter(rep => {
    if(rep.term.type === 'sen') {
      senate.push(rep);
      return false;
    }

    return true;
  })
  
</script>

<style>
.grid {
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 10px;
}

</style>

<svelte:head>
  <title>California</title>
</svelte:head>

<Modal>
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

  <h1>House of representatives ({house.length})</h1>
  <div class="grid">
    {#each house as rep}
      <!-- we're using the non-standard `rel=prefetch` attribute to
              tell Sapper to load the data for the page as soon as
              the user hovers over the link or taps it, instead of
              waiting for the 'click' event -->
      <Representative {rep} />
    {/each}
  </div>
</Modal>
