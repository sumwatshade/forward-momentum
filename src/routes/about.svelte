<script>
    const seoDescription = 'About this site';
    const seoTitle = 'About';
    const seoKeywords = [
      'congress',
      'representatives',
      'government',
      'US',
      'politics',
      'senate',
      'house',
      'about',
    ].join(',');
    const seoUrl = 'https://whoaremyrepresentatives.us/about';
    // TODO: add state-level seo image
    const seoImage = 'flag.png';
</script>

<svelte:head>
  <title>{seoTitle}</title>
  <meta name="description" content={seoDescription} />
  <meta name="keywords" content={seoKeywords}/>

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content={seoUrl}>
  <meta property="og:title" content={seoTitle}>
  <meta property="og:description" content={seoDescription}>
  {#if seoImage}
  <meta property="og:image" content="{seoImage}">
  {/if}

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content={seoUrl}>
  <meta property="twitter:title" content={seoTitle}>
  <meta property="twitter:description" content={seoDescription}>
  {#if seoImage}
  <meta property="twitter:image" content="{seoImage}">
  {/if}
</svelte:head>

<h1 class="block w-full text-center text-grey-darkest mb-6 text-5xl" data-automation="about-title">About this site</h1>

<p class="text-lg">This project aims to make it easier to get 
information about your state representatives. We will
be working hard to produce easy methods to contact your
representatives, and any resources needed to make your
voice heard.</p>

<p class="text-lg">Have feedback or suggestions? Feel free to send an email to <a class="font-semibold underline" href="mailto:luke.whoaremyrepresentatives@gmail.com" target="_blank" rel="noopener noreferer">luke.whoaremyrepresentatives@gmail.com</a>!</p>