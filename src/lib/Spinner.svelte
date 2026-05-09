<script lang="ts">
  import { onMount } from "svelte";

  let { type = "small" }: { type?: string } = $props();

  let frames = $derived(
    type === "big"
      ? [
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
        ]
      : type === "classic"
        ? ["|", "╱", "—", "╲", "|", "╱", "—", "╲"]
        : ["⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣷"],
  );

  let index = $state(0);
  let displayFrame = $derived(frames[index % frames.length]);

  onMount(() => {
    const interval = setInterval(() => {
      index = (index + 1) % frames.length;
    }, 150);
    return () => clearInterval(interval);
  });
</script>

<pre
  class="select-none not-italic! font-suse-mono tabular-nums text-xl">{displayFrame}</pre>
