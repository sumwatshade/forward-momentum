<script>
    export let id;
    export let term;

    const { contact_form } = term;
</script>

<style>

.fa {
  display: block;
  padding: 20px;
  font-size: 20px;
  text-align: center;
  text-decoration: none;
  margin: 5px 2px;
  width: 80%;
}

.fa > span {
  font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}
.fa:hover {
    opacity: 0.7;
}

.red {
  background: #B22234;
  color: white;
}

.blue {
  background: #3C3B6E;
  color: white;
}

</style>

{#if contact_form}
  <a class="blue fa fa-id-card" target='_blank' rel='noopener noreferer' href={contact_form}>&nbsp;<span>Online contact form</span></a>
{/if}
{#if id.votesmart}
  <a class="red fa fa-check-square-o" target='_blank' rel='noopener noreferer' href={`https://justfacts.votesmart.org/candidate/key-votes/${id.votesmart}`}>&nbsp;<span>View on VoteSmart</span></a>
{/if}
{#if id.fec.length}
  <a class="blue fa fa-usd" target='_blank' rel='noopener noreferer' href={`https://www.fec.gov/data/candidates?${id.fec.map((q) => `q=${q}`).join('&')}`}>&nbsp;<span>View campaign info</span></a>
{/if}
{#if id.govtrack}
  <a class="red fa fa-bar-chart-o" target='_blank' rel='noopener noreferer' href={`https://www.govtrack.us/congress/members/${id.govtrack}`}>&nbsp;<span>GovTrack</span></a>
{/if}