<script>
  import SocialMedia from './SocialMedia.svelte';

  export let data;

  const {
    id, social, term, name,
} = data;
  const title = term.type === 'sen' ? 'Senator' : 'Representative';
  const districtInfo = term.type === 'sen' ? '' : `, District ${term.district}`;
  const { phone, office, contact_form } = term;
</script>

<style>
  h2 {
		font-size: 2rem;
  }
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

.portrait {
  width: 225px;
  height: 275px;
  margin-bottom: 20px;
}

.image {
  height: 100%;
  width: 100%;
}

.basic-info {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 20px 0;
}

.basic-info p {
  margin: 0 0 0.5em 0;
}

</style>

<h2>{data.name.official_full}</h2>
<div class="portrait">
  <img 
    class="image" 
    loading="lazy" 
    src={`https://theunitedstates.io/images/congress/225x275/${id.bioguide}.jpg`} 
    alt={name.official_full || `${name.first} ${name.last}`} 
    onerror="this.onerror=null;this.src='default.png';"/>
</div>
<div class="basic-info">
  <h3>{term.party} - {title}{districtInfo}</h3>
  <p><strong>Phone:</strong> <a class="phone" href={`tel:${phone}`}>{phone}</a></p>
  <p><strong>Office:</strong> {office}</p>
</div>


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

<SocialMedia media={social} />
