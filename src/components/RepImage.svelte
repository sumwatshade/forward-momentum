<script>
    export let hideOnMobile = false;
    export let fullName;
    export let id;

    const className = [hideOnMobile ? 'hide-on-mobile' : ''].filter(Boolean).join(' ');
</script>

<style>

.image {
  height: 275px;
  width: 225px;
}
@media(max-width: 620px) {
  .hide-on-mobile {
    display: none;
  }
}

</style>

<div class={className}>
  <img  
    class="w-full image"
    loading="lazy" 
    src={`https://theunitedstates.io/images/congress/225x275/${id.bioguide}.jpg`} 
    alt={fullName} 
    onerror="this.onerror=null;this.src='default.png';"/>
</div>