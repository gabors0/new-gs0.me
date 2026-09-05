import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = () => ({
    theme: {
        hue: Math.floor(Math.random() * 360),
        chroma: Number((Math.random() * 0.1).toFixed(3)),
    },
});
