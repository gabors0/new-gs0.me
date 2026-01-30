<script lang="ts">
    import "../app.css";
    import { browser } from "$app/environment";
    import { page } from "$app/state";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { setContext } from 'svelte';
    import { injectAnalytics } from "@vercel/analytics/sveltekit";


    let { children } = $props();

    onMount(() => {
        injectAnalytics({
            mode: dev ? "development" : "production",
        });
    });

    // generate a hue during SSR so the initial HTML/CSS contains the color
    let ssrHue: number | null = $state(null);
    let ssrChroma: number | null = $state(null);

    if (!browser) {
        ssrHue = Math.floor(Math.random() * 361);
        ssrChroma = parseFloat((Math.random() * 0.1).toFixed(3));
        setContext('hue', () => ssrHue);
        setContext('chroma', () => ssrChroma);
    }

    function setHueSmoothly(newHue: number) {
        const root = document.documentElement;
        const currentHue = parseFloat(
            getComputedStyle(root).getPropertyValue("--hue"),
        );

        let diff = newHue - currentHue;

        if (diff > 180) {
            newHue -= 360;
        } else if (diff < -180) {
            newHue += 360;
        }

        root.style.setProperty("--hue", `${newHue}deg`);
    }

    let hue = $state(0);
    let chroma = $state(0.1);

    // update meta theme-color when colors change
    $effect(() => {
        const themeColor = `oklch(0.4 ${chroma} ${hue}deg)`;
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', themeColor);
        }
    });

    // keybinds
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
                case "r":
                    hue = Math.floor(Math.random() * 361);
                    chroma = parseFloat((Math.random() * 0.1).toFixed(3));
                    setHueSmoothly(hue);
                    document.documentElement.style.setProperty(
                        "--chroma",
                        chroma.toString(),
                    );
                    break;

            }
        };

        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    });

    //copy to clipboard
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text);
    }

    // dynamic favicon
    let faviconUrl = $derived(
        `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><circle r="16" cx="16" cy="16" fill="oklch(0.55 ${chroma} ${hue}deg)"/></svg>`)}`,
    );
</script>

<svelte:head>
    <link rel="icon" href={faviconUrl} />

    <!-- meta tags -->
    <title>gabors0</title>
    <meta name="title" content="gabors0" />
    <meta name="description" content="about" />
    <meta name="author" content="gabors0" />
    <meta name="keywords" content="gabors0, about, website" />
    <meta name="theme-color" content="oklch(0.1 ${chroma} ${hue}deg)" />

    <!-- open graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://gs0.me/" />
    <meta property="og:title" content="gabors0" />
    <meta property="og:description" content="about" />
    <meta property="og:image" content="https://gs0.me/card.webp" />
    <meta property="og:site_name" content="gabors0 - about">

    <!-- xitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://gs0.me/" />
    <meta property="twitter:title" content="gabors0" />
    <meta property="twitter:description" content="about" />
    <meta property="twitter:image" content="https://gs0.me/card.webp" />

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
            class="group-hover:!text-white/100 transition-colors duration-100 {page
                .url.pathname === '/'
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
            class="group-hover:!text-white/100 transition-colors duration-100 {page
                .url.pathname === '/projects'
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
            class="group-hover:!text-white/100 transition-colors duration-100 {page
                .url.pathname === '/about'
                ? 'text-white/100'
                : 'text-white/75'}">a</span
        >bout</a
    >
</header>

<main>
    {@render children()}
</main>

<!-- colors menu -->


<style lang="postcss">
    @reference "../app.css";
    @property --hue {
        syntax: "<angle>";
        inherits: true;
        initial-value: 0deg;
    }

    @property --chroma {
        syntax: "<number>";
        inherits: true;
        initial-value: 0.1;
    }

    :global(html) {
        @apply font-inter font-normal;
        height: 100%;
        background: radial-gradient(
                at bottom,
                oklch(0.25 var(--chroma, 0.1) var(--hue, 0deg)) -50vh,
                oklch(0.1 var(--chroma, 0.1) var(--hue, 0deg)) 100vh
            )
            fixed;
        background-color: oklch(0.05 0.2298 var(--hue, 0deg));
        transition:
            --hue 0.5s,
            --chroma 0.5s;
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
