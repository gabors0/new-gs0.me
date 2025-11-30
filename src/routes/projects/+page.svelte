<script>
  import Project from "$lib/Project.svelte";
</script>

<div class="flex flex-col gap-5 pt-[100px] mx-auto fadeIn max-w-4xl">
  <Project
    title="unduck-startpage"
    description="a startpage for theo browne's unduck. mostly for browsers that don't allow setting a custom search engine, like the one in the steam overlay"
    link="https://search.gs0.me"
    repo="unduck-startpage"
  />
  <i class="opacity-50 text-center w-full">thats it so far...</i>
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
