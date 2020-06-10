<script>
  import SocialMedia from './SocialMedia.svelte';
  import GovInfo from './GovInfo.svelte';
  import RepImage from './RepImage.svelte';

  export let data;

  const {
    id, social, term, name,
  } = data;
  
  const title = term.type === 'sen' ? 'Senator' : 'Representative';
  const districtInfo = term.type === 'sen' ? '' : `, District ${term.district}`;
  const { phone, office } = term;

  const fullName = name.official_full || `${name.first} ${name.last}`;
</script>

<style>
  h2 {
		font-size: 2rem;
  }

.basic-info {
  display: block;
  margin: 20px 0;
  width: 80%;

  border: 1px solid #B22234;
  color: #3C3B6E; 
  border-radius: 3px;
  padding: 20px;
}

.basic-info p {
  margin: 0 0 0.5em 0;
}

</style>

<h2 data-automation="rep-info-fullname">{fullName}</h2>
<RepImage {fullName} {id}/>
<div class="basic-info">
  <h3>{term.party} - {title}{districtInfo}</h3>
  <p><strong>Phone:</strong> <a class="phone" href={`tel:${phone}`}>{phone}</a></p>
  <p><strong>Office:</strong> {office}</p>
</div>

<GovInfo {id} {term} />
<SocialMedia media={social} />
