<script>
    import { goto } from '@sapper/app';

    import { stateCodeValidator, districtValidator, requiredValidator } from '../utils/validators';
    import createFieldValidator from '../utils/validation';

    const [
      stateValidity,
      stateValidate,
    ] = createFieldValidator(requiredValidator(), stateCodeValidator());
    const [
      districtValidity,
      districtValidate,
    ] = createFieldValidator(requiredValidator(), districtValidator());
    let state = '';
    let district = '';

    const editing = {
      state: true,
      district: true,
    };

    async function onSubmit() {
      await goto(`representatives/${state.toLowerCase()}/${district.toLowerCase()}`);
    }

    async function onKeyPress(e) {
      if (e.key === 'Enter') {
        await goto(`representatives/${state.toLowerCase()}/${district.toLowerCase()}`);
      }
    }

    function handleFocus(key) {
      return function focus() {
        editing[key] = true;
      };
    }

    function handleBlur(key) {
      return function blur() {
        editing[key] = false;
      };
    }
</script>

<h1>District Map</h1>

<p>We have embedded a map from GovTrack in order to support clarity on who your representatives are. If you want a more accurate idea of what your representative is involved in, please follow the instructions immediately following the map.</p>


<iframe title="district map" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
src="https://www.govtrack.us/congress/members/embed/mapframe?&bounds=-158.518,57.386,-18.119,9.295"></iframe>

<p>To find more info on your representative, please try the following:</p>

<ul>
    <li>Locate your residence on the map</li>
    <li>Fill out the form below with your state code and district number</li>
    <li>Click 'Show Representative' to navigate to your representative</li>
</ul>

<form>
<label for='state'>State Code</label>
<input 
    id="state"
    type="text"
    label="State" 
    placeholder="CA" 
    bind:value={state}
    class:field-danger={!editing.state && !$stateValidity.valid}
    class:field-success={!editing.state && $stateValidity.valid}
    use:stateValidate={state}
    on:focus={handleFocus('state')}
    on:blur={handleBlur('state')}>
{#if !editing.state && $stateValidity.dirty && !$stateValidity.valid}
<span class="validation-hint">
	{$stateValidity.message}
</span>
{/if}

<label for='district'>District Code</label>
<input 
    id='district'
    type="text"
    placeholder="11" 
    bind:value={district}
    class:field-danger={!editing.district && !$districtValidity.valid}
    class:field-success={!editing.district && $districtValidity.valid}
    use:districtValidate={district}
    on:focus={handleFocus('district')}
    on:blur={handleBlur('district')}>

{#if !editing.district && !$districtValidity.dirty && !$districtValidity.valid}
<span class="validation-hint">
	{$districtValidity.message}
</span>
{/if}

<button 
    on:click|preventDefault={onSubmit} 
    on:keydown|preventDefault={onKeyPress} 
    disabled={!$districtValidity.valid || !$districtValidity.valid}>Show Representative</button>
</form>

<style>
	input {
		outline: none;
		border-width: 2px;
	}
	
	.validation-hint {
		color: #B22234;
		padding: 6px 0;
	}
	
	.field-danger {
		border-color: #B22234;
	}
	
	.field-success {
		border-color: #4CAF50;
    }
    
    form {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 640px;
    }

    input[type=text] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        margin-bottom: 20px;
    }
    button[disabled] {
        opacity: 0.6;
    }

    button {
        width: 100%;
        background-color: #3C3B6E;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    iframe {
        margin: 20px;
        width: 100%;
        max-width: 800px;
        height: 400px; 
    }

</style>