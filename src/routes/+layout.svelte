<script lang="ts">
	import Nav from '../components/Nav.svelte';
	import '../app.css';
	let { data } = $props();
</script>

<Nav segment={data.segment} />

<main>
	<slot></slot>
</main>

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
