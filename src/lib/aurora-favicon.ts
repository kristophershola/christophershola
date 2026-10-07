/**
 * Dynamic Aurora Favicon Driver
 * Renders an animated chromatic aurora circle to the tab favicon.
 * Uses requestAnimationFrame with a throttled ~18fps rate and automatically
 * idles when the browser tab is hidden to ensure zero unnecessary CPU overhead.
 */
export function initAuroraFavicon() {
  if (typeof window === "undefined") return;

  const favicon = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
  if (!favicon) return;

  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let animFrameId: number;
  let lastTime = 0;
  const fpsInterval = 1000 / 18;
  let t = 0;

  const render = (time: number) => {
    animFrameId = requestAnimationFrame(render);

    if (document.hidden) return;

    const elapsed = time - lastTime;
    if (elapsed < fpsInterval) return;
    lastTime = time - (elapsed % fpsInterval);

    t += 0.045;

    ctx.clearRect(0, 0, 32, 32);

    ctx.save();
    // Clip circular boundary
    ctx.beginPath();
    ctx.arc(16, 16, 15, 0, Math.PI * 2);
    ctx.clip();

    // Deep ambient base gradient (red-100 to blue-100)
    const baseGrad = ctx.createLinearGradient(0, 0, 32, 32);
    baseGrad.addColorStop(0, "#330000");
    baseGrad.addColorStop(0.5, "#1d0017");
    baseGrad.addColorStop(1, "#000033");
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, 32, 32);

    ctx.globalCompositeOperation = "screen";

    // Wave 1: Red (#ff0000) & Primary Scarlet (#e3001c) & Carmine (#c60039)
    const x1 = 16 + Math.cos(t * 0.8) * 6;
    const y1 = 16 + Math.sin(t * 0.9) * 6;
    const grad1 = ctx.createRadialGradient(x1, y1, 1, x1, y1, 14);
    grad1.addColorStop(0, "rgba(255, 0, 0, 0.95)");
    grad1.addColorStop(0.5, "rgba(227, 0, 28, 0.7)");
    grad1.addColorStop(1, "rgba(198, 0, 57, 0)");
    ctx.fillStyle = grad1;
    ctx.beginPath();
    ctx.arc(x1, y1, 14, 0, Math.PI * 2);
    ctx.fill();

    // Wave 2: Indigo (#5500aa), Ultrasonic Blue (#1c00e3), Blue (#0000ff)
    const x2 = 16 + Math.cos(t * 0.7 + 2.5) * 7;
    const y2 = 16 + Math.sin(t * 0.6 + 2.5) * 7;
    const grad2 = ctx.createRadialGradient(x2, y2, 1, x2, y2, 15);
    grad2.addColorStop(0, "rgba(85, 0, 170, 0.9)");
    grad2.addColorStop(0.5, "rgba(57, 0, 198, 0.75)");
    grad2.addColorStop(0.8, "rgba(28, 0, 227, 0.5)");
    grad2.addColorStop(1, "rgba(0, 0, 255, 0)");
    ctx.fillStyle = grad2;
    ctx.beginPath();
    ctx.arc(x2, y2, 15, 0, Math.PI * 2);
    ctx.fill();

    // Wave 3: Cherry Rose (#aa0055), Dark Magenta (#8e0071), Purple (#71008e)
    const x3 = 16 + Math.sin(t * 0.9 + 1.2) * 6;
    const y3 = 16 + Math.cos(t * 0.8 + 1.2) * 6;
    const grad3 = ctx.createRadialGradient(x3, y3, 1, x3, y3, 13);
    grad3.addColorStop(0, "rgba(255, 50, 152, 0.9)");
    grad3.addColorStop(0.5, "rgba(170, 0, 85, 0.75)");
    grad3.addColorStop(1, "rgba(113, 0, 142, 0)");
    ctx.fillStyle = grad3;
    ctx.beginPath();
    ctx.arc(x3, y3, 13, 0, Math.PI * 2);
    ctx.fill();

    // Wave 4: Luminous Cosmic Violet Core (#ff23d3 / #71008e)
    const x4 = 16 + Math.cos(-t * 1.1) * 4;
    const y4 = 16 + Math.sin(-t * 1.1) * 4;
    const grad4 = ctx.createRadialGradient(x4, y4, 0, x4, y4, 10);
    grad4.addColorStop(0, "rgba(255, 35, 211, 0.85)");
    grad4.addColorStop(0.6, "rgba(113, 0, 142, 0.45)");
    grad4.addColorStop(1, "rgba(0, 0, 255, 0)");
    ctx.fillStyle = grad4;
    ctx.beginPath();
    ctx.arc(x4, y4, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Subtle crisp rim
    ctx.beginPath();
    ctx.arc(16, 16, 15, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
    ctx.lineWidth = 1;
    ctx.stroke();

    favicon.href = canvas.toDataURL("image/png");
  };

  animFrameId = requestAnimationFrame(render);

  return () => {
    cancelAnimationFrame(animFrameId);
  };
}
