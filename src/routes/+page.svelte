<script lang="ts">
  import { onMount } from "svelte";
  import { getContext } from "svelte";
  import { fade, slide } from "svelte/transition";
  import { spotlight } from "$lib/actions/spotlight.js";
  import CounterDigit from "$lib/CounterDigit.svelte";
  import githubIcon from "$lib/assets/icons/github.svg";
  import xIcon from "$lib/assets/icons/x.svg";
  import lastfmIcon from "$lib/assets/icons/lastfm.svg";
  import kofiIcon from "$lib/assets/icons/kofi.svg";
  import signalIcon from "$lib/assets/icons/signal.svg";
  import emailIcon from "$lib/assets/icons/email.svg";
  import copyIcon from "$lib/assets/icons/copy.svg";
  import externalLinkIcon from "$lib/assets/icons/external-link.svg";

  let { data } = $props();
  let polledViews = $state<number | null>(null);
  let displayedViews = $derived(polledViews ?? data.views);

  let digits = $derived(displayedViews.toString().split(""));

  // Polling effect
  $effect(() => {
    const interval = setInterval(async () => {
      const res = await fetch("/api/views");
      const json = await res.json();
      polledViews = json.views;
    }, 3000);

    return () => clearInterval(interval);
  });

  // signal username display
  let isSignalVisible = $state(false);
  let didHoverRevealSignal = false;

  function previewSignal() {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || isSignalVisible) return;
    isEmailVisible = false;
    didHoverRevealEmail = false;
    isSignalVisible = true;
    didHoverRevealSignal = true;
  }

  function clearSignalPreview() {
    if (!didHoverRevealSignal) return;
    isSignalVisible = false;
    didHoverRevealSignal = false;
  }

  function toggleSignal() {
    isEmailVisible = false;
    didHoverRevealEmail = false;
    if (didHoverRevealSignal) {
      didHoverRevealSignal = false;
      return;
    }
    isSignalVisible = !isSignalVisible;
  }

  // mail display
  let isEmailVisible = $state(false);
  let didHoverRevealEmail = false;

  function previewEmail() {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || isEmailVisible) return;

    isSignalVisible = false;
    didHoverRevealSignal = false;
    isEmailVisible = true;
    didHoverRevealEmail = true;
  }

  function clearEmailPreview() {
    if (!didHoverRevealEmail) return;

    isEmailVisible = false;
    didHoverRevealEmail = false;
  }

  function toggleEmail() {
    isSignalVisible = false;
    didHoverRevealSignal = false;
    if (didHoverRevealEmail) {
      didHoverRevealEmail = false;
      return;
    }

    isEmailVisible = !isEmailVisible;
  }
  
  //colors menu
  let areStatsVisible = $state(false);
  let isCardObscured = $state(false);
  let homeScreen: HTMLDivElement;
  let colorMenu: HTMLDivElement;

  onMount(() => {
    // Use actual bounds: Safari's toolbar and text size change the available space.
    function updateCardVisibility() {
      const menu = colorMenu.getBoundingClientRect();
      const cards = Array.from(homeScreen.querySelectorAll<HTMLElement>(".main"))
        .map((card) => card.getBoundingClientRect())
        .filter((rect) => rect.width > 0 && rect.height > 0);
      isCardObscured = cards.some((card, index) =>
        menu.left < card.right && menu.right > card.left &&
        menu.top < card.bottom + 16 && menu.bottom > card.top - (index === 0 ? 48 : 0)
      );
    }

    const observer = new ResizeObserver(updateCardVisibility);
    observer.observe(colorMenu);
    observer.observe(homeScreen);
    homeScreen.querySelectorAll(".main").forEach((card) => observer.observe(card));
    window.addEventListener("resize", updateCardVisibility);
    window.addEventListener("scroll", updateCardVisibility, { passive: true });
    window.visualViewport?.addEventListener("resize", updateCardVisibility);
    homeScreen.addEventListener("animationend", updateCardVisibility);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateCardVisibility);
      window.removeEventListener("scroll", updateCardVisibility);
      window.visualViewport?.removeEventListener("resize", updateCardVisibility);
      homeScreen.removeEventListener("animationend", updateCardVisibility);
    };
  });
  let getHue = getContext<() => number>("getHue");
  let getChroma = getContext<() => number>("getChroma");
  let hue = $derived(getHue());
  let chroma = $derived(getChroma());
  let rerollColor = getContext<() => void>("rerollColor");
  let copyToClipboard = getContext<(text: string) => void>("copyToClipboard");

  //clock
  let time = $state("");
  let showColon = true;
  function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-GB", {
      timeZone: "Europe/Budapest",
      hour: "2-digit",
      minute: "2-digit",
    });
    time = showColon ? timeString : timeString.replace(":", " ");
    showColon = !showColon;
  }

  onMount(() => {
    // Increment the counter when the page mounts
    fetch("/api/views", { method: "POST" }).then(async (res) => {
      const json = await res.json();
      polledViews = json.views;
    });

    updateTime();
    const interval = setInterval(updateTime, 1000);

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
        case "d":
          areStatsVisible = !areStatsVisible;
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyPress);
    };
  });
</script>

<div bind:this={homeScreen} inert={isCardObscured} class="flex flex-col justify-center items-center home-screen fade-main">
  <div
    use:spotlight
    class="spotlight relative flex flex-col w-[90%] bg-black/30 border border-white/30 bg-blend-darken mx-5 p-5 sm:mx-0 sm:w-[39rem] sm:max-w-[calc(100%-2.5rem)] main {isCardObscured
      ? 'obscured'
      : ''}"
  >
    <div class="absolute -top-12 right-3">
      <div
        class="bg-black/30 w-auto border border-b-0 border-white/30 bg-blend-darken p-1"
      >
        <div
          class="bg-[#050505] w-full h-full border border-white/30 p-1 text-lime-400 text-xl font-segmented select-none"
          aria-label="current time in my timezone"
          title="current time in my timezone"
        >
          <span class="font-segmented drop-shadow-[0_0_5px_#6da300]"
            >{time}</span
          >
        </div>
      </div>
    </div>
    <div class="flex flex-row justify-between items-center gap-x-1 mb-0.5">
        <h1
          class="grid font-suse-mono font-light text-2xl sm:text-3xl min-w-0 transition-[letter-spacing] {isEmailVisible || isSignalVisible
            ? ''
            : 'hover:tracking-wider'}"
        >
          <a
            href={isEmailVisible ? 'mailto:gabors0@proton.me' : undefined}
            tabindex={isEmailVisible ? undefined : -1}
            class="col-start-1 row-start-1 inline-flex whitespace-nowrap"
            class:group={!isSignalVisible}
          >
            <span class="inline-flex">
              <span
                aria-hidden={!isSignalVisible}
                class="inline-block overflow-hidden bg-linear-to-b from-white/90 to-white/60 bg-clip-text text-transparent transition-[width] duration-150 motion-reduce:transition-none"
                style:width={isSignalVisible ? '1ch' : '0ch'}
              >@</span>
              <span class="relative inline-block">
              <span class="bg-linear-to-b from-white/90 to-white/60 bg-clip-text text-transparent">
                gabors
              </span>
              <span
                aria-hidden="true"
                class="absolute inset-0 text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100"
              >
                gabors
              </span>
              </span>
              <span class="inline-grid">
                {#if isSignalVisible}
                  <span class="col-start-1 row-start-1" transition:fade={{ duration: 150 }}>
                    <span class="bg-linear-to-b from-white/90 to-white/60 bg-clip-text text-transparent">.99</span>
                  </span>
                {:else}
                  <span class="inline-flex col-start-1 row-start-1" transition:fade={{ duration: 150 }}>
                    <span class="relative inline-block">
                      <span class="bg-linear-to-b from-white/90 to-white/60 bg-clip-text text-transparent">0</span>
                      <span aria-hidden="true" class="absolute inset-0 text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100">0</span>
                    </span>
                    {#if isEmailVisible}
                      <span class="inline-block" transition:fade={{ duration: 150 }}>
                        <span class="relative inline-block">
                          <span class="bg-linear-to-b from-white/90 to-white/60 bg-clip-text text-transparent">@proton.me</span>
                          <span
                            aria-hidden="true"
                            class="absolute inset-0 text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                          >@proton.me</span>
                        </span>
                      </span>
                    {/if}
                  </span>
                {/if}
              </span>
            </span>
          </a>
        </h1>
        <div class="hidden sm:flex shrink-0 flex-row justify-end gap-x-1">
        <a
          href="https://github.com/gabors0"
          aria-label="github"
          target="_blank"
        >
          <img src={githubIcon} alt="" class="svgIcon transition-all duration-75 opacity-70 hover:-translate-y-1.5 hover:opacity-100" /></a
        >
        <a
          href="https://x.com/s5underscore5"
          aria-label="x/twitter"
          target="_blank"
          ><img src={xIcon} alt="" class="svgIcon transition-all duration-75 opacity-70 hover:-translate-y-1.5 hover:opacity-100" /></a
        >
        <a
          href="https://last.fm/user/gabors0"
          aria-label="last.fm"
          target="_blank"
          ><img src={lastfmIcon} alt="" class="svgIcon transition-all duration-75 opacity-70 hover:-translate-y-1.5 hover:opacity-100" /></a
        >
        <a href="https://ko-fi.com/gabors0" aria-label="ko-fi" target="_blank">
          <img src={kofiIcon} alt="" class="svgIcon transition-all duration-75 opacity-70 hover:-translate-y-1.5 hover:opacity-100" />
        </a>
          <button
            aria-label="show Signal username"
            title="@gabors.99"
            aria-pressed={isSignalVisible}
            class="cursor-pointer"
            onmouseenter={previewSignal}
            onmouseleave={clearSignalPreview}
            onclick={toggleSignal}
          >
            <img src={signalIcon} alt="" class="svgIcon transition-all duration-75 opacity-70 hover:-translate-y-1.5 hover:opacity-100" />
          </button>
          <button
            aria-label="send an email"
            title="gabors0@proton.me"
            class="cursor-pointer"
            onmouseenter={previewEmail}
            onmouseleave={clearEmailPreview}
            onclick={toggleEmail}
            ><img src={emailIcon} alt="" class="svgIcon transition-all duration-75 opacity-70 hover:-translate-y-1.5 hover:opacity-100" /></button
          >
      </div>
    </div>

    <div class="flex flex-row opacity-50 justify-between items-center">
      <p>Gabor Simon</p>
      <div class="flex flex-row items-baseline gap-1">
        <span class="flex flex-row items-baseline mb-0.5">
          {#each digits as digit, i (digits.length - i)}
            <CounterDigit {digit} />
          {/each}
        </span>
        <span>views</span>
      </div>
    </div>
  </div>
  <!-- mobile social links -->
  <div
    use:spotlight
    class="spotlight relative sm:hidden flex flex-row items-center justify-center gap-x-1 w-[90%] bg-black/30 border border-t-0 border-white/30 bg-blend-darken mx-5 p-5 sm:mx-0 sm:w-xl main {isCardObscured
      ? 'obscured'
      : ''}"
  >
      <a
        href="https://github.com/gabors0"
        aria-label="github"
        target="_blank"
      >
        <img src={githubIcon} alt="" class="svgIcon transition-all duration-75 opacity-70 hover:-translate-y-1.5 hover:opacity-100" /></a
      >
      <a
        href="https://x.com/s5underscore5"
        aria-label="x/twitter"
        target="_blank"
        ><img src={xIcon} alt="" class="svgIcon transition-all duration-75 opacity-70 hover:-translate-y-1.5 hover:opacity-100" /></a
      >
      <a
        href="https://last.fm/user/gabors0"
        aria-label="last.fm"
        target="_blank"
        ><img src={lastfmIcon} alt="" class="svgIcon transition-all duration-75 opacity-70 hover:-translate-y-1.5 hover:opacity-100" /></a
      >
      <a href="https://ko-fi.com/gabors0" aria-label="ko-fi" target="_blank">
        <img src={kofiIcon} alt="" class="svgIcon transition-all duration-75 opacity-70 hover:-translate-y-1.5 hover:opacity-100" />
      </a>
        <button
          aria-label="show Signal username"
          title="@gabors.99"
          aria-pressed={isSignalVisible}
          class="cursor-pointer"
          onclick={toggleSignal}
        >
          <img src={signalIcon} alt="" class="svgIcon transition-all duration-75 opacity-70 hover:-translate-y-1.5 hover:opacity-100" />
        </button>
        <button
          aria-label="send an email"
          title="gabors0@proton.me"
          class="cursor-pointer"
          onclick={toggleEmail}
          ><img src={emailIcon} alt="" class="svgIcon transition-all duration-75 opacity-70 hover:-translate-y-1.5 hover:opacity-100" /></button
        >
  </div>
</div>

<!-- colors menu -->
<div bind:this={colorMenu} class="color-menu fixed flex flex-col">
  <div class="color-controls flex flex-row items-center gap-x-2">
    <button
      class="cursor-pointer text-white/50 hover:text-white hover:*:text-white transition-colors duration-200"
      aria-label="reroll color"
      title="reroll color"
      onclick={rerollColor}
    >
      <span class="text-white/75 transition-colors duration-200">r</span>eroll
      color
    </button>
    <span class="text-white/50 select-none">•</span>
    <button
      class="cursor-pointer text-white/50 hover:text-white hover:*:text-white transition-colors duration-200"
      title="color info"
      aria-expanded={areStatsVisible}
      aria-controls="color-details"
      onclick={() => {
        areStatsVisible = !areStatsVisible;
      }}
    >
      <span class="text-white/75 transition-colors duration-200">d</span>etails
    </button>
  </div>
  {#if areStatsVisible}
    <div
      use:spotlight
      id="color-details"
      class="spotlight bg-black/30 border border-white/30 w-full bg-blend-darken mt-3"
      transition:slide={{ duration: 300 }}
    >
      <div class="flex flex-row justify-between items-center">
        <h1 class="text-xl font-bold p-4">current colors</h1>
        <a
          href="https://oklch.fyi/"
          class="p-4 flex opacity-70 hover:opacity-100 transition-opacity duration-200 hover:underline"
          target="_blank">about oklch</a
        >
      </div>
      <hr class="w-full text-white/30" />
      <div
        class="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-2 p-3 sm:p-4 [&_p]:text-sm sm:[&_p]:text-lg [&_p]:wrap-anywhere"
      >
        <p>from:</p>
        <p class="font-suse-mono">oklch(0.25 {chroma} {hue})</p>
        <div class="flex flex-row items-center">
          <button
            aria-label="copy lighter color to clipboard"
            onclick={() => copyToClipboard(`oklch(0.25 ${chroma} ${hue}deg)`)}
          >
            <img src={copyIcon} alt="" class="svgIcon cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-200" />
          </button>
          <a href="https://oklch.com/#0.25,{chroma},{hue},100" target="_blank">
            <img src={externalLinkIcon} alt="open color in OKLCH" class="svgIcon cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-200" />
          </a>
        </div>
        <p>to:</p>
        <p class="font-suse-mono">oklch(0.1 {chroma} {hue})</p>
        <div class="flex flex-row items-center">
          <button
            aria-label="copy darker color to clipboard"
            onclick={() => copyToClipboard(`oklch(0.1 ${chroma} ${hue}deg)`)}
          >
            <img src={copyIcon} alt="" class="svgIcon cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-200" />
          </button>
          <a href="https://oklch.com/#0.1,{chroma},{hue},100" target="_blank">
            <img src={externalLinkIcon} alt="open color in OKLCH" class="svgIcon cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-200" />
          </a>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .home-screen {
    min-height: 100vh;
    min-height: 100dvh;
    padding-top: calc(9rem + env(safe-area-inset-top, 0px));
    padding-bottom: calc(6rem + env(safe-area-inset-bottom, 0px));
    padding-left: env(safe-area-inset-left, 0px);
    padding-right: env(safe-area-inset-right, 0px);
  }

  .home-screen > div {
    flex-shrink: 0;
  }

  .color-menu {
    z-index: 10;
    bottom: calc(1.25rem + env(safe-area-inset-bottom, 0px));
    left: calc(1.25rem + env(safe-area-inset-left, 0px));
    width: min(28rem, calc(100% - 2.5rem - env(safe-area-inset-left, 0px) - env(safe-area-inset-right, 0px)));
    max-height: calc(100vh - 8rem - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px));
    max-height: calc(100dvh - 8rem - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px));
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  .color-menu > div {
    flex-shrink: 0;
  }

  @keyframes fadeMainTransform {
    0% {
      opacity: 0;
      transform: translateY(24px) scale(0.98);
    }
    85% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes fadeMainFilter {
    from {
      filter: blur(4px) brightness(3);
    }
    to {
      filter: blur(0) brightness(1);
    }
  }

  .fade-main {
    animation:
      fadeMainTransform 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both,
      fadeMainFilter 0.5s ease-out 0.2s both;
    will-change: opacity, transform, filter;
  }

  /*tailwind of this didnt work on webkit for some reason*/
  .main {
    opacity: 1;
    transition: opacity 150ms;
  }
  .main.obscured {
    opacity: 0;
    pointer-events: none;
  }
</style>
