<script lang="ts">
    import "../app.css";
    import { page } from "$app/state";
    import { goto, onNavigate } from "$app/navigation";
    import { onMount, untrack } from "svelte";
    import { dev } from "$app/environment";
    import { setContext } from 'svelte';
    import { injectAnalytics } from "@vercel/analytics/sveltekit";
    import { resolve } from '$app/paths';

    import { themeColor } from "$lib/theme";

    let { children, data } = $props();
    // Keep the layout's theme across client-side navigation; SSR supplies it once.
    const initialTheme = untrack(() => data.theme);
    let hue = $state(initialTheme.hue);
    let chroma = $state(initialTheme.chroma);
    let browserColor = $derived(themeColor(hue, chroma));

    onMount(() => {
        console.log("%csup", `color: #EE00FF; font-size: x-large`);
        injectAnalytics({
            mode: dev ? "development" : "production",
        });
    });

    onNavigate((navigation) => {
        if (
            !document.startViewTransition ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        document.documentElement.classList.add("view-transitioning");

        return new Promise<void>((resolve) => {
            const transition = document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });

            transition.finished.finally(() => {
                document.documentElement.classList.remove("view-transitioning");
            });
        });
    });

    setContext('getHue', () => hue);
    setContext('getChroma', () => chroma);

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
    function rerollColor() {
        hue = Math.floor(Math.random() * 360);
        chroma = Number((Math.random() * 0.1).toFixed(3));
        setHueSmoothly(hue);
        document.documentElement.style.setProperty("--chroma", chroma.toString());
    }
    setContext('rerollColor', rerollColor);

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
                    goto(resolve("/"));
                    break;
                case "p":
                    goto(resolve("/projects"));
                    break;
                case "a":
                    goto(resolve("/about"));
                    break;
                case "r":
                    rerollColor();
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

    setContext('copyToClipboard', copyToClipboard);

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
    <meta name="theme-color" content={browserColor} />

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

    <!-- These values are server-generated numbers, shared with hydration. -->
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html `<style>:root { --hue: ${initialTheme.hue}deg; --chroma: ${initialTheme.chroma}; }</style>`}
</svelte:head>

<header
    class="flex z-99 items-center justify-between w-full h-24 absolute top-0 left-0 *:transition-colors *:duration-100"
>
    <a
        href={resolve('/')}
        class="group p-5 cursor-pointer hover:text-white
    {page.url.pathname === '/' ? 'text-white' : 'text-white/50'}"
        >/<span
            class="group-hover:text-white! transition-colors duration-100 {page
                .url.pathname === '/'
                ? 'text-white'
                : 'text-white/75'}">i</span
        >ndex</a
    >
    <a
        href={resolve('/projects')}
        class="group p-5 cursor-pointer hover:text-white {page
            .url.pathname === '/projects'
            ? 'text-white'
            : 'text-white/50'}"
        >/<span
            class="group-hover:text-white! transition-colors duration-100 {page
                .url.pathname === '/projects'
                ? 'text-white'
                : 'text-white/75'}">p</span
        >rojects</a
    >
    <a
        href={resolve('/about')}
        class="group p-5 cursor-pointer hover:text-white {page
            .url.pathname === '/about'
            ? 'text-white'
            : 'text-white/50'}"
        >/<span
            class="group-hover:text-white! transition-colors duration-100 {page
                .url.pathname === '/about'
                ? 'text-white'
                : 'text-white/75'}">a</span
        >bout</a
    >
</header>

<main>
    {@render children()}
</main>

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
        @apply font-ubuntu font-normal;
        min-height: 100%;
        -webkit-text-size-adjust: 100%;
        text-size-adjust: 100%;
        background-color: oklch(0.1 var(--chroma, 0.1) var(--hue, 0deg));
        transition: --hue 0.5s, --chroma 0.5s;
    }

    /* A fixed layer avoids iOS background-attachment repaint/size issues. */
    :global(body)::before {
        content: "";
        position: fixed;
        inset: 0;
        z-index: -1;
        pointer-events: none;
        background: radial-gradient(
                at bottom,
                oklch(0.25 var(--chroma, 0.1) var(--hue, 0deg)) -50vh,
                oklch(0.1 var(--chroma, 0.1) var(--hue, 0deg)) 100vh
            );
        background-color: oklch(0.1 var(--chroma, 0.1) var(--hue, 0deg));
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

        min-height: 100dvh;
        isolation: isolate;
        background-color: oklch(0.1 var(--chroma, 0.1) var(--hue, 0deg));
    }

    main {
        min-height: 100vh;
        min-height: 100dvh;
        position: relative;
        view-transition-name: route-shell;
        overflow-x: clip;
    }

    header {
        padding-top: env(safe-area-inset-top, 0px);
        padding-left: max(0px, env(safe-area-inset-left, 0px));
        padding-right: max(0px, env(safe-area-inset-right, 0px));
        height: calc(6rem + env(safe-area-inset-top, 0px));
        view-transition-name: site-nav;
        contain: layout;
    }

    :global(.spotlight) {
       	--highlight-color: 255, 255, 255, 0.05;
        --spotlight-size: 256px;

        background-image: radial-gradient(
          circle var(--spotlight-size, 0) at var(--spotlight-x, 50%) var(--spotlight-y, 50%),
          rgba(var(--highlight-color)),
          transparent
        );
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
        font-size: 36px;
        width: 36px;
        height: 36px;
    }
</style>
