<script lang="ts">
  import { onMount } from "svelte";
  let spinner: HTMLElement;
  const states = ["⠟", "⠯", "⠷", "⠾", "⠽", "⠻"];
  let index = 0;
  onMount(() => {
    const interval = setInterval(() => {
      if (spinner) {
        spinner.textContent = states[index];
        index = (index + 1) % states.length;
      }
    }, 80);
    return () => clearInterval(interval);
  });
</script>

<span class="select-none tabular-nums text-xl" bind:this={spinner}></span>
