<script>
  import Project from "$lib/Project.svelte";
  import { spotlight } from "$lib/actions/spotlight.js";
</script>

<svelte:head>
  <meta name="robots" content="noindex" />
</svelte:head>

<div
  class="flex flex-col gap-5 pt-[100px] pb-5 mx-5 md:mx-auto fadeIn max-w-3xl"
>
  <div
    use:spotlight
    class="spotlight bg-black/30 border border-white/30 bg-blend-darken w-full sm:flex-1 sm:min-w-0"
  >
    <h1 class="font-bold p-4 text-3xl text-center text-white/90">major</h1>
    <hr class="w-full text-white/30" />
    <div class="p-3">
      <i class="opacity-50 text-center w-full">nothing here yet :(</i>
    </div>
  </div>
  <div
    use:spotlight
    class="spotlight bg-black/30 border border-white/30 bg-blend-darken w-full sm:flex-1 sm:min-w-0"
  >
    <h1 class="font-bold p-4 text-3xl text-center text-white/90">minor</h1>
    <hr class="w-full text-white/30" />
    <div
      class="p-3 grid sm:grid-cols-2 grid-cols-1 gap-3 sm:[&>*:nth-child(2n+1):last-child]:col-span-2"
    >
      <Project
        title="unduck-startpage"
        description="a startpage for theo browne's unduck (duckduckgo's bangs but faster). mostly for browsers that don't allow setting a custom search engine, like the one in the steam overlay"
        link="https://search.gs0.me"
        repo="unduck-startpage"
        stack="svelte,tailwind,vercel"
      />
    </div>
  </div>
</div>

<style>
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(50px);
      filter: blur(10px);
    }
    100% {
      opacity: 1;
    }
  }
  .fadeIn {
    animation: fadeIn 0.35s ease-in-out;
  }
</style>
