<script lang="ts">
  let sleeping = true;
  let index = 0;
  let direction = 1;
  let snoreString = "zzz";

  $: animated = snoreString
    .split("")
    .map((c, i) => (i === index ? "Z" : "z"))
    .join("");

  function animate() {
    if (!sleeping) return;
    index += direction;
    if (index >= 2 || index <= 0) direction *= -1;
    setTimeout(animate, 750);
  }

  animate();
</script>

<div
  class="w-full flex flex-col select-none opacity-50 flex-1 items-center justify-center *:font-mono *:text-xl *:text-center *:cursor-pointer"
>
  {#if sleeping}
    <span>{animated}</span>
    <pre
      onclick={() => {
        sleeping = false;
      }}
      class="leading-tight"
      title="cat from https://www.asciiart.eu/animals/cats"
      aria-hidden="true">

 |\__/,|   (`\
_.|- -  |_   ) )
-(((---(((--------
        </pre>
  {/if}
  {#if !sleeping}
    <span>!!</span>
    <pre
      onclick={() => {
        sleeping = false;
      }}
      class="leading-tight"
      title="cat from https://www.asciiart.eu/animals/cats"
      aria-hidden="true">

 |\__/,|   (`\
_.|o o  |_   ) )
-(((---(((--------
          </pre>{/if}
</div>
