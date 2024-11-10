<script>
	import SocialMedia from './SocialMedia.svelte';
	import GovInfo from './GovInfo.svelte';
	import RepImage from './RepImage.svelte';
	import { codeToStateMap } from '../utils/state-map';

	export let data;
	export let state;

	const { id, social, term, name } = data;

	const title = term.type === 'sen' ? 'Senator' : 'House Representative';
	const districtInfo =
		term.type === 'sen' || term.district === 0 ? '' : `, District ${term.district}`;

	const { phone, office } = term;

	const fullName = name.official_full || `${name.first} ${name.last}`;

	const seoDescription = `Detailed government and contact information about ${fullName}`;
	const seoTitle = fullName;
	const seoKeywords = [
		'state',
		'congress',
		'representatives',
		title,
		districtInfo.substring(districtInfo.indexOf('District')),
		'government',
		'US',
		fullName,
		codeToStateMap[state]
	].join(',');
	const seoUrl = `https://whoaremyrepresentatives.us/representatives/${state}`;
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

<h2 data-automation="rep-info-fullname">{fullName}</h2>
<RepImage {fullName} {id} />
<div class="basic-info">
	<h3>{term.party} - {title}{districtInfo}</h3>
	<p><strong>Phone:</strong> <a class="phone" href={`tel:${phone}`}>{phone}</a></p>
	<p><strong>Office:</strong> {office}</p>
</div>

<GovInfo {id} {term} />
<SocialMedia media={social} />

<style>
	h2 {
		font-size: 2rem;
	}

	.basic-info {
		display: block;
		margin: 20px 0;
		width: 80%;

		border: 1px solid #b22234;
		color: #3c3b6e;
		border-radius: 3px;
		padding: 20px;
	}

	.basic-info p {
		margin: 0 0 0.5em 0;
	}
</style>
