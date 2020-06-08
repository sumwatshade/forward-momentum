<script>
  import data from "contact-congress/members/A000055.yaml";
</script>

<svelte:head>
  <title>About</title>
</svelte:head>
<h1>About this site</h1>

<p>This is the 'about' page. There's not much here.</p>

<div>{JSON.stringify(data)}</div>
