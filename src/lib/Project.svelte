<script lang="ts">
  import { onMount } from "svelte";
  import { formatDistance } from "date-fns";
  import Spinner from "./Spinner.svelte";
  export let title: string;
  export let license: string;
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

<link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
<div class="border border-white/30 bg-blend-darken w-full sm:flex-1 sm:min-w-0">
  <div class="flex flex-row items-center justify-between">
    <div class="flex flex-row items-center">
        <h1 class="font-bold pl-4 pr-2 text-2xl text-white/90">{title}</h1>
        <span class="bg-white/10 text-white/70 text-xl rounded-sm px-1.5 mt-0.5">{license}</span>
    </div>
    <div class="flex flex-row gap-1 p-4">
      <!-- logos -->
      {#if stackArr.includes("wails")}  
        <a
          href="https://wails.io/"
          target="_blank"
          title="wails"
          class="opacity-70 hover:opacity-100 transition-opacity"
          ><svg class="svgIcon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m19.67 5.252-7.856 5.039-.369-.459-8.69-.283 1.891 1.904 5.221.106 1.63 1.656-5.878.662 1.77 1.783 5.34-1.185.003-.006.993 1.168-3.079 3.11 7.399.001-1.582-5.002 2.209 3.14H24l-5.385-2.415h4.121l-5.384-2.418h4.117L16.297 9.73l1.088-1.443 4.09-1.076-3.467.248 1.662-2.207zm-3.635 2.322-6.039.43 1.455 1.826 1.813-.476 2.771-1.78zm-.252 2.84-.86 1.145-.001-.002.154-.205.707-.938zM0 12.2l5.615 1.033-1.017-1.027L0 12.2z"/></svg>
        </a>{/if}
      {#if stackArr.includes("go")}
        <a
          href="https://go.dev/"
          target="_blank"
          title="golang"
          class="opacity-70 hover:opacity-100 transition-opacity"
          ><i class="devicon-go-original-wordmark text-[32px] svgIcon"></i>
        </a>{/if}
      {#if stackArr.includes("svelte")}
        <a
          href="https://svelte.dev"
          target="_blank"
          title="svelte.dev"
          class="opacity-70 hover:opacity-100 transition-opacity"
          ><i class="devicon-svelte-plain svgIcon"></i>
        </a>
      {/if}
      {#if stackArr.includes("tailwind")}
        <a
          href="https://tailwindcss.com/"
          target="_blank"
          title="tailwind css"
          class="opacity-70 hover:opacity-100 transition-opacity"
          ><i class="devicon-tailwindcss-original svgIcon"></i>
        </a>{/if}
      {#if stackArr.includes("vercel")}
        <a
          href="https://vercel.com"
          target="_blank"
          title="vercel"
          class="opacity-70 hover:opacity-100 transition-opacity"
          ><i class="devicon-vercel-original svgIcon"></i>
        </a>{/if}
    </div>
  </div>
  <hr class="w-full text-white/30" />
  <p class="p-4 opacity-70 text-lg">{description}</p>
  <div class="flex justify-between items-center p-4">
    <span class="italic align-middle opacity-70"
      >{#if error}{error}{:else if formattedDate}last modified: {formattedDate}
        ago{:else if repo == ""}{:else}<Spinner type="classic" />{/if}</span
    >
    <div class="flex flex-row gap-1">
      {#if link !== ""}
        <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
        <a href={link} target="_blank" title="visit website">
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
          title="visit GitHub"
        >
            <i class="devicon-github-original svgIcon transition-opacity opacity-70 hover:opacity-100"></i>

        </a>
      {/if}
    </div>
  </div>
</div>
