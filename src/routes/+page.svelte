<script lang="ts">
  import Spinner from "$lib/Spinner.svelte";
  import { onMount } from "svelte";
  import { getContext } from "svelte";
  import { slide } from "svelte/transition";
  import { spotlight } from "$lib/actions/spotlight.js";

  //colors menu
  let areStatsVisible = $state(false);
  let getHue = getContext<() => number>("getHue");
  let getChroma = getContext<() => number>("getChroma");
  let hue = $derived(getHue());
  let chroma = $derived(getChroma());
  let setHueSmoothly = getContext<(hue: number) => void>("setHueSmoothly");
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

<div class="flex flex-col justify-center items-center h-screen fade-main">
  <div
    use:spotlight
    class="spotlight relative flex flex-col w-[90%] bg-black/30 border border-white/30 bg-blend-darken mx-5 p-5 sm:mx-0 sm:w-xl main {areStatsVisible
      ? 'hidden-short'
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
    <div class="flex flex-row justify-between items-center mb-0.5">
      <h1
        class="font-suse-mono font-light text-3xl bg-linear-to-b from-white/90 to-white/60 bg-clip-text text-transparent hover:tracking-wider hover:text-white transition-[color,letter-spacing]"
      >
        gabors0
      </h1>
      <div class="flex flex-row flex-wrap justify-end gap-x-1">
        <a
          href="https://github.com/gabors0"
          aria-label="github"
          target="_blank"
        >
          <svg
            class="svgIcon transition-all duration-75 opacity-70 hover:-translate-y-1.5 hover:opacity-100"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            ><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
              d="M237.9 461.4C237.9 463.4 235.6 465 232.7 465C229.4 465.3 227.1 463.7 227.1 461.4C227.1 459.4 229.4 457.8 232.3 457.8C235.3 457.5 237.9 459.1 237.9 461.4zM206.8 456.9C206.1 458.9 208.1 461.2 211.1 461.8C213.7 462.8 216.7 461.8 217.3 459.8C217.9 457.8 216 455.5 213 454.6C210.4 453.9 207.5 454.9 206.8 456.9zM251 455.2C248.1 455.9 246.1 457.8 246.4 460.1C246.7 462.1 249.3 463.4 252.3 462.7C255.2 462 257.2 460.1 256.9 458.1C256.6 456.2 253.9 454.9 251 455.2zM316.8 72C178.1 72 72 177.3 72 316C72 426.9 141.8 521.8 241.5 555.2C254.3 557.5 258.8 549.6 258.8 543.1C258.8 536.9 258.5 502.7 258.5 481.7C258.5 481.7 188.5 496.7 173.8 451.9C173.8 451.9 162.4 422.8 146 415.3C146 415.3 123.1 399.6 147.6 399.9C147.6 399.9 172.5 401.9 186.2 425.7C208.1 464.3 244.8 453.2 259.1 446.6C261.4 430.6 267.9 419.5 275.1 412.9C219.2 406.7 162.8 398.6 162.8 302.4C162.8 274.9 170.4 261.1 186.4 243.5C183.8 237 175.3 210.2 189 175.6C209.9 169.1 258 202.6 258 202.6C278 197 299.5 194.1 320.8 194.1C342.1 194.1 363.6 197 383.6 202.6C383.6 202.6 431.7 169 452.6 175.6C466.3 210.3 457.8 237 455.2 243.5C471.2 261.2 481 275 481 302.4C481 398.9 422.1 406.6 366.2 412.9C375.4 420.8 383.2 435.8 383.2 459.3C383.2 493 382.9 534.7 382.9 542.9C382.9 549.4 387.5 557.3 400.2 555C500.2 521.8 568 426.9 568 316C568 177.3 455.5 72 316.8 72zM169.2 416.9C167.9 417.9 168.2 420.2 169.9 422.1C171.5 423.7 173.8 424.4 175.1 423.1C176.4 422.1 176.1 419.8 174.4 417.9C172.8 416.3 170.5 415.6 169.2 416.9zM158.4 408.8C157.7 410.1 158.7 411.7 160.7 412.7C162.3 413.7 164.3 413.4 165 412C165.7 410.7 164.7 409.1 162.7 408.1C160.7 407.5 159.1 407.8 158.4 408.8zM190.8 444.4C189.2 445.7 189.8 448.7 192.1 450.6C194.4 452.9 197.3 453.2 198.6 451.6C199.9 450.3 199.3 447.3 197.3 445.4C195.1 443.1 192.1 442.8 190.8 444.4zM179.4 429.7C177.8 430.7 177.8 433.3 179.4 435.6C181 437.9 183.7 438.9 185 437.9C186.6 436.6 186.6 434 185 431.7C183.6 429.4 181 428.4 179.4 429.7z"
            /></svg
          ></a
        >
        <a
          href="https://x.com/s5underscore5"
          aria-label="x/twitter"
          target="_blank"
          ><svg
            class="svgIcon transition-all duration-75 opacity-70 hover:-translate-y-1.5 hover:opacity-100"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            ><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
              d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z"
            /></svg
          ></a
        >
        <a
          href="mailto:gabors0@proton.me"
          aria-label="send an email"
          target="_blank"
          title="gabors0@proton.me"
          ><svg
            class="svgIcon transition-all duration-75 opacity-70 hover:-translate-y-1.5 hover:opacity-100"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            ><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
              d="M125.4 128C91.5 128 64 155.5 64 189.4C64 190.3 64 191.1 64.1 192L64 192L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 192L575.9 192C575.9 191.1 576 190.3 576 189.4C576 155.5 548.5 128 514.6 128L125.4 128zM528 256.3L528 448C528 456.8 520.8 464 512 464L128 464C119.2 464 112 456.8 112 448L112 256.3L266.8 373.7C298.2 397.6 341.7 397.6 373.2 373.7L528 256.3zM112 189.4C112 182 118 176 125.4 176L514.6 176C522 176 528 182 528 189.4C528 193.6 526 197.6 522.7 200.1L344.2 335.5C329.9 346.3 310.1 346.3 295.8 335.5L117.3 200.1C114 197.6 112 193.6 112 189.4z"
            /></svg
          ></a
        >
        <a
          href="https://last.fm/user/gabors0"
          aria-label="last.fm"
          target="_blank"
          ><svg
            class="svgIcon transition-all duration-75 opacity-70 hover:-translate-y-1.5 hover:opacity-100"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            ><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
              d="M289.8 431.1L271 380.1C271 380.1 240.5 414.1 194.8 414.1C154.3 414.1 125.6 378.9 125.6 322.6C125.6 250.5 162 224.7 197.7 224.7C264.2 224.7 272.5 278 298.6 359.6C317.4 416.5 352.6 462.2 454 462.2C526.7 462.2 576 439.9 576 381.3C576 308.4 513.3 300.7 461 289.2C435.2 283.3 427.6 272.8 427.6 255.2C427.6 235.3 443.4 223.5 469.2 223.5C497.4 223.5 512.6 234.1 514.9 259.3L573.5 252.3C568.8 199.5 532.4 177.8 472.6 177.8C419.8 177.8 368.2 197.7 368.2 261.7C368.2 301.6 387.6 326.8 436.2 338.5C481.1 349.1 516 352.3 516 384.2C516 405.9 494.9 414.7 455 414.7C395.8 414.7 371.1 383.6 357.1 340.8C325.1 244 313.5 177.8 195.8 177.8C109.7 177.8 64 232.3 64 325C64 414.1 109.7 462.2 191.9 462.2C258.1 462.2 289.8 431.1 289.8 431.1z"
            /></svg
          ></a
        >
        <a href="https://ko-fi.com/gabors0" aria-label="ko-fi" target="_blank">
          <svg
            class="svgIcon transition-all duration-75 opacity-70 hover:-translate-y-1.5 hover:opacity-100"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            color="currentColor"
            fill="none"
          >
            <path
              d="M17 5.5H4C3.05719 5.5 2.58579 5.5 2.29289 5.79289C2 6.08579 2 6.55719 2 7.5V14.5C2 16.3856 2 17.3284 2.58579 17.9142C3.17157 18.5 4.11438 18.5 6 18.5H13C13.9319 18.5 14.3978 18.5 14.7654 18.3478C15.2554 18.1448 15.6448 17.7554 15.8478 17.2654C16 16.8978 16 16.4319 16 15.5H17C19.7614 15.5 22 13.2614 22 10.5C22 7.73858 19.7614 5.5 17 5.5Z"
              stroke="#141B34"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
            <path
              d="M17 13H16V8H17C18.3807 8 19.5 9.11929 19.5 10.5C19.5 11.8807 18.3807 13 17 13Z"
              stroke="#141B34"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.58579 9.10051C6.36683 8.29983 7.63317 8.29983 8.41421 9.10051L9 9.70101L9.58579 9.10051C10.3668 8.29983 11.6332 8.29983 12.4142 9.10051C13.1953 9.90118 13.1953 11.1993 12.4142 12L9 15.5L5.58579 12C4.80474 11.1993 4.80474 9.90118 5.58579 9.10051Z"
              stroke="#141B34"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg></a
        >
      </div>
    </div>

    <div class="flex flex-row opacity-50 justify-between items-center">
      <p>Gabor Simon</p>
      <span><Spinner type="big" /></span>
    </div>
  </div>
  <!-- <hr class="my-3 h-5 opacity-50 w-[80%] mx-5 sm:mx-0 sm:w-xl" /> -->
</div>

<!-- colors menu -->
<div class="fixed bottom-5 left-5 flex justify-end flex-col">
  <div class="flex flex-row gap-x-2">
    <button
      class="cursor-pointer text-white/50 hover:text-white hover:*:text-white transition-colors duration-200"
      aria-label="reroll color"
      title="reroll color"
      onclick={() => {
        hue = Math.floor(Math.random() * 361);
        chroma = parseFloat((Math.random() * 0.1).toFixed(3));
        setHueSmoothly(Number(hue));
        document.documentElement.style.setProperty(
          "--chroma",
          chroma.toString(),
        );
      }}
    >
      <span class="text-white/75 transition-colors duration-200">r</span>eroll
      color
    </button>
    <span class="text-white/50 select-none">•</span>
    <button
      class="cursor-pointer text-white/50 hover:text-white hover:*:text-white transition-colors duration-200"
      title="color info"
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
      class="spotlight bg-black/30 border border-white/30 sm:w-md bg-blend-darken mt-3 mr-5 sm:mr-0"
      transition:slide={{ duration: 300 }}
    >
      <div class="flex flex-row justify-between items-center">
        <h1 class="text-xl font-bold p-4">current colors</h1>
        <a
          href="https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl"
          class="p-4 flex opacity-70 hover:opacity-100 transition-opacity duration-200 hover:underline"
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
            aria-label="copy lighter color to clipboard"
            onclick={() => copyToClipboard(`oklch(0.25 ${chroma} ${hue}deg)`)}
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
          <a href="https://oklch.com/#0.25,{chroma},{hue},100" target="_blank">
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
            aria-label="copy darker color to clipboard"
            onclick={() => copyToClipboard(`oklch(0.1 ${chroma} ${hue}deg)`)}
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
          <a href="https://oklch.com/#0.1,{chroma},{hue},100" target="_blank">
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

<style>
  @keyframes fadeMain {
    from {
      opacity: 0;
      transform: translateY(24px) scale(0.98);
      filter: blur(4px) brightness(3);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0) brightness(1);
    }
  }

  .fade-main {
    animation: fadeMain 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
    will-change: opacity, transform, filter;
  }

  /*tailwind of this didnt work on webkit for some reason*/
  .main {
    opacity: 1;
    transition: opacity 150ms;
  }
  @media (max-height: 640px) {
    .main.hidden-short {
      opacity: 0;
      pointer-events: none;
    }
  }
</style>
