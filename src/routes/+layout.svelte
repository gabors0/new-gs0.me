<script lang="ts">
    import favicon from "$lib/assets/favicon.svg";
    import { browser } from "$app/environment";

    // Generate a hue during SSR so the initial HTML/CSS contains the color and
    // the page does not flash the fallback color on first paint.
    let ssrHue: number | null = null;
    if (!browser) {
        ssrHue = Math.floor(Math.random() * 361);
    }
</script>

<svelte:head>
    <link rel="icon" href={favicon} />

    {#if ssrHue !== null}        <style>
            :root { --hue: {ssrHue}deg; }
        </style>
    {/if}
    {@html `<script>(function(){try{var r=document.documentElement;r.style.setProperty('--hue',Math.floor(Math.random()*361)+'deg');}catch(e){} })();<\/script>`}
</svelte:head>

<slot />

<style lang="postcss">
    :global(html) {
        min-height: 100%;
        overflow: hidden;
    }

    :global(body) {
        margin: 0;
        min-height: 100vh;
        background: linear-gradient(
            oklch(0.35 0.2298 var(--hue, 0deg)),
            oklch(0.3 0.2298 var(--hue, 0deg))
        );
    }
</style>
