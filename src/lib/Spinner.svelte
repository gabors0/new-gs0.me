<script lang="ts">
  import { onMount } from "svelte";
  let spinner: HTMLElement;
  const frames = [
    "[ ●    ]",
    "[  ●   ]",
    "[   ●  ]",
    "[    ● ]",
    "[     ●]",
    "[    ● ]",
    "[   ●  ]",
    "[  ●   ]",
    "[ ●    ]",
    "[●     ]",
  ];
  let index = 0;
  onMount(() => {
    const interval = setInterval(() => {
      if (spinner) {
        spinner.textContent = frames[index];
        index = (index + 1) % frames.length;
      }
    }, 80);
    return () => clearInterval(interval);
  });
</script>

<pre
  class="select-none not-italic! font-suse-mono tabular-nums text-xl"
  bind:this={spinner}></pre>
