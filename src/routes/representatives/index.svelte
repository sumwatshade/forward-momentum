<script>
    let state = 'ca';
function onClick(event) {
    if(!event.key || event.key === 'Enter') {
        window.location = `/representatives/${state}`;
    }
}
</script>

<div class="container" on:keydown={onClick}>
    <div>Select Your state:</div>
    <input type="text" bind:value={state} />
    <button type="button" on:click={onClick} >Go</button>
</div>

