"use client";

import { CldImage } from "next-cloudinary";
import { useEffect, useRef, useState } from "react";

interface ImageZoomProps {
  src: string;
  alt: string;
}

const ImageZoom = ({ src, alt }: ImageZoomProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const targetPosition = useRef({
    x: 50,
    y: 50,
  });

  const currentPosition = useRef({
    x: 50,
    y: 50,
  });

  const [isZoomed, setIsZoomed] = useState(false);

  const animate = () => {
    const current = currentPosition.current;
    const target = targetPosition.current;

    // Smoothing factor
    const ease = 0.08;

    current.x += (target.x - current.x) * ease;
    current.y += (target.y - current.y) * ease;

    setPosition({
      x: current.x,
      y: current.y,
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  const [position, setPosition] = useState({
    x: 50,
    y: 50,
  });

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const container = containerRef.current;

    if (!container) return;

    const rect = container.getBoundingClientRect();

    const rawX =
      ((e.clientX - rect.left) / rect.width) * 100;

    const rawY =
      ((e.clientY - rect.top) / rect.height) * 100;

    // Reduce sensitivity
    const sensitivity = 0.65;

    const x =
      50 + (rawX - 50) * sensitivity;

    const y =
      50 + (rawY - 50) * sensitivity;

    targetPosition.current = {
      x,
      y,
    };
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);

    // Smoothly return image to center
    targetPosition.current = {
      x: 50,
      y: 50,
    };
  };

  return (
    <div
      ref={containerRef}
      className="
        relative
        h-full
        w-full
        overflow-hidden
        cursor-zoom-in
      "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <CldImage
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 70vw"
        quality="75"
        className="
          object-contain
          will-change-transform
        "
        style={{
          transform: isZoomed
            ? "scale(1.65)"
            : "scale(1)",

          transformOrigin: `${position.x}% ${position.y}%`,

          transition:
            "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </div>
  );
};

export default ImageZoom;