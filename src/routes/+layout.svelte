<script lang="ts">
    import "../app.css";
    import favicon from "$lib/assets/sandwich.png";
    import { browser } from "$app/environment";
    import { page } from "$app/state";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    // Generate a hue during SSR so the initial HTML/CSS contains the color and
    // the page does not flash the fallback color on first paint.
    let ssrHue: number | null = null;

    if (!browser) {
        ssrHue = Math.floor(Math.random() * 361);
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
    <!-- <link rel="icon" href={favicon} /> -->

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

    {#if ssrHue !== null}
        <style>
            :root { --hue: {ssrHue}deg; }
        </style>
    {/if}
    {@html `<script>(function(){try{var r=document.documentElement;r.style.setProperty('--hue',Math.floor(Math.random()*361)+'deg');}catch(e){} })();<\/script>`}
</svelte:head>

<main>
    <slot />
</main>

<header
    class="flex items-center w-screen absolute top-0 left-0 *:transition-colors *:duration-100"
>
    <a
        href="/"
        class="group p-5 cursor-pointer hover:text-white/100 absolute top-4 left-5 {page
            .url.pathname === '/'
            ? 'text-white/100'
            : 'text-white/50'}"
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
            class="group-hover:!text-white/100 {page.url.pathname ===
            '/projects'
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

{#if page.url.pathname === "/"}
    <button
        class="fixed cursor-pointer bottom-5 left-5 hover:*:opacity-100 md:hidden"
        aria-label="reroll color"
        title="reroll color"
        on:click={() => {
            document.documentElement.style.setProperty(
                "--hue",
                Math.floor(Math.random() * 361) + "deg",
            );
        }}
    >
        <svg
            class="svgIcon opacity-50 transition-opacity duration-200"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            ><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
                d="M534.6 182.6C547.1 170.1 547.1 149.8 534.6 137.3L470.6 73.3C461.4 64.1 447.7 61.4 435.7 66.4C423.7 71.4 416 83.1 416 96L416 128L256 128C150 128 64 214 64 320C64 337.7 78.3 352 96 352C113.7 352 128 337.7 128 320C128 249.3 185.3 192 256 192L416 192L416 224C416 236.9 423.8 248.6 435.8 253.6C447.8 258.6 461.5 255.8 470.7 246.7L534.7 182.7zM105.4 457.4C92.9 469.9 92.9 490.2 105.4 502.7L169.4 566.7C178.6 575.9 192.3 578.6 204.3 573.6C216.3 568.6 224 556.9 224 544L224 512L384 512C490 512 576 426 576 320C576 302.3 561.7 288 544 288C526.3 288 512 302.3 512 320C512 390.7 454.7 448 384 448L224 448L224 416C224 403.1 216.2 391.4 204.2 386.4C192.2 381.4 178.5 384.2 169.3 393.3L105.3 457.3z"
            /></svg
        >
    </button>
{/if}

<button
    class="fixed cursor-pointer bottom-5 left-5 hover:*:opacity-100 hidden md:block"
    aria-label="reroll color"
    title="reroll color"
    on:click={() => {
        document.documentElement.style.setProperty(
            "--hue",
            Math.floor(Math.random() * 361) + "deg",
        );
    }}
>
    <svg
        class="svgIcon opacity-50 transition-opacity duration-200"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        ><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
            d="M534.6 182.6C547.1 170.1 547.1 149.8 534.6 137.3L470.6 73.3C461.4 64.1 447.7 61.4 435.7 66.4C423.7 71.4 416 83.1 416 96L416 128L256 128C150 128 64 214 64 320C64 337.7 78.3 352 96 352C113.7 352 128 337.7 128 320C128 249.3 185.3 192 256 192L416 192L416 224C416 236.9 423.8 248.6 435.8 253.6C447.8 258.6 461.5 255.8 470.7 246.7L534.7 182.7zM105.4 457.4C92.9 469.9 92.9 490.2 105.4 502.7L169.4 566.7C178.6 575.9 192.3 578.6 204.3 573.6C216.3 568.6 224 556.9 224 544L224 512L384 512C490 512 576 426 576 320C576 302.3 561.7 288 544 288C526.3 288 512 302.3 512 320C512 390.7 454.7 448 384 448L224 448L224 416C224 403.1 216.2 391.4 204.2 386.4C192.2 381.4 178.5 384.2 169.3 393.3L105.3 457.3z"
        /></svg
    >
</button>

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
                oklch(0.2 0.1 var(--hue, 0deg)) 0%,
                oklch(0.1 0.1 var(--hue, 0deg)) 100vh
            )
            fixed;
        background-color: oklch(0.1 0.2298 var(--hue, 0deg));
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
