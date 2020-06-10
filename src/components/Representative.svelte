<script>
import { fade } from 'svelte/transition';
import { getContext } from 'svelte';
import RepInfo from './RepInfo.svelte';
import RepImage from './RepImage.svelte';

export let rep;

const { open } = getContext('simple-modal');
const { name, term, id } = rep;

const fullName = name.official_full || `${name.first} ${name.last}`;
const title = term.type === 'sen' ? 'Senator' : 'Representative';
const districtInfo = term.type === 'sen' ? '' : `, District ${term.district}`;

export const showPopup = () => {
  open(RepInfo, { data: rep });
};
</script>

<style>
.container {
  margin: 20px;
  padding: 20px;
  width: 225px;
  flex-grow: 0;
  border: 1px solid black;
  border-radius: 3px;
  transition: background-color 0.3s;
}

.container:hover {
  background-color: #bfbfbf;
  margin: 20px;
  padding: 20px;
  min-width: 200px;
  border: 1px solid black;
  border-radius: 3px;
}

@media(max-width: 620px) {
  .container {
    width: 100%;
  }
}

.republican {
  color: #B22234;
  border-color: #B22234;
}

.democrat {
  color: #3C3B6E;
  border-color: #3C3B6E;
}



.image {
  height: 100%;
  width: 100%;
}

</style>

<div data-automation={`rep-${id.bioguide}`} in:fade on:click={showPopup} class={`container ${term.party.toLowerCase()}`}>
  <RepImage {fullName} {id} hideOnMobile={true}/>
  <h2>{fullName}</h2>
  <h3>{title}{districtInfo}</h3>
  <h4>{term.party}</h4>
</div>
