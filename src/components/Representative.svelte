<script>
import { fade } from 'svelte/transition';
import { getContext } from 'svelte';
import RepInfo from './RepInfo.svelte';
import RepImage from './RepImage.svelte';

export let rep;
export let state;

const { open } = getContext('simple-modal');
const { name, term, id } = rep;

const fullName = name.official_full || `${name.first} ${name.last}`;
const title = term.type === 'sen' ? 'Senator' : 'Representative';
const districtInfo = term.type === 'sen' || term.district === 0 ? '' : `, District ${term.district}`;
const party = typeof term.party === 'string' ? term.party.toLowerCase() : '';
export const showPopup = () => {
  open(RepInfo, { data: rep, state });
};

const onKeyPress = (e) => {
  if (e.key === 'Enter') {
    showPopup();
  }
};

</script>

<style>
  .rep-card {
    width: 225px;
  }
</style>

<div 
  tabIndex="0" 
  data-automation={`rep-${id.bioguide}`} 
  on:click={showPopup} 
  on:keypress={onKeyPress} 
  in:fade 
  class={`rep-card hover:shadow-outline focus:shadow-outline rounded overflow-hidden shadow-lg cursor-pointer content-center flex flex-col border border-2 border-${party}`}>
  <RepImage {fullName} {id} hideOnMobile={true}/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">{fullName}</div>
    <p class="text-gray-700 text-base">
      {title}{districtInfo}
    </p>
  </div>
  <div class="px-6 py-4">
    <span class={`inline-block bg-${party} rounded-full px-3 py-1 text-sm font-semibold text-${party === 'libertarian' ? 'gray-700' : 'white'} mr-2`}>{term.party}</span>
  </div>
</div>