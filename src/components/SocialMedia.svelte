<script>
	export let media;

	const map = {
		twitter: 'https://twitter.com/{{REP_ID}}',
		facebook: 'https://facebook.com/{{REP_ID}}',
		youtube: 'https://youtube.com/user/{{REP_ID}}',
		instagram: 'https://www.instagram.com/{{REP_ID}}/'
	};
	const icons = media
		? Object.keys(media)
				.filter((m) => m.indexOf('_id') === -1 && map[m])
				.map((type) => ({
					type,
					link: map[type].replace('{{REP_ID}}', media[type])
				}))
		: [];
</script>

<div>
	{#each icons as icon}
		<a class={`fa fa-${icon.type}`} href={icon.link} target="_blank" rel="noopener noreferer" />
	{/each}
</div>

<style>
	.fa {
		padding: 15px;
		font-size: 20px;
		width: 50px;
		text-align: center;
		text-decoration: none;
		margin: 5px 2px;
	}
	.fa:hover {
		opacity: 0.7;
	}

	.fa-facebook {
		background: #3b5998;
		color: white;
	}

	.fa-twitter {
		background: #55acee;
		color: white;
	}

	.fa-youtube {
		background: #bb0000;
		color: white;
	}

	.fa-instagram {
		background: #125688;
		color: white;
	}
</style>
