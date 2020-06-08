<script>
    import { fade } from 'svelte/transition';

    import {states} from './representatives/state/[state].json.js';
	let state = 'ca';
</script>

<style>
.grid {
  display: inline-flex;
  flex-wrap: wrap;
  padding: 10px;

  justify-content: center;
  align-items: center;
}

.state {
    border: 1px solid black;
    border-radius: 3px;
    
	width: 50px;
	height: 50px;

    display: flex;
    flex-direction: column;
    place-items: center;
    margin: 20px;
    padding: 20px;
    font-size: 2rem;
}

.rep {
  color: #B22234;
  border-color: #B22234;
}

.dem {
  color: #3C3B6E;
  border-color: #3C3B6E;
}

@media (max-width: 620px) {
	.state {
		width: 100%;
	}
}

</style>

<div class="container">
	<h1>Represent US</h1>
	<p>Get more info on the members of Congress that represent you.</p>
    <h2>Select your state</h2>
    <div class="grid">
	{#each states as state}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<div in:fade class={`state ${state.numDem > state.numRep ? 'dem' : 'rep'}`}>
            <a rel='prefetch' href='representatives/{state.id}'>{state.id.toUpperCase()}</a>
        </div>
	{/each}
    </div>    
</div>

