<script lang="ts">
  import { onMount } from "svelte";
  import { formatDistance } from "date-fns";
  import Spinner from "./Spinner.svelte";
  export let title: string;
  export let description: string;
  export let link: string;
  export let repo: string;
  export let stack: string;

  $: stackArr = stack.split(",").map((s) => s.trim());

  let commitDate = null;
  let error = null;
  let formattedDate = null;

  $: formattedDate = commitDate
    ? formatDistance(new Date(commitDate), new Date())
    : null;
  onMount(async () => {
    if (repo !== "") {
      try {
        const branchRes = await fetch(
          `https://api.github.com/repos/gabors0/${repo}/branches/main`,
        );
        if (!branchRes.ok)
          throw new Error(`Branch fetch failed: ${branchRes.status}`);
        const branchData = await branchRes.json();
        const commitUrl = branchData.commit.url;
        const commitRes = await fetch(commitUrl);
        if (!commitRes.ok)
          throw new Error(`Commit fetch failed: ${commitRes.status}`);
        const commitData = await commitRes.json();
        commitDate = commitData.commit.author.date;
      } catch (e) {
        error = e.message;
      }
    }
  });
</script>

<div class="border border-white/30 bg-blend-darken w-full sm:flex-1 sm:min-w-0">
  <div class="flex flex-row items-center justify-between">
    <h1 class="font-bold p-4 text-2xl text-white/90">{title}</h1>
    <div class="flex flex-row gap-1 p-4">
      <!-- logos -->
      {#if stackArr.includes("svelte")}
        <a
          href="https://svelte.dev"
          target="_blank"
          aria-label="svelte.dev"
          class="opacity-70 hover:opacity-100 transition-opacity"
          ><svg
            class="svgIcon transition-transform"
            viewBox="0 0 99 119"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M43.6247 5.21373C59.2247 -4.68625 80.9249 -0.0867853 91.8249 15.6131C97.1249 22.9131 99.225 32.1132 97.5251 41.1131C96.8251 45.313 95.2248 49.313 92.8249 52.9129C96.3249 59.4129 97.4247 66.9137 96.1247 74.2137C94.6246 82.9136 89.4244 90.6134 81.9245 95.3133L54.4245 112.813C38.8245 122.713 17.2252 118.113 6.22528 102.413C1.02533 95.113 -1.07486 85.9135 0.525085 77.0135C1.22508 72.8136 2.82531 68.8137 5.22528 65.2137C1.72528 58.7137 0.6245 51.2129 1.9245 43.9129C3.42456 35.2131 8.62484 27.5133 16.1247 22.8133L43.6247 5.21373ZM80.5251 22.8133C75.3251 15.3133 66.0247 11.8131 57.1247 14.1131C55.1248 14.7131 53.225 15.5132 51.5251 16.6131L24.0251 34.1131C19.5251 36.9131 16.3245 41.6133 15.4245 46.8133C14.4245 52.2133 15.7249 57.7132 18.8249 62.1131C24.0249 69.6131 33.3253 73.1133 42.2253 70.8133C44.2251 70.3133 46.125 69.5129 47.8249 68.4129L58.3249 61.7137C58.8249 61.4137 59.4251 61.2135 60.0251 61.0135C62.725 60.3137 65.5247 61.3133 67.1247 63.6131C68.0247 64.9131 68.4247 66.6137 68.1247 68.2137C67.8246 69.8135 66.9249 71.1136 65.5251 72.0135L38.1247 89.5135C37.6247 89.8135 37.0244 90.0138 36.4245 90.2137C33.7247 90.9135 30.9248 89.8133 29.3249 87.5135C28.5249 86.3135 28.1253 84.813 28.2253 83.4129L28.3249 82.4129L27.3249 82.1131C23.425 80.9132 19.825 79.1136 16.5251 76.7137L15.1247 75.7137L14.6247 77.3133C14.4247 78.2132 14.2251 79.0131 14.0251 79.9129C13.1251 85.313 14.3251 90.8137 17.5251 95.2137C22.7251 102.713 32.0247 106.213 40.9245 103.913C42.9245 103.313 44.8251 102.513 46.5251 101.413L74.0251 83.9129C78.5248 81.113 81.7246 76.4134 82.6247 71.2137C83.5247 65.8137 82.3247 60.313 79.1247 55.9129C73.9247 48.4133 64.6251 44.9139 55.7253 47.2137C53.7253 47.8137 51.8247 48.6137 50.1247 49.7137L39.6247 56.4129C39.1247 56.7129 38.5245 56.9131 37.9245 57.1131C35.2246 57.813 32.4249 56.8133 30.8249 54.5135C29.9249 53.2135 29.5249 51.5129 29.8249 49.9129C30.125 48.3132 31.0247 47.0131 32.4245 46.1131L59.8249 28.6131C60.3249 28.3132 60.9251 28.1129 61.5251 27.9129C64.225 27.2131 67.0248 28.2136 68.6247 30.5135C69.4246 31.7135 69.8252 33.2132 69.7253 34.6131L69.6247 35.6131L70.6247 35.9129C74.5246 37.1129 78.1246 38.9134 81.4245 41.3133L82.8249 42.3133L83.3249 40.7137C83.6249 39.8137 83.8251 39.0131 84.0251 38.1131C84.925 32.7133 83.725 27.2133 80.5251 22.8133Z"
            />
          </svg>
        </a>
      {/if}
      {#if stackArr.includes("tailwind")}
        <a
          href="https://tailwindcss.com/"
          target="_blank"
          aria-label="tailwind css"
          class="opacity-70 hover:opacity-100 transition-opacity"
          ><svg
            class="svgIcon transition-transform"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 54 33"
            ><g clip-path="url(#prefix__clip0)"
              ><path
                fill-rule="evenodd"
                d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
                clip-rule="evenodd"
              /></g
            ><defs
              ><clipPath id="prefix__clip0"
                ><path fill="#fff" d="M0 0h54v32.4H0z" /></clipPath
              ></defs
            ></svg
          >
        </a>{/if}
      {#if stackArr.includes("vercel")}
        <a
          href="https://vercel.com"
          target="_blank"
          aria-label="vercel"
          class="opacity-70 hover:opacity-100 transition-opacity"
          ><svg
            class="svgIcon transition-transform"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 128"
          >
            <path d="M64.002 8.576 128 119.424H0Zm0 0"></path>
          </svg>
        </a>{/if}
    </div>
  </div>
  <hr class="w-full text-white/30" />
  <p class="p-4 opacity-70 text-lg">{description}</p>
  <div class="flex justify-between p-4">
    <span class="italic align-middle opacity-70"
      >{#if error}{error}{:else if formattedDate}last modified: {formattedDate}
        ago{:else if repo == ""}{:else}<Spinner type="classic" />{/if}</span
    >
    <div class="flex flex-row gap-1">
      {#if link !== ""}
        <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
        <a href={link} target="_blank" aria-label="visit website">
          <svg
            class="svgIcon transition-opacity opacity-70 hover:opacity-100"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            ><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
              d="M354.4 83.8C359.4 71.8 371.1 64 384 64L544 64C561.7 64 576 78.3 576 96L576 256C576 268.9 568.2 280.6 556.2 285.6C544.2 290.6 530.5 287.8 521.3 278.7L464 221.3L310.6 374.6C298.1 387.1 277.8 387.1 265.3 374.6C252.8 362.1 252.8 341.8 265.3 329.3L418.7 176L361.4 118.6C352.2 109.4 349.5 95.7 354.5 83.7zM64 240C64 195.8 99.8 160 144 160L224 160C241.7 160 256 174.3 256 192C256 209.7 241.7 224 224 224L144 224C135.2 224 128 231.2 128 240L128 496C128 504.8 135.2 512 144 512L400 512C408.8 512 416 504.8 416 496L416 416C416 398.3 430.3 384 448 384C465.7 384 480 398.3 480 416L480 496C480 540.2 444.2 576 400 576L144 576C99.8 576 64 540.2 64 496L64 240z"
            /></svg
          >
        </a>
      {/if}
      {#if repo !== ""}
        <a
          href="https://github.com/gabors0/{repo}"
          target="_blank"
          aria-label="visit GitHub"
        >
          <svg
            class="svgIcon transition-opacity opacity-70 hover:opacity-100"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            ><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
              d="M237.9 461.4C237.9 463.4 235.6 465 232.7 465C229.4 465.3 227.1 463.7 227.1 461.4C227.1 459.4 229.4 457.8 232.3 457.8C235.3 457.5 237.9 459.1 237.9 461.4zM206.8 456.9C206.1 458.9 208.1 461.2 211.1 461.8C213.7 462.8 216.7 461.8 217.3 459.8C217.9 457.8 216 455.5 213 454.6C210.4 453.9 207.5 454.9 206.8 456.9zM251 455.2C248.1 455.9 246.1 457.8 246.4 460.1C246.7 462.1 249.3 463.4 252.3 462.7C255.2 462 257.2 460.1 256.9 458.1C256.6 456.2 253.9 454.9 251 455.2zM316.8 72C178.1 72 72 177.3 72 316C72 426.9 141.8 521.8 241.5 555.2C254.3 557.5 258.8 549.6 258.8 543.1C258.8 536.9 258.5 502.7 258.5 481.7C258.5 481.7 188.5 496.7 173.8 451.9C173.8 451.9 162.4 422.8 146 415.3C146 415.3 123.1 399.6 147.6 399.9C147.6 399.9 172.5 401.9 186.2 425.7C208.1 464.3 244.8 453.2 259.1 446.6C261.4 430.6 267.9 419.5 275.1 412.9C219.2 406.7 162.8 398.6 162.8 302.4C162.8 274.9 170.4 261.1 186.4 243.5C183.8 237 175.3 210.2 189 175.6C209.9 169.1 258 202.6 258 202.6C278 197 299.5 194.1 320.8 194.1C342.1 194.1 363.6 197 383.6 202.6C383.6 202.6 431.7 169 452.6 175.6C466.3 210.3 457.8 237 455.2 243.5C471.2 261.2 481 275 481 302.4C481 398.9 422.1 406.6 366.2 412.9C375.4 420.8 383.2 435.8 383.2 459.3C383.2 493 382.9 534.7 382.9 542.9C382.9 549.4 387.5 557.3 400.2 555C500.2 521.8 568 426.9 568 316C568 177.3 455.5 72 316.8 72zM169.2 416.9C167.9 417.9 168.2 420.2 169.9 422.1C171.5 423.7 173.8 424.4 175.1 423.1C176.4 422.1 176.1 419.8 174.4 417.9C172.8 416.3 170.5 415.6 169.2 416.9zM158.4 408.8C157.7 410.1 158.7 411.7 160.7 412.7C162.3 413.7 164.3 413.4 165 412C165.7 410.7 164.7 409.1 162.7 408.1C160.7 407.5 159.1 407.8 158.4 408.8zM190.8 444.4C189.2 445.7 189.8 448.7 192.1 450.6C194.4 452.9 197.3 453.2 198.6 451.6C199.9 450.3 199.3 447.3 197.3 445.4C195.1 443.1 192.1 442.8 190.8 444.4zM179.4 429.7C177.8 430.7 177.8 433.3 179.4 435.6C181 437.9 183.7 438.9 185 437.9C186.6 436.6 186.6 434 185 431.7C183.6 429.4 181 428.4 179.4 429.7z"
            /></svg
          >
        </a>
      {/if}
    </div>
  </div>
</div>
