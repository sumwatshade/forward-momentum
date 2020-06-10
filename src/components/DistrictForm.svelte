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

</style>

<form>
<label for='state'>State Code</label>
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
<span class="validation-hint">
	{$stateValidity.message}
</span>
{/if}

<label for='district'>District Code</label>
<input 
    id='district'
    type="text"
    placeholder="11" 
    data-automation="district-map-form-district-code"
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
    data-automation="district-map-form-submit"
    on:click|preventDefault={onClick} 
    on:keydown|preventDefault={onKeyPress} 
    disabled={!$stateValidity.valid || !$districtValidity.valid}>Show Representative</button>
</form>