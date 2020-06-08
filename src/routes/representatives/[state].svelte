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
  export let reps;
  import representative from "../../components/Representative.svelte";
</script>

<style>

</style>

<svelte:head>
  <title>California</title>
</svelte:head>

<ul>
  {#each reps as rep}
    <!-- we're using the non-standard `rel=prefetch` attribute to
            tell Sapper to load the data for the page as soon as
            the user hovers over the link or taps it, instead of
            waiting for the 'click' event -->
    <representative {rep} />
  {/each}
</ul>
