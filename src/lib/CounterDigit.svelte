<script lang="ts">
  import { fly } from "svelte/transition";

  let { digit }: { digit: string } = $props();

  let height = $state(0);
</script>

<span class="digit-wrapper font-suse-mono font-semibold" bind:clientHeight={height}>
  <span class="baseline-fix" aria-hidden="true">&nbsp;</span>
  {#key digit}
    <span
      class="digit"
      in:fly={{ y: height || 24, duration: 1600, delay: 300 }}
      out:fly={{ y: -(height || 24), duration: 1600, delay: 300 }}
    >
      {digit}
    </span>
  {/key}
</span>

<style>
  .digit-wrapper {
    display: inline-block;
    position: relative;
    overflow: hidden;
    width: 0.65em;
    vertical-align: baseline;
  }
  .baseline-fix {
    visibility: hidden;
    display: inline;
    pointer-events: none;
  }
  .digit {
    display: block;
    position: absolute;
    inset: 0;
    width: 100%;
    text-align: center;
  }
</style>