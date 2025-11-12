<script>
    import { page } from "$app/state";
</script>

<div class="flex items-center justify-center min-h-screen">
    <br />
    <h1 class="text-2xl opacity-80 font-suse-mono text-center">
        <span class="text-7xl">{page.status}</span> <br />
        {page.error?.message}
    </h1>
</div>
