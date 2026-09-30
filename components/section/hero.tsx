"use client";

import  { useEffect, useRef } from "react";
import { motion, cubicBezier } from "motion/react";
import Header from "../ui/header";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!hero || !canvas || !context) return;

    const frameCount = 240;
    const frames: (HTMLImageElement | undefined)[] = new Array(frameCount);
    const pending = new Set<HTMLImageElement>();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let nextFrame = 1;
    let activeLoads = 0;
    let currentFrame = 0;
    let targetFrame = 0;
    let lastFrame: HTMLImageElement | undefined;
    let animationId = 0;
    let previousTime = 0;
    let measureProgress = true;
    let resizeNeeded = true;

    const draw = (frame: HTMLImageElement) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;

      // Match background-size: cover / background-position: center, with a
      // capped backing buffer independent of the wrapper's entrance transform.
      const ratio = Math.min(window.devicePixelRatio || 1, 2, 2048 / Math.max(width, height));
      const bufferWidth = Math.max(1, Math.round(width * ratio));
      const bufferHeight = Math.max(1, Math.round(height * ratio));
      if (canvas.width !== bufferWidth || canvas.height !== bufferHeight) {
        canvas.width = bufferWidth;
        canvas.height = bufferHeight;
      }
      const scale = Math.max(bufferWidth / frame.naturalWidth, bufferHeight / frame.naturalHeight);
      const imageWidth = frame.naturalWidth * scale;
      const imageHeight = frame.naturalHeight * scale;
      // Only replace pixels when a loaded frame is ready, including on resize.
      context.clearRect(0, 0, bufferWidth, bufferHeight);
      context.drawImage(frame, (bufferWidth - imageWidth) / 2, (bufferHeight - imageHeight) / 2, imageWidth, imageHeight);
      lastFrame = frame;
    };

    const tick = (time: number) => {
      animationId = 0;
      if (disposed) return;
      if (measureProgress) {
        const bounds = hero.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -bounds.top / Math.max(1, bounds.height)));
        targetFrame = reducedMotion.matches ? 0 : progress * (frameCount - 1);
        measureProgress = false;
      }
      const elapsed = previousTime ? Math.min(time - previousTime, 64) : 16.67;
      previousTime = time;
      currentFrame = reducedMotion.matches
        ? 0
        : currentFrame + (targetFrame - currentFrame) * (1 - Math.exp(-elapsed / 90));
      if (Math.abs(targetFrame - currentFrame) < 0.01) currentFrame = targetFrame;
      const frame = frames[Math.max(0, Math.min(frameCount - 1, Math.round(currentFrame)))];
      if (frame && (frame !== lastFrame || resizeNeeded)) draw(frame);
      else if (resizeNeeded && lastFrame) draw(lastFrame);
      resizeNeeded = false;
      if (currentFrame !== targetFrame) animationId = requestAnimationFrame(tick);
      else previousTime = 0;
    };

    const schedule = () => {
      if (!disposed && !animationId) animationId = requestAnimationFrame(tick);
    };

    const preload = () => {
      if (disposed || reducedMotion.matches) return;
      while (activeLoads < 4 && nextFrame < frameCount) loadFrame(nextFrame++);
    };

    const loadFrame = (index: number) => {
      const image = new Image();
      activeLoads++;
      pending.add(image);
      image.decoding = "async";
      const finish = (loaded: boolean) => {
        image.onload = null;
        image.onerror = null;
        pending.delete(image);
        activeLoads--;
        if (disposed) return;
        if (loaded && image.naturalWidth && image.naturalHeight) {
          frames[index] = image;
          if (index === 0) draw(image);
          schedule();
        }
        preload();
      };
      image.onload = () => finish(true);
      image.onerror = () => finish(false);
      image.src = `/frames/hand_${String(index + 1).padStart(4, "0")}.webp`;
    };

    const onScroll = () => {
      measureProgress = true;
      schedule();
    };
    const onResize = () => {
      resizeNeeded = true;
      onScroll();
    };
    const onMotionChange = () => {
      if (reducedMotion.matches) {
        currentFrame = targetFrame = 0;
        if (frames[0]) draw(frames[0]);
      } else preload();
      onScroll();
    };
    let pixelRatioQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
    const onPixelRatioChange = () => {
      pixelRatioQuery.removeEventListener("change", onPixelRatioChange);
      pixelRatioQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      pixelRatioQuery.addEventListener("change", onPixelRatioChange);
      onResize();
    };
    const observer = new ResizeObserver(onResize);
    observer.observe(hero);
    observer.observe(canvas);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    reducedMotion.addEventListener("change", onMotionChange);
    pixelRatioQuery.addEventListener("change", onPixelRatioChange);
    // Load and paint the first frame before starting the bounded preload queue.
    loadFrame(0);
    schedule();

    return () => {
      disposed = true;
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      reducedMotion.removeEventListener("change", onMotionChange);
      pixelRatioQuery.removeEventListener("change", onPixelRatioChange);
      pending.forEach((image) => {
        image.onload = null;
        image.onerror = null;
        image.removeAttribute("src");
      });
      pending.clear();
      frames.length = 0;
    };
  }, []);

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.35,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(8px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
  };

  return (
    <div ref={heroRef} className="relative md:max-h-screen overflow-hidden ">
      <Header />

      <main className="relative z-10 ">
        <div className="flex md:min-h-[calc(100vh-100px)] md:max-w-7xl flex-col mb-10 mt-30 md:mb-0 md:mt-0 md:justify-center max-w-[95%] sm:max-w-none mx-auto xl:mx-none">

          {/* Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative z-20 ml-5 w-full max-w-3xl space-y-7 sm:space-y-8"
          >
            <div className="space-y-4 sm:space-y-5">

              {/* Small Label */}
           
              {/* Heading */}
              <motion.h3
                variants={item}
                className="text-5xl font-medium tracking-tight text-white  md:text-6xl lg:text-7xl"
              >
                <motion.span
                  className="block "
                >
                  Spot On Solutions
                </motion.span>

                <motion.span
                  className="block font-thin  text-[#681e99] "
                  whileHover={{ x: 12 }}
                  transition={{ duration: 0.25 }}
                >
                  Portfolio
                </motion.span>
              </motion.h3>

              {/* Description */}
              <motion.p
                variants={item}
                className=" text-md md:max-w-lg md:text-xl  leading-6 text-gray-400 sm:text-base"
              >
              SPOT ON EVERYTIME !!!
              </motion.p>

              {/* Avatar / CTA */}
              
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="
            hidden 
            md:block
              absolute
              inset-x-0
              bottom-0
              -top-20
              z-0
              h-full
              w-full
              opacity-40
              md:right-0
              md:left-auto
              
              md:w-full
                            
              md:opacity-50
              lg:opacity-60
              
              lg:w-1/2
            "
            initial={{
              opacity: 0,
              scale: 1.08,
              x: 80,
            }}
            animate={{
              opacity: 0.6,
              scale: 1,
              x: 0,
            }}
            transition={{
              duration: 1.4,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 35%, black 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 35%, black 100%)",
            }}
          >
            <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
          </motion.div>

          {/* Purple Ambient Glow */}
          {/* <motion.div
            className="pointer-events-none absolute right-[15%] top-[25%] z-0 h-72 w-72 rounded-full bg-[#681e99]/10 blur-[120px]"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.55, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          /> */}

          {/* Bottom Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-10 hidden items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/40 sm:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <motion.span
              className="h-8 w-px bg-white/30"
              animate={{
                scaleY: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            Scroll to explore
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Hero;
