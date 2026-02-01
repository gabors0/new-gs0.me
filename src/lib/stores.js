import { writable } from "svelte/store";

export const mousePosition = writable({ x: 0, y: 0 });

if (typeof window !== "undefined") {
  window.addEventListener("mousemove", (e) => {
    mousePosition.set({ x: e.clientX, y: e.clientY });
  });
}
