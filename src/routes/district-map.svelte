<script>
    import { goto } from '@sapper/app';
    import DistrictForm from '../components/DistrictForm.svelte';

    async function onSubmit(state, district) {
      await goto(`representatives/${state.toLowerCase()}/${district.toLowerCase()}`);
    }
</script>

<h1 data-automation="district-map-title">District Map</h1>

<p>We have embedded a map from GovTrack in order to support clarity on who your representatives are. If you want a more accurate idea of what your representative is involved in, please follow the instructions immediately following the map.</p>


<iframe title="district map" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
src="https://www.govtrack.us/congress/members/embed/mapframe?&bounds=-158.518,57.386,-18.119,9.295"></iframe>

<p>To find more info on your representative, please try the following:</p>

<ul>
    <li>Locate your residence on the map</li>
    <li>Fill out the form below with your state code and district number</li>
    <li>Click 'Show Representative' to navigate to your representative</li>
</ul>

<DistrictForm {onSubmit} />

<style>
    iframe {
        margin: 20px;
        width: 100%;
        max-width: 800px;
        height: 400px; 
    }
</style>