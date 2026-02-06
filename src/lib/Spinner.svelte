<script lang="ts">
  import { onMount } from "svelte";
  export let type = "small";
  let frames: string[];

  if (type === "big") {
    frames = [
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
  } else if (type === "classic") {
    frames = ["|", "╱", "—", "╲", "|", "╱", "—", "╲"];
  } else frames = ["⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣷"];

  let index = 0;
  let displayFrame = frames[0];
  onMount(() => {
    const interval = setInterval(() => {
      index = (index + 1) % frames.length;
      displayFrame = frames[index];
    }, 150);
    return () => clearInterval(interval);
  });
</script>

<pre
  class="select-none not-italic! font-suse-mono tabular-nums text-xl">{displayFrame}</pre>
