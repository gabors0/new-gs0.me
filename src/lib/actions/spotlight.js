import { mousePosition } from "$lib/stores.js";

export function spotlight(node) {
  let unsubscribe;

  function update(mouse) {
    const rect = node.getBoundingClientRect();

    const x = ((mouse.x - rect.left) / rect.width) * 100;
    const y = ((mouse.y - rect.top) / rect.height) * 100;

    node.style.setProperty("--spotlight-x", `${x}%`);
    node.style.setProperty("--spotlight-y", `${y}%`);
  }

  unsubscribe = mousePosition.subscribe(update);

  return {
    destroy() {
      unsubscribe();
    },
  };
}
