<script lang="ts">
    import "../app.css";
    import favicon from "$lib/assets/favicon.svg";
    import { browser } from "$app/environment";
    import { page } from '$app/stores';
    
    // Generate a hue during SSR so the initial HTML/CSS contains the color and
    // the page does not flash the fallback color on first paint.
    let ssrHue: number | null = null;
    
    if (!browser) {
        ssrHue = Math.floor(Math.random() * 361);
    }
</script>

<svelte:head>
    <link rel="icon" href={favicon} />

    {#if ssrHue !== null}
        <style>
            :root { --hue: {ssrHue}deg; }
        </style>
    {/if}
    {@html `<script>(function(){try{var r=document.documentElement;r.style.setProperty('--hue',Math.floor(Math.random()*361)+'deg');}catch(e){} })();<\/script>`}
</svelte:head>

<slot />

<header
    class="flex justify-between items-center w-screen p-5 absolute top-0 left-0 *:transition-opacity *:duration-100">
    <a href="/" class="p-5 cursor-pointer hover:opacity-100 {$page.url.pathname === '/' ? 'opacity-100' : 'opacity-50'}">/</a>
    <a href="/projects" class="p-5 cursor-pointer hover:opacity-100 {$page.url.pathname === '/projects' ? 'opacity-100' : 'opacity-50'}">/projects</a>
    <a href="/about" class="p-5 cursor-pointer hover:opacity-100 {$page.url.pathname === '/about' ? 'opacity-100' : 'opacity-50'}">/about</a>
</header>

<style lang="postcss">
    @import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz@0,14..32;1,14..32&display=swap");
    :global(html) {
        min-height: 100%;
        overflow: hidden;
    }

    :global(body) {
        font-family:
            "Inter",
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            "Open Sans",
            sans-serif;
        color: white;
        margin: 0;
        min-height: 100vh;
        background: linear-gradient(
            oklch(0.2 0.2298 var(--hue, 0deg)),
            oklch(0.1 0.2298 var(--hue, 0deg))
        );
    }
    :global(::selection, ::-moz-selection) {
        background-color: #ddd;
        color: #333;
    }
</style>
