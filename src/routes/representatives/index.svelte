<script>
    import {states} from './state/[state].json.js';
    let state = 'ca';
</script>

<style>
.grid {
  display: grid;
  grid-template-columns: auto auto auto auto;
  padding: 10px;
}

.state {
    border: 1px solid black;
    border-radius: 3px;
    
    display: flex;
    flex-direction: column;
    place-items: center;
    margin: 20px;
    padding: 20px;
    font-size: 2rem;
}

</style>

<div class="container">
    <h1>Select Your state</h1>
    <div class="grid">
	{#each states as state}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<div class='state'>
            <a rel='prefetch' href='representatives/{state}'>{state.toUpperCase()}</a>
        </div>
	{/each}
    </div>    
</div>

