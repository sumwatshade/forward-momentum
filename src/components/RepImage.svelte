<script>
	export let hideOnMobile = false;
	export let fullName;
	export let id;

	const className = [hideOnMobile ? 'hide-on-mobile' : ''].filter(Boolean).join(' ');
</script>

<div class={className}>
	<img
		class="image w-full"
		loading="lazy"
		src={`https://theunitedstates.io/images/congress/225x275/${id.bioguide}.jpg`}
		onerror={(event) => {
			if (event?.target?.src) {
				event.target.src = '/default.png';
			}
		}}
		alt={fullName}
	/>
</div>

<style>
	.image {
		height: 275px;
		width: 225px;
	}
	@media (max-width: 620px) {
		.hide-on-mobile {
			display: none;
		}
	}
</style>
