<script>
    export let hideOnMobile = false;
    export let fullName;
    export let id;

    const className = ['portrait', hideOnMobile ? 'hide-on-mobile' : ''].filter(Boolean).join(' ');
</script>

<style>
.portrait {
  width: 225px;
  height: 275px;
  margin-bottom: 20px;
}

.image {
  height: 100%;
  width: 100%;
}

@media(max-width: 620px) {
  .hide-on-mobile {
    display: none;
  }
}

</style>

<div class={className}>
  <img 
    class="image" 
    loading="lazy" 
    src={`https://theunitedstates.io/images/congress/225x275/${id.bioguide}.jpg`} 
    alt={fullName} 
    onerror="this.onerror=null;this.src='default.png';"/>
</div>