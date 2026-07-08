<script lang="ts">
  import { onMount } from "svelte";
  import { formatDistance } from "date-fns";
  import Spinner from "./Spinner.svelte";

  type ProjectProps = {
    title: string;
    license: string;
    description: string;
    link?: string;
    repo?: string;
    stack: string;
  };

  type StackIcon = {
    href: string;
    title: string;
    viewBox: string;
    paths: {
      d: string;
      fillRule?: "evenodd" | "nonzero";
      clipRule?: "evenodd" | "nonzero";
    }[];
  };

  let {
    title,
    license,
    description,
    link = "",
    repo = "",
    stack,
  }: ProjectProps = $props();

  const stackIcons: Record<string, StackIcon> = {
    wails: {
      href: "https://wails.io/",
      title: "wails",
      viewBox: "0 0 24 24",
      paths: [
        {
          d: "m19.67 5.252-7.856 5.039-.369-.459-8.69-.283 1.891 1.904 5.221.106 1.63 1.656-5.878.662 1.77 1.783 5.34-1.185.003-.006.993 1.168-3.079 3.11 7.399.001-1.582-5.002 2.209 3.14H24l-5.385-2.415h4.121l-5.384-2.418h4.117L16.297 9.73l1.088-1.443 4.09-1.076-3.467.248 1.662-2.207zm-3.635 2.322-6.039.43 1.455 1.826 1.813-.476 2.771-1.78zm-.252 2.84-.86 1.145-.001-.002.154-.205.707-.938zM0 12.2l5.615 1.033-1.017-1.027L0 12.2z",
        },
      ],
    },
    go: {
      href: "https://go.dev/",
      title: "golang",
      viewBox: "0 0 128 128",
      paths: [
        {
          d: "M11.156 54.829c-.243 0-.303-.122-.182-.303l1.273-1.637c.12-.182.424-.303.666-.303H34.55c.243 0 .303.182.182.364l-1.03 1.576c-.121.181-.424.363-.606.363zM2.004 60.404c-.242 0-.303-.12-.182-.303l1.273-1.636c.121-.182.424-.303.667-.303h27.636c.242 0 .364.182.303.364l-.485 1.454c-.06.243-.303.364-.545.364zM16.67 65.98c-.242 0-.302-.182-.181-.364l.848-1.515c.122-.182.364-.363.607-.363h12.12c.243 0 .364.181.364.424l-.12 1.454c0 .243-.243.425-.425.425zM79.58 53.738c-3.819.97-6.425 1.697-10.182 2.666-.91.243-.97.303-1.758-.606-.909-1.03-1.576-1.697-2.848-2.303-3.819-1.878-7.516-1.333-10.97.91-4.121 2.666-6.242 6.605-6.182 11.514.06 4.849 3.394 8.849 8.182 9.516 4.121.545 7.576-.91 10.303-4 .545-.667 1.03-1.394 1.636-2.243H56.064c-1.272 0-1.575-.788-1.151-1.818.788-1.879 2.242-5.03 3.09-6.606.183-.364.607-.97 1.516-.97h22.06c-.12 1.637-.12 3.273-.363 4.91-.667 4.363-2.303 8.363-4.97 11.878-4.364 5.758-10.06 9.333-17.273 10.303-5.939.788-11.454-.364-16.302-4-4.485-3.394-7.03-7.879-7.697-13.454-.788-6.606 1.151-12.546 5.151-17.758 4.303-5.636 10-9.212 16.97-10.485 5.697-1.03 11.151-.363 16.06 2.97 3.212 2.121 5.515 5.03 7.03 8.545.364.546.122.849-.606 1.03z",
          fillRule: "evenodd",
        },
        {
          d: "M99.64 87.253c-5.515-.122-10.546-1.697-14.788-5.334-3.576-3.09-5.818-7.03-6.545-11.697-1.091-6.848.787-12.909 4.909-18.302 4.424-5.819 9.757-8.849 16.97-10.122 6.181-1.09 12-.484 17.272 3.091 4.788 3.273 7.757 7.697 8.545 13.515 1.03 8.182-1.333 14.849-6.97 20.546-4 4.06-8.909 6.606-14.545 7.757-1.636.303-3.273.364-4.848.546zm14.424-24.485c-.06-.788-.06-1.394-.182-2-1.09-6-6.606-9.394-12.363-8.06-5.637 1.272-9.273 4.848-10.606 10.545-1.091 4.727 1.212 9.515 5.575 11.454 3.334 1.455 6.667 1.273 9.879-.363 4.788-2.485 7.394-6.364 7.697-11.576z",
          fillRule: "nonzero",
        },
      ],
    },
    svelte: {
      href: "https://svelte.dev",
      title: "svelte.dev",
      viewBox: "0 0 128 128",
      paths: [
        {
          d: "M110.293 16.914C98.586-.086 75.668-5 58.02 5.707l-29.856 18.98a33.94 33.94 0 00-15.418 22.938 35.543 35.543 0 003.566 23.102 33.01 33.01 0 00-5.066 12.793 36.517 36.517 0 006.191 27.52c11.727 16.96 34.583 21.897 52.27 11.312l29.879-19a34.025 34.025 0 0015.355-22.938 35.44 35.44 0 00-3.586-23.02c7.938-12.456 7.52-28.48-1.062-40.48zm-55.254 95.773a23.645 23.645 0 01-25.394-9.433c-3.461-4.793-4.73-10.711-3.73-16.586l.585-2.832.54-1.75 1.605 1.062c3.52 2.668 7.46 4.582 11.668 5.875l1.082.375-.122 1.067c-.105 1.48.332 3.144 1.188 4.414 1.75 2.52 4.793 3.73 7.727 2.937.644-.207 1.273-.418 1.812-.754l29.754-18.976c1.5-.961 2.457-2.398 2.832-4.106.328-1.773-.106-3.585-1.066-5.02-1.774-2.46-4.793-3.565-7.727-2.831-.645.226-1.332.48-1.879.812l-11.25 7.145c-10.644 6.328-24.394 3.355-31.46-6.832a21.854 21.854 0 01-3.75-16.586 20.643 20.643 0 019.456-13.875l29.692-18.98c1.875-1.168 3.894-2.02 6.082-2.668 9.605-2.5 19.726 1.27 25.394 9.394a22.027 22.027 0 013.043 19.398l-.543 1.77-1.539-1.062a39.399 39.399 0 00-11.727-5.875l-1.066-.313.106-1.066c.105-1.563-.332-3.207-1.188-4.48-1.754-2.52-4.793-3.583-7.727-2.833-.644.211-1.273.418-1.812.754L45.812 49.977c-1.5 1-2.46 2.394-2.773 4.144-.312 1.707.106 3.582 1.066 4.957 1.708 2.524 4.81 3.586 7.688 2.832.687-.207 1.332-.414 1.855-.75l11.375-7.254c1.856-1.226 3.938-2.12 6.067-2.707 9.668-2.52 19.75 1.274 25.394 9.438 3.461 4.793 4.793 10.707 3.832 16.52a20.487 20.487 0 01-9.332 13.874L61.23 109.97a25.82 25.82 0 01-6.187 2.707zm0 0",
        },
      ],
    },
    tailwind: {
      href: "https://tailwindcss.com/",
      title: "tailwind css",
      viewBox: "0 0 128 128",
      paths: [
        {
          d: "M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0",
        },
      ],
    },
    vercel: {
      href: "https://vercel.com",
      title: "vercel",
      viewBox: "0 0 128 128",
      paths: [{ d: "M64.002 8.576 128 119.424H0Zm0 0" }],
    },
  };

  const githubIcon = {
    viewBox: "0 0 128 128",
    paths: [
      {
        d: "M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z",
        fillRule: "evenodd" as const,
        clipRule: "evenodd" as const,
      },
      {
        d: "M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0",
      },
    ],
  };

  let stackItems = $derived(stack
    .split(",")
    .map((s) => stackIcons[s.trim()])
    .filter((item): item is StackIcon => Boolean(item)));

  let commitDate = $state<string | null>(null);
  let error = $state<string | null>(null);

  let formattedDate = $derived(commitDate
    ? formatDistance(new Date(commitDate), new Date())
    : null);

  onMount(async () => {
    if (repo !== "") {
      try {
        const branchRes = await fetch(
          `https://api.github.com/repos/gabors0/${repo}/branches/main`,
        );
        if (!branchRes.ok)
          throw new Error(`Branch fetch failed: ${branchRes.status}`);
        const branchData: { commit?: { url?: string } } =
          await branchRes.json();
        const commitUrl = branchData.commit?.url;
        if (!commitUrl) throw new Error("Branch response missing commit URL");
        const commitRes = await fetch(commitUrl);
        if (!commitRes.ok)
          throw new Error(`Commit fetch failed: ${commitRes.status}`);
        const commitData: { commit?: { author?: { date?: string } } } =
          await commitRes.json();
        const date = commitData.commit?.author?.date;
        if (!date) throw new Error("Commit response missing author date");
        commitDate = date;
      } catch (e) {
        error = e instanceof Error ? e.message : "Failed to load commit date";
      }
    }
  });
</script>

<div class="bg-blend-darken w-full sm:flex-1 sm:min-w-0">
  <div class="flex flex-row items-center justify-between">
    <div class="flex flex-row items-center">
      <h1 class="font-bold pl-4 pr-2 pt-4 text-2xl text-white/90">{title}</h1>
      <span class="bg-white/10 text-white/70 text-xl rounded-sm px-1.5 mt-4"
        >{license}</span
      >
    </div>
    <div class="hidden sm:flex flex-row gap-1 pt-4 pr-4">
      <!-- logos -->
      <!-- eslint-disable svelte/no-navigation-without-resolve -->
      {#each stackItems as item (item.title)}
        <a
          href={item.href}
          target="_blank"
          title={item.title}
          class="opacity-70 hover:opacity-100 transition-opacity"
        >
          <svg
            class="svgIcon"
            role="img"
            viewBox={item.viewBox}
            xmlns="http://www.w3.org/2000/svg"
          >
            {#each item.paths as path (path.d)}
              <path
                d={path.d}
                fill-rule={path.fillRule}
                clip-rule={path.clipRule}
              />
            {/each}
          </svg>
        </a>
      {/each}
      <!-- eslint-enable svelte/no-navigation-without-resolve -->
    </div>
  </div>
  <p class="px-4 py-2 opacity-70 text-lg">{description}</p>
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
          <svg
            class="svgIcon transition-opacity opacity-70 hover:opacity-100"
            role="img"
            viewBox={githubIcon.viewBox}
            xmlns="http://www.w3.org/2000/svg"
          >
            {#each githubIcon.paths as path (path.d)}
              <path
                d={path.d}
                fill-rule={path.fillRule}
                clip-rule={path.clipRule}
              />
            {/each}
          </svg>
        </a>
      {/if}
    </div>
  </div>
</div>
