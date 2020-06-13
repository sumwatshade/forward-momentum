<script>
    import { fade } from 'svelte/transition';
    import { goto } from '@sapper/app';
    import { states } from './representatives/state/[state].json';
    import getGradient from '../utils/get-gradient-rule';

    function onClick(state) {
      return async function click() {
        await goto(`representatives/${state.id}`);
      };
    }

    const seoDescription = 'An easy way to find contact information, bill voting statistics, and general information about your representatives';
    const seoTitle = 'Who are my Representatives?';
    const seoKeywords = [
      'congress',
      'representatives',
      'government',
      'US',
      'politics',
      'senate',
      'house',
    ].join(',');
    const seoUrl = 'https://whoaremyrepresentatives.us/';
    // TODO: add state-level seo image
    const seoImage = 'flag.png';
</script>

<style>
.state {
  position: relative;
  z-index: 9;
  border: 1px solid black;
  border-radius: 3px;
  font-size: 2rem;
  opacity: 1;
  transition: opacity 0.3s ease;

  cursor: pointer;
}

.state:hover,
.state:focus {
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
}

.num-dem {
  position: absolute;
  top: 3px;
  left: 6px;
}
.num-lib {
  position: absolute;
  align-self: flex-end;
  top: 3px;
  right: 6px;
}

.num-ind {
  position: absolute;
  bottom: 3px;
  left: 6px;
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
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content={seoUrl}>
  <meta property="twitter:title" content={seoTitle}>
  <meta property="twitter:description" content={seoDescription}>
  {#if seoImage}
  <meta property="twitter:image" content="{seoImage}">
  {/if}
</svelte:head>

<div class="flex flex-col items-center h-screen w-full">
	<h1 class="block w-full text-center text-grey-darkest mb-6 text-5xl">Who are my representatives?</h1>
	<p class="font-semibold mb-6 text-left flex-auto">Get more info on the members of Congress that represent you.</p>
  <div class="my-2 rounded-md mb-6 bg-democrat text-center p-4 lg:px-4">
      <span class="font-semibold text-left text-white flex-auto">Don't know your district? Check out our <a class="underline" href="district-map">district map</a>!</span>
  </div>
  <h2 class="block w-full text-center text-grey-darkest mb-0 text-3xl">Select your state code from the grid below:</h2>
  <div class="grid grid-flow-row gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
	{#each states as state}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<div data-automation={`state-${state.id}`} in:fade class="w-32 h-32 border-wrap" style={`
      background: ${getGradient(state)}
    `}>
      <div tabindex="0" class={`p-5 w-full h-full flex flex-row content-center justify-center bg-white state ${state.numDem > state.numRep ? 'dem' : 'rep'}`} on:click={onClick(state)}>
          <a tabindex="-1" rel='prefetch' class="m-auto text-4xl hover:outline-none focus:outline-none" href='representatives/{state.id.toLowerCase()}'>{state.id.toUpperCase()}</a>
          <div class="text-2xl num-dem text-democrat">{state.numDem}</div>
          <div class="text-2xl num-rep text-republican">{state.numRep}</div>
          <div class="text-2xl num-lib text-libertarian">{state.numLib}</div>
          <div class="text-2xl num-ind text-independent">{state.numInd}</div>
      </div>
    </div>
	{/each}
    </div>

  <div class="my-2 rounded-md mb-6 bg-white border border-democrat text-center p-4 lg:px-4">
  <h2 class="block w-full text-center text-grey-darkest mb-0 text-3xl">Code</h2>
    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <div class="my-2 rounded-md mb-6 bg-republican border border-democrat text-center p-4 lg:px-4">
            <span class="font-semibold text-left text-white flex-auto">Republican</span>
        </div>   
        <div class="my-2 rounded-md mb-6 bg-democrat border border-democrat text-center p-4 lg:px-4">
            <span class="font-semibold text-left text-white flex-auto">Democrat</span>
        </div>   
        <div class="my-2 rounded-md mb-6 bg-libertarian border border-democrat text-center p-4 lg:px-4">
            <span class="font-semibold text-left text-white flex-auto">Libertarian</span>
        </div>   
        <div class="my-2 rounded-md mb-6 bg-independent border border-democrat text-center p-4 lg:px-4">
            <span class="font-semibold text-left text-white flex-auto">Independent</span>
        </div>   
    </div>
  </div>    
</div>

