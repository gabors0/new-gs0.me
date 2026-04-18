<script lang="ts">
  export let title: string;
</script>

<div class="flex items-center">
  <span
    aria-hidden="true"
    class="flex-1 border-t border-white/30"
  ></span>
  <span class="shrink-0 px-3 py-3 text-lg opacity-70 text-white/90"
    >{title}</span
  >
  <span
    aria-hidden="true"
    class="flex-1 border-t border-white/30"
  ></span>
</div>
