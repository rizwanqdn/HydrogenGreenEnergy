"use client";

import { useEffect } from "react";

export default function AnimatedFavicon() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    let angle = 0;
    let timer: ReturnType<typeof setInterval> | null = null;

    const draw = () => {
      ctx.clearRect(0, 0, 64, 64);

      // Navy rounded badge
      ctx.fillStyle = "#0b1f33";
      ctx.beginPath();
      ctx.roundRect(0, 0, 64, 64, 14);
      ctx.fill();

      // Subtle orbital ring
      ctx.strokeStyle = "rgba(255,255,255,0.22)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(32, 32, 24, 0, Math.PI * 2);
      ctx.stroke();

      // Green H atom
      ctx.fillStyle = "#2f9e6f";
      ctx.beginPath();
      ctx.arc(25, 32, 11.5, 0, Math.PI * 2);
      ctx.fill();

      // Red Japan atom
      ctx.fillStyle = "#c8102e";
      ctx.beginPath();
      ctx.arc(39, 32, 11.5, 0, Math.PI * 2);
      ctx.fill();

      // White bond overlap
      ctx.save();
      ctx.beginPath();
      ctx.arc(25, 32, 11.5, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(39, 32, 11.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Orbiting electron
      const ex = 32 + Math.cos(angle) * 24;
      const ey = 32 + Math.sin(angle) * 24;
      ctx.fillStyle = "#2f9e6f";
      ctx.beginPath();
      ctx.arc(ex, ey, 4.2, 0, Math.PI * 2);
      ctx.fill();

      link!.type = "image/png";
      link!.href = canvas.toDataURL("image/png");
      angle = (angle + 0.22) % (Math.PI * 2);
    };

    const start = () => {
      if (!timer) {
        draw();
        timer = setInterval(draw, 110);
      }
    };

    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const onVisibility = () => (document.hidden ? stop() : start());
    start();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return null;
}
