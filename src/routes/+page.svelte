<script>
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { states } from '../utils/server/state-data';
	import getGradient from '../utils/get-gradient-rule';

	function onClick(state) {
		goto(`/representatives/${state.id}`);
	}

	const seoDescription =
		'An easy way to find contact information, bill voting statistics, and general information about your representatives';
	const seoTitle = 'Who are my Representatives?';
	const seoKeywords = [
		'congress',
		'representatives',
		'government',
		'US',
		'politics',
		'senate',
		'house'
	].join(',');
	const seoUrl = 'https://whoaremyrepresentatives.us/';
	// TODO: add state-level seo image
	const seoImage = 'flag.png';
</script>

<svelte:head>
	<title>{seoTitle}</title>
	<meta name="description" content={seoDescription} />
	<meta name="keywords" content={seoKeywords} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={seoUrl} />
	<meta property="og:title" content={seoTitle} />
	<meta property="og:description" content={seoDescription} />
	{#if seoImage}
		<meta property="og:image" content={seoImage} />
	{/if}

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={seoUrl} />
	<meta property="twitter:title" content={seoTitle} />
	<meta property="twitter:description" content={seoDescription} />
	{#if seoImage}
		<meta property="twitter:image" content={seoImage} />
	{/if}
</svelte:head>

<div class="flex h-screen w-full flex-col items-center">
	<h1 class="text-grey-darkest mb-6 block w-full text-center text-5xl">
		Who are my representatives?
	</h1>
	<p class="mb-6 flex-auto text-left font-semibold">
		Get more info on the members of Congress that represent you.
	</p>
	<div class="my-2 mb-6 rounded-md bg-democrat p-4 text-center lg:px-4">
		<span class="flex-auto text-left font-semibold text-white"
			>Don't know your district? Check out our <a class="underline" href="district-map"
				>district map</a
			>!</span
		>
	</div>
	<h2 class="text-grey-darkest mb-0 block w-full text-center text-3xl">
		Select your state code from the grid below:
	</h2>
	<div class="grid grid-flow-row grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
		{#each states as state}
			<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
			<div
				data-automation={`state-${state.id}`}
				in:fade
				class="border-wrap h-32 w-32"
				style={`
      background: ${getGradient(state)}
    `}
			>
				<div
					tabindex="0"
					class={`state flex h-full w-full flex-row content-center justify-center bg-white p-5 ${state.numDem > state.numRep ? 'dem' : 'rep'}`}
					on:click={onClick(state)}
				>
					<a
						tabindex="-1"
						rel="prefetch"
						class="m-auto text-4xl hover:outline-none focus:outline-none"
						href="/representatives/{state.id.toLowerCase()}">{state.id.toUpperCase()}</a
					>
					<div class="num-dem text-2xl text-democrat">{state.numDem}</div>
					<div class="num-rep text-2xl text-republican">{state.numRep}</div>
					<div class="num-lib text-2xl text-libertarian">{state.numLib}</div>
					<div class="num-ind text-2xl text-independent">{state.numInd}</div>
				</div>
			</div>
		{/each}
	</div>

	<div class="border my-2 mb-6 rounded-md border-democrat bg-white p-4 text-center lg:px-4">
		<h2 class="text-grey-darkest mb-0 block w-full text-center text-3xl">Code</h2>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<div
				class="border my-2 mb-6 rounded-md border-democrat bg-republican p-4 text-center lg:px-4"
			>
				<span class="flex-auto text-left font-semibold text-white">Republican</span>
			</div>
			<div class="border my-2 mb-6 rounded-md border-democrat bg-democrat p-4 text-center lg:px-4">
				<span class="flex-auto text-left font-semibold text-white">Democrat</span>
			</div>
			<div
				class="border my-2 mb-6 rounded-md border-democrat bg-libertarian p-4 text-center lg:px-4"
			>
				<span class="flex-auto text-left font-semibold text-white">Libertarian</span>
			</div>
			<div
				class="border my-2 mb-6 rounded-md border-democrat bg-independent p-4 text-center lg:px-4"
			>
				<span class="flex-auto text-left font-semibold text-white">Independent</span>
			</div>
		</div>
	</div>
</div>

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
		color: #b22234;
		border-color: #b22234;
	}

	.dem {
		color: #3c3b6e;
		border-color: #3c3b6e;
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
