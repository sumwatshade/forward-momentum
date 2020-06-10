<script>
    import { fade } from 'svelte/transition';
    import { goto } from '@sapper/app';
    import { states } from './representatives/state/[state].json';

    function getRatio(state) {
      return parseInt((100.0 * state.numRep) / (state.numRep + state.numDem), 10);
    }

    function onClick(state) {
      return async function click() {
        await goto(`representatives/${state.id}`);
      };
    }
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
  position: relative;
  z-index: 9;
  border: 1px solid black;
  border-radius: 3px;
    
  min-width: 60px;
	min-height: 60px;
  max-width: 100px;
	max-height: 100px;


  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
  padding: 20px;
  font-size: 2rem;

  background: #ffffff;
  opacity: 1;
  transition: opacity 0.3s ease;

  cursor: pointer;
}

.state:hover {
  opacity: 0.5;
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
  z-index: 8;
  justify-content: center;
  align-items: center;
  padding: 3px;
  margin: 20px;
}

.num-rep {
  position: absolute;
  align-self: flex-end;
  bottom: 3px;
  right: 6px;
  font-size: 0.7em;
}

.num-dem {
  position: absolute;
  top: 3px;
  left: 6px;
  font-size: 0.7em;
}

</style>

<div class="container">
	<h1>Who are my representatives?</h1>
	<p>Get more info on the members of Congress that represent you.</p>
	<p>Don't know your district? Check out our <a href="district-map">district map</a>!</p>
    <h2>Select your state code from the grid below:</h2>
    <div class="grid">
	{#each states as state}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<div data-automation={`state-${state.id}`} in:fade class={'border-wrap'} style={`
      background: linear-gradient(315deg,rgba(178,34,52,1) 0%, rgba(178,34,52,1) ${getRatio(state) - 1}%, rgba(60,59,110,1) ${getRatio(state) + 1}%,  rgba(60,59,110,1) 100%)
    `}>
      <div class={`state ${state.numDem > state.numRep ? 'dem' : 'rep'}`} on:click={onClick(state)}>
          <a rel='prefetch' href='representatives/{state.id}'>{state.id.toUpperCase()}</a>
          <div class="num-dem dem">{state.numDem}</div>
          <div class="num-rep rep">{state.numRep}</div>
      </div>
    </div>
	{/each}
    </div>    
</div>

