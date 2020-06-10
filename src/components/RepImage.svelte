<script>
    export let fullName;
    export let id;
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

</style>

<div class="portrait">
  <img 
    class="image" 
    loading="lazy" 
    src={`https://theunitedstates.io/images/congress/225x275/${id.bioguide}.jpg`} 
    alt={fullName} 
    onerror="this.onerror=null;this.src='default.png';"/>
</div>