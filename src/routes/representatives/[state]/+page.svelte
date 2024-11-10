<script>
	import { onMount } from 'svelte';
	import Modal from '../../../components/Modal.svelte';
	import Representative from '../../../components/Representative.svelte';
	import InvalidRepWarning from '../../../components/InvalidRepWarning.svelte';
	import { codeToStateMap } from '../../../utils/state-map';

	let { data } = $props();

	let district;

	let warning = false;
	const houseRefs = {};
	const senate = [];

	const house = data.reps
		.filter((rep) => {
			if (rep.term.type === 'sen') {
				senate.push(rep);
				return false;
			}

			return true;
		})
		.sort((a, b) => a.term.district - b.term.district);

	const stateCode = codeToStateMap[data.state];

	const houseToken =
		house.length > 1 ? `${house.length} House Representatives` : 'One House Representative';

	onMount(() => {
		const params = window.location.search.substring(1).split('&');

		params.some((param) => {
			const pair = param.split('=');
			if (decodeURIComponent(pair[0]) === 'rep_id') {
				district = decodeURIComponent(pair[1]);
				return true;
			}
			return false;
		});

		if (district && houseRefs[district]) {
			houseRefs[district].showPopup();
		} else if (district) {
			warning = true;
		}
	});

	const seoDescription = `A listing of members of congress from ${data.state}`;
	const seoTitle = stateCode;
	const seoKeywords = [
		'state',
		'congress',
		'representatives',
		'government',
		'US',
		data.state,
		stateCode
	].join(',');
	const seoUrl = `https://whoaremyrepresentatives.us/representatives/${data.state}`;
	// TODO: add state-level seo image
	const seoImage = null;
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
	<meta property="twitter:card" content="summary" />
	<meta property="twitter:url" content={seoUrl} />
	<meta property="twitter:title" content={seoTitle} />
	<meta property="twitter:description" content={seoDescription} />
	{#if seoImage}
		<meta property="twitter:image" content={seoImage} />
	{/if}
</svelte:head>

<Modal>
	{#if warning}
		<InvalidRepWarning {district} />
	{/if}

	<h1 class="text-grey-darkest mb-6 block w-full text-center text-5xl">{stateCode}</h1>
	{#if senate.length}
		<h2 class="text-grey-darkest mb-6 block w-full text-center text-3xl">US Senators</h2>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			{#each senate as rep}
				<!-- we're using the non-standard `rel=prefetch` attribute to
                tell Sapper to load the data for the page as soon as
                the user hovers over the link or taps it, instead of
                waiting for the 'click' event -->
				<Representative {rep} state={data.state} />
			{/each}
		</div>
	{/if}

	{#if house.length}
		<h2 class="text-grey-darkest my-6 block w-full text-center text-3xl">{houseToken}</h2>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
			{#each house as rep}
				<!-- we're using the non-standard `rel=prefetch` attribute to
                tell Sapper to load the data for the page as soon as
                the user hovers over the link or taps it, instead of
                waiting for the 'click' event -->
				<Representative {rep} state={data.state} bind:this={houseRefs[rep.term.district]} />
			{/each}
		</div>
	{/if}
</Modal>
