<script>
  export let rep;

  const {id, name, term} = rep;
</script>

<style>
.container {
  margin: 20px;
  padding: 20px;
  border: 1px solid black;
  border-radius: 3px;
}

.republican {
  color: #B22234;
}

.democrat {
  color: #3C3B6E;
}

</style>

<div class={`container ${term.party.toLowerCase()}`}>
  <h2>{name.official_full || `${name.first} ${name.last}`}</h2>
  <h3>{term.party}</h3>
</div>
