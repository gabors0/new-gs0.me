import { mousePosition } from "$lib/stores.js";

export function spotlight(node) {
  let unsubscribe;

  // Check if device is a touch device (coarse pointer)
  const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  // Disable the effect on touch devices by setting size to 0
  if (isTouchDevice) {
    node.style.setProperty("--spotlight-size", "0");
    return {
      destroy() {},
    };
  }

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
