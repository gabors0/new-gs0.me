<script>
    import Project from "$lib/Project.svelte";
</script>

<div
    class="flex flex-col sm:flex-row sm:flex-wrap gap-5 my-[100px] mx-8 fadeIn"
>
    <Project
        title="unduck-startpage"
        description="a startpage for theo browne's unduck. mostly for browsers that don't allow setting a custom search engine, like the one in the steam overlay"
        link="https://search.gs0.me"
        repo="unduck-startpage"
    />
</div>

<style>
    @keyframes fadeIn {
        0% {
            opacity: 0;
            filter: blur(10px);
        }
        100% {
            opacity: 1;
        }
    }
    .fadeIn {
        animation: fadeIn 0.2s ease-in-out;
    }
</style>
