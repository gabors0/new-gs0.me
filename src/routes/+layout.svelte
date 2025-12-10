<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/sandwich.png";
  import { browser } from "$app/environment";
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { dev } from "$app/environment";
  import { injectAnalytics } from "@vercel/analytics/sveltekit";
  onMount(() => {
    injectAnalytics({
      mode: dev ? "development" : "production",
    });
  });

  // Generate a hue during SSR so the initial HTML/CSS contains the color and
  // the page does not flash the fallback color on first paint.
  let ssrHue: number | null = null;
  let ssrChroma: number | null = null;

  if (!browser) {
    ssrHue = Math.floor(Math.random() * 361);
    ssrChroma = parseFloat((Math.random() * 0.1).toFixed(3));
  }

  onMount(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input, textarea, or contenteditable element
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      // Ignore if any modifier keys are pressed
      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case "i":
          goto("/");
          break;
        case "p":
          goto("/projects");
          break;
        case "a":
          goto("/about");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });
</script>

<svelte:head>
  <!-- i need a favicon bro -->
  <!-- <link rel="icon" href={favicon} /> -->
  <title>gabors0</title>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=SUSE+Mono:ital,wght@0,100..800;1,100..800&display=swap"
    rel="stylesheet"
  />

  {#if ssrHue !== null || ssrChroma !== null}
    <style>
            :root {
                --hue: {ssrHue}deg;
                --chroma: {ssrChroma};
            }
    </style>
  {/if}
  {@html `<script>(function(){try{var r=document.documentElement;r.style.setProperty('--hue',Math.floor(Math.random()*361)+'deg');r.style.setProperty('--chroma',parseFloat((Math.random()*0.1).toFixed(3)));}catch(e){} })();<\/script>`}
</svelte:head>

<header
  class="flex z-99 items-center w-screen absolute top-0 left-0 *:transition-colors *:duration-100"
>
  <a
    href="/"
    class="group p-5 cursor-pointer hover:text-white/100 absolute top-4 left-5
    {page.url.pathname === '/' ? 'text-white/100' : 'text-white/50'}"
    >/<span
      class="group-hover:!text-white/100 {page.url.pathname === '/'
        ? 'text-white/100'
        : 'text-white/75'}">i</span
    >ndex</a
  >
  <a
    href="/projects"
    class="group p-5 cursor-pointer hover:text-white/100 absolute top-4 left-1/2 -translate-x-1/2 {page
      .url.pathname === '/projects'
      ? 'text-white/100'
      : 'text-white/50'}"
    >/<span
      class="group-hover:!text-white/100 {page.url.pathname === '/projects'
        ? 'text-white/100'
        : 'text-white/75'}">p</span
    >rojects</a
  >
  <a
    href="/about"
    class="group p-5 cursor-pointer hover:text-white/100 absolute top-4 right-5 {page
      .url.pathname === '/about'
      ? 'text-white/100'
      : 'text-white/50'}"
    >/<span
      class="group-hover:!text-white/100 {page.url.pathname === '/about'
        ? 'text-white/100'
        : 'text-white/75'}">a</span
    >bout</a
  >
</header>

<main>
  <slot />
</main>

{#if page.url.pathname === "/"}{/if}

<style lang="postcss">
  :global(html) {
    height: 100%;
    /*background: linear-gradient(
                to bottom,
                oklch(0.3 0.23 var(--hue, 0deg)) 0%,
                oklch(0.15 0.23 var(--hue, 0deg)) 100vh
            )
            fixed;*/
    background: radial-gradient(
        at bottom,
        oklch(0.25 var(--chroma, 0.1) var(--hue, 0deg)) -50vh,
        oklch(0.1 var(--chroma, 0.1) var(--hue, 0deg)) 100vh
      )
      fixed;
    background-color: oklch(0.05 0.2298 var(--hue, 0deg));
  }

  :global(*):focus {
    outline: none;
  }

  :global(*):focus-visible {
    outline: 1px solid rgba(255, 255, 255, 0.5);
  }

  :global(body) {
    color: white;
    margin: 0;
    padding: 0;
    min-height: 100vh;

    background-attachment: fixed;
    background-size: 100% 100vh;
    background-repeat: no-repeat;
    transition-duration: 0.5s;
    transition-property: background;
  }

  main {
    min-height: 100vh;
    min-height: 100dvh;
    position: relative;
  }

  :global(::selection) {
    background-color: #ddd;
    color: #333;
  }
  :global(::-moz-selection) {
    background-color: #ddd;
    color: #333;
  }
  :global(.svgIcon) {
    fill: white;
    width: 32px;
    height: 32px;
  }
</style>
