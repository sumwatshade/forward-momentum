<script>
    import { fade } from 'svelte/transition';
    import { states } from './representatives/state/[state].json';
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
  padding: 20px;
  font-size: 2rem;

  background: #ffffff;
}

.rep {
  color: #B22234;
  border-color: #B22234;
}

.dem {
  color: #3C3B6E;
  border-color: #3C3B6E;
}

.border-wrap {
  display: flex;
  padding: 3px;
  margin: 20px;
}

@media (max-width: 620px) {
	.border-wrap {
		width: 30%;
  }
  
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
		<div in:fade class={'border-wrap'} style={`
      background: linear-gradient(315deg,rgba(178,34,52,1) 0%, rgba(178,34,52,1) ${parseInt((100.0 * state.numRep) / (state.numRep + state.numDem), 10)}%,  rgba(60,59,110,1) 100%)
    `}>
      <div class={`state ${state.numDem > state.numRep ? 'dem' : 'rep'}`}>
          <a rel='prefetch' href='representatives/{state.id}'>{state.id.toUpperCase()}</a>
      </div>
    </div>
	{/each}
    </div>    
</div>

