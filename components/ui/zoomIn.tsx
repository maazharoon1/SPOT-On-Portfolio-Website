"use client";

import { CldImage } from "next-cloudinary";
import { useRef, useState } from "react";

interface ImageZoomProps {
  src: string;
  alt: string;
}

const ImageZoom = ({ src, alt }: ImageZoomProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const lastTapRef = useRef(0);
  const lastTouchRef = useRef({ x: 0, y: 0 });

  const [isZoomed, setIsZoomed] = useState(false);

  // Desktop mouse zoom position
  const [position, setPosition] = useState({
    x: 50,
    y: 50,
  });

  // Mobile pan position
  const [pan, setPan] = useState({
    x: 0,
    y: 0,
  });

  const isDesktop = () => {
    return window.matchMedia("(min-width: 768px)").matches;
  };

  // -----------------------------
  // DESKTOP
  // -----------------------------

  const handleMouseEnter = () => {
    if (!isDesktop()) return;

    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    if (!isDesktop()) return;

    setIsZoomed(false);

    setPosition({
      x: 50,
      y: 50,
    });
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!isDesktop()) return;

    const container = containerRef.current;

    if (!container) return;

    const rect = container.getBoundingClientRect();

    const rawX =
      ((e.clientX - rect.left) / rect.width) * 100;

    const rawY =
      ((e.clientY - rect.top) / rect.height) * 100;

    setPosition({
      x: 50 + (rawX - 50) * 0.65,
      y: 50 + (rawY - 50) * 0.65,
    });
  };

  // -----------------------------
  // MOBILE DOUBLE TAP
  // -----------------------------

  const handleTouchEnd = (
    e: React.TouchEvent<HTMLDivElement>
  ) => {
    if (isDesktop()) return;

    const now = Date.now();

    const timeSinceLastTap =
      now - lastTapRef.current;

    if (
      timeSinceLastTap < 300 &&
      timeSinceLastTap > 0
    ) {
      e.preventDefault();

      setIsZoomed((prev) => {
        const next = !prev;

        if (!next) {
          setPan({
            x: 0,
            y: 0,
          });
        }

        return next;
      });
    }

    lastTapRef.current = now;
  };

  // -----------------------------
  // MOBILE PAN
  // -----------------------------

  const handleTouchMove = (
    e: React.TouchEvent<HTMLDivElement>
  ) => {
    if (isDesktop() || !isZoomed) return;

    const touch = e.touches[0];

    const currentX = touch.clientX;
    const currentY = touch.clientY;

    const deltaX =
      currentX - lastTouchRef.current.x;

    const deltaY =
      currentY - lastTouchRef.current.y;

    setPan((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));

    lastTouchRef.current = {
      x: currentX,
      y: currentY,
    };
  };

  const handleTouchStart = (
    e: React.TouchEvent<HTMLDivElement>
  ) => {
    if (isDesktop() || !isZoomed) return;

    const touch = e.touches[0];

    lastTouchRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  // -----------------------------
  // IMAGE TRANSFORM
  // -----------------------------

  const transform = isDesktop()
    ? isZoomed
      ? "scale(1.65)"
      : "scale(1)"
    : isZoomed
      ? `scale(1.65) translate(${pan.x / 1.65}px, ${
          pan.y / 1.65
        }px)`
      : "scale(1)";

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden ${
        isZoomed
          ? "cursor-grab active:cursor-grabbing"
          : "cursor-zoom-in"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <CldImage
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 767px) 100vw, 70vw"
        quality="auto"
        format="auto"
        loading="lazy"
        className="object-contain will-change-transform select-none"
        draggable={false}
        style={{
          transform,
          transformOrigin: isDesktop()
            ? `${position.x}% ${position.y}%`
            : "center center",

          transition:
            isDesktop() || !isZoomed
              ? "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)"
              : "none",
        }}
      />
    </div>
  );
};

export default ImageZoom;