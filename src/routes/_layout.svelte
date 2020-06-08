<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		background-color: white;
		padding: 2em;
		box-sizing: border-box;
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>