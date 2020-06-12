<script>
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

    // Params
    export let onSubmit;

    let state = '';
    let district = '';
    const editing = {
      state: true,
      district: true,
    };

    async function onClick() {
      await onSubmit(state, district);
    }
    async function onKeyPress(e) {
      if (e.key === 'Enter') {
        await onSubmit(state, district);
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

<style>
	input {
		outline: none;
		border-width: 2px;
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

</style>

<form>
<label class="block text-gray-700 text-sm font-bold mb-2" for='state'>State Code</label>
<input 
    id="state"
    data-automation="district-map-form-state-code"
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
<span class="text-republican text-md italic">
	{$stateValidity.message}
</span>
{/if}

<label class="block text-gray-700 text-sm font-bold mb-2" for='district'>District Code</label>
<input 
    id='district'
    type="text"
    placeholder="11" 
    data-automation="district-map-form-district-code"
    bind:value={district}
    class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
    class:field-danger={!editing.district && !$districtValidity.valid}
    class:field-success={!editing.district && $districtValidity.valid}
    use:districtValidate={district}
    on:focus={handleFocus('district')}
    on:blur={handleBlur('district')}>

{#if !editing.district && !$districtValidity.dirty && !$districtValidity.valid}
<span class="text-republican text-md italic">
	{$districtValidity.message}
</span>
{/if}

<button 
    data-automation="district-map-form-submit"
    class="bg-democrat hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    on:click|preventDefault={onClick} 
    on:keydown|preventDefault={onKeyPress} 
    disabled={!$stateValidity.valid || !$districtValidity.valid}>Show Representative</button>
</form>