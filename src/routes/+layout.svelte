<script lang="ts">
    import "../app.css";
    import { browser } from "$app/environment";
    import { page } from "$app/state";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { slide } from "svelte/transition";
    import { injectAnalytics } from "@vercel/analytics/sveltekit";
    import { statsVisible } from "$lib/stores";

    let { children } = $props();

    onMount(() => {
        injectAnalytics({
            mode: dev ? "development" : "production",
        });
    });

    // Generate a hue during SSR so the initial HTML/CSS contains the color
    let ssrHue: number | null = $state(null);
    let ssrChroma: number | null = $state(null);

    if (!browser) {
        ssrHue = Math.floor(Math.random() * 361);
        ssrChroma = parseFloat((Math.random() * 0.1).toFixed(3));
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

    //colors menu
    let areStatsVisible = $derived($statsVisible);
    let hue = $state(0);
    let chroma = $state(0.1);

    onMount(() => {
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);
        hue = parseFloat(
            computedStyle.getPropertyValue("--hue").replace("deg", ""),
        );
        chroma = parseFloat(computedStyle.getPropertyValue("--chroma"));
    });

    // Update meta theme-color when colors change
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
                case "d":
                    if (page.url.pathname === "/") {
                        statsVisible.update((v) => !v);
                        break;
                    } else break;
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
    <meta property="og:image" content="https://new-gs0-me-git-dev-gabors0s-projects.vercel.app/card.webp" />
    
    <!-- xitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://gs0.me/" />
    <meta property="twitter:title" content="gabors0" />
    <meta property="twitter:description" content="about" />
    <meta property="twitter:image" content="https://new-gs0-me-git-dev-gabors0s-projects.vercel.app/card.webp" />
    
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

{#if page.url.pathname === "/"}
    <div class="fixed bottom-5 left-5 flex justify-end flex-col">
        <div class="flex flex-row gap-x-2">
            <button
                class="cursor-pointer text-white/50 hover:text-white hover:*:text-white transition-colors duration-200"
                aria-label="reroll color"
                title="reroll color"
                onclick={() => {
                    hue = Math.floor(Math.random() * 361);
                    chroma = parseFloat((Math.random() * 0.1).toFixed(3));
                    setHueSmoothly(hue);
                    document.documentElement.style.setProperty(
                        "--chroma",
                        chroma.toString(),
                    );
                }}
            >
                <span class="text-white/75 transition-colors duration-200"
                    >r</span
                >eroll color
            </button>
            <span class="text-white/50 select-none">•</span>
            <button
                class="cursor-pointer text-white/50 hover:text-white hover:*:text-white transition-colors duration-200"
                aria-label="color info"
                title="color info"
                onclick={() => {
                    statsVisible.update((v) => !v);
                }}
            >
                <span class="text-white/75 transition-colors duration-200"
                    >d</span
                >etails
            </button>
        </div>
        {#if areStatsVisible}
            <div
                class="bg-black/30 border border-white/30 sm:w-md bg-blend-darken mt-3 mr-5 sm:mr-0"
                transition:slide={{ duration: 300 }}
            >
                <div class="flex flex-row justify-between items-center">
                    <h1 class="text-xl font-bold p-4">current colors</h1>
                    <a
                        href="https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl"
                        class="p-4 opacity-70 hover:opacity-100 transition-opacity duration-200 hover:underline"
                        target="_blank">about oklch</a
                    >
                </div>
                <hr class="w-full text-white/30" />
                <div
                    class="grid grid-cols-[auto_1fr_min-content] grid-rows-2 gap-2 p-4 [&_p]:text-lg"
                >
                    <p>from:</p>
                    <p class="font-suse-mono">oklch(0.25 {chroma} {hue})</p>
                    <div class="flex flex-row items-center">
                        <button
                            onclick={() =>
                                copyToClipboard(
                                    `oklch(0.25 ${chroma} ${hue}deg)`,
                                )}
                        >
                            <svg
                                class="svgIcon cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-200"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                                ><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
                                    d="M480 400L288 400C279.2 400 272 392.8 272 384L272 128C272 119.2 279.2 112 288 112L421.5 112C425.7 112 429.8 113.7 432.8 116.7L491.3 175.2C494.3 178.2 496 182.3 496 186.5L496 384C496 392.8 488.8 400 480 400zM288 448L480 448C515.3 448 544 419.3 544 384L544 186.5C544 169.5 537.3 153.2 525.3 141.2L466.7 82.7C454.7 70.7 438.5 64 421.5 64L288 64C252.7 64 224 92.7 224 128L224 384C224 419.3 252.7 448 288 448zM160 192C124.7 192 96 220.7 96 256L96 512C96 547.3 124.7 576 160 576L352 576C387.3 576 416 547.3 416 512L416 496L368 496L368 512C368 520.8 360.8 528 352 528L160 528C151.2 528 144 520.8 144 512L144 256C144 247.2 151.2 240 160 240L176 240L176 192L160 192z"
                                /></svg
                            >
                        </button>
                        <a
                            href="https://oklch.com/#0.25,{chroma},{hue},100"
                            target="_blank"
                        >
                            <svg
                                class="svgIcon cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-200"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                                ><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
                                    d="M354.4 83.8C359.4 71.8 371.1 64 384 64L544 64C561.7 64 576 78.3 576 96L576 256C576 268.9 568.2 280.6 556.2 285.6C544.2 290.6 530.5 287.8 521.3 278.7L464 221.3L310.6 374.6C298.1 387.1 277.8 387.1 265.3 374.6C252.8 362.1 252.8 341.8 265.3 329.3L418.7 176L361.4 118.6C352.2 109.4 349.5 95.7 354.5 83.7zM64 240C64 195.8 99.8 160 144 160L224 160C241.7 160 256 174.3 256 192C256 209.7 241.7 224 224 224L144 224C135.2 224 128 231.2 128 240L128 496C128 504.8 135.2 512 144 512L400 512C408.8 512 416 504.8 416 496L416 416C416 398.3 430.3 384 448 384C465.7 384 480 398.3 480 416L480 496C480 540.2 444.2 576 400 576L144 576C99.8 576 64 540.2 64 496L64 240z"
                                /></svg
                            >
                        </a>
                    </div>
                    <p>to:</p>
                    <p class="font-suse-mono">oklch(0.1 {chroma} {hue})</p>
                    <div class="flex flex-row items-center">
                        <button
                            onclick={() =>
                                copyToClipboard(
                                    `oklch(0.1 ${chroma} ${hue}deg)`,
                                )}
                        >
                            <svg
                                class="svgIcon cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-200"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                                ><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
                                    d="M480 400L288 400C279.2 400 272 392.8 272 384L272 128C272 119.2 279.2 112 288 112L421.5 112C425.7 112 429.8 113.7 432.8 116.7L491.3 175.2C494.3 178.2 496 182.3 496 186.5L496 384C496 392.8 488.8 400 480 400zM288 448L480 448C515.3 448 544 419.3 544 384L544 186.5C544 169.5 537.3 153.2 525.3 141.2L466.7 82.7C454.7 70.7 438.5 64 421.5 64L288 64C252.7 64 224 92.7 224 128L224 384C224 419.3 252.7 448 288 448zM160 192C124.7 192 96 220.7 96 256L96 512C96 547.3 124.7 576 160 576L352 576C387.3 576 416 547.3 416 512L416 496L368 496L368 512C368 520.8 360.8 528 352 528L160 528C151.2 528 144 520.8 144 512L144 256C144 247.2 151.2 240 160 240L176 240L176 192L160 192z"
                                /></svg
                            >
                        </button>
                        <a
                            href="https://oklch.com/#0.1,{chroma},{hue},100"
                            target="_blank"
                        >
                            <svg
                                class="svgIcon cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-200"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                                ><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
                                    d="M354.4 83.8C359.4 71.8 371.1 64 384 64L544 64C561.7 64 576 78.3 576 96L576 256C576 268.9 568.2 280.6 556.2 285.6C544.2 290.6 530.5 287.8 521.3 278.7L464 221.3L310.6 374.6C298.1 387.1 277.8 387.1 265.3 374.6C252.8 362.1 252.8 341.8 265.3 329.3L418.7 176L361.4 118.6C352.2 109.4 349.5 95.7 354.5 83.7zM64 240C64 195.8 99.8 160 144 160L224 160C241.7 160 256 174.3 256 192C256 209.7 241.7 224 224 224L144 224C135.2 224 128 231.2 128 240L128 496C128 504.8 135.2 512 144 512L400 512C408.8 512 416 504.8 416 496L416 416C416 398.3 430.3 384 448 384C465.7 384 480 398.3 480 416L480 496C480 540.2 444.2 576 400 576L144 576C99.8 576 64 540.2 64 496L64 240z"
                                /></svg
                            >
                        </a>
                    </div>
                </div>
            </div>
        {/if}
    </div>
{/if}

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
