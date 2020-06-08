<script>
	import { fly } from 'svelte/transition';

  export let rep;
  
  import { getContext } from 'svelte';
  const { open } = getContext('simple-modal');

  import Popup from './Popup.svelte';

  const {id, name, term} = rep;

  const showPopup = () => {
		open(Popup, { data: rep });
  };
  
  let visible = false;

  setTimeout(() => {
    visible = true;
  }, Math.random() * 1000);

</script>

<style>
.container {
  margin: 20px;
  padding: 20px;
  min-width: 200px;
  border: 1px solid black;
  border-radius: 3px;
}

@media screen and (max-width: 620px) {
  .container {
    width: 100%;
  }
}

.republican {
  color: #B22234;
}

.democrat {
  color: #3C3B6E;
}

</style>

{#if visible}
<div in:fly on:click={showPopup} class={`container ${term.party.toLowerCase()}`}>
  <h2>{name.official_full || `${name.first} ${name.last}`}</h2>
  <h3>{term.party}</h3>
</div>
{/if}
