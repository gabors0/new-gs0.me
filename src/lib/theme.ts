// Serialize the dark OKLCH background as sRGB for browser theme-color support.
// This runs during SSR too, so the browser receives the right tint before hydration.
export function themeColor(hue: number, chroma: number): string {
    const angle = hue * Math.PI / 180;
    const a = chroma * Math.cos(angle);
    const b = chroma * Math.sin(angle);
    const l = (0.1 + 0.3963377774 * a + 0.2158037573 * b) ** 3;
    const m = (0.1 - 0.1055613458 * a - 0.0638541728 * b) ** 3;
    const s = (0.1 - 0.0894841775 * a - 1.291485548 * b) ** 3;
    const rgb = [
        4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ];
    return '#' + rgb.map((channel) => {
        const encoded = channel <= 0.0031308
            ? 12.92 * channel
            : 1.055 * channel ** (1 / 2.4) - 0.055;
        return Math.round(Math.max(0, Math.min(1, encoded)) * 255)
            .toString(16).padStart(2, '0');
    }).join('');
}
