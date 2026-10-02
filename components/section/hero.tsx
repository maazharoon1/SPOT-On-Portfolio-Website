"use client";

import  { useEffect, useRef } from "react";
import { motion, cubicBezier } from "motion/react";
import Header from "../ui/header";

const Hero = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!track || !hero || !canvas || !context) return;

    const frameCount = 240;
    const frames: (HTMLImageElement | undefined)[] = new Array(frameCount);
    const pending = new Set<HTMLImageElement>();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pinEnabled = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    // Fetch the release frame early as well as the start of the sequence.
    const preloadOrder = [frameCount - 1, ...Array.from({ length: frameCount - 2 }, (_, index) => index + 1)];
    let disposed = false;
    let nextFrame = 0;
    let activeLoads = 0;
    let currentFrame = 0;
    let targetFrame = 0;
    let lastFrame: HTMLImageElement | undefined;
    let animationId = 0;
    let previousTime = 0;
    let measureProgress = true;
    let resizeNeeded = true;
    const overflowOverrides: { element: HTMLElement; value: string; priority: string }[] = [];

    const restoreOverflow = () => {
      overflowOverrides.forEach(({ element, value, priority }) => {
        if (value) element.style.setProperty("overflow-x", value, priority);
        else element.style.removeProperty("overflow-x");
      });
      overflowOverrides.length = 0;
    };

    const configurePin = () => {
      restoreOverflow();
      if (!pinEnabled.matches) return;
      // overflow-x: hidden implicitly creates a vertical scroll container,
      // trapping sticky positioning. Clip the same edges without doing so.
      for (let ancestor = track.parentElement; ancestor; ancestor = ancestor.parentElement) {
        const style = getComputedStyle(ancestor);
        if (style.overflowX === "hidden" && style.overflowY === "auto") {
          overflowOverrides.push({
            element: ancestor,
            value: ancestor.style.getPropertyValue("overflow-x"),
            priority: ancestor.style.getPropertyPriority("overflow-x"),
          });
          ancestor.style.setProperty("overflow-x", "clip");
        }
      }
    };

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
        const bounds = track.getBoundingClientRect();
        // The extra track height is exactly the sticky travel distance. The
        // hero's own height and its release are excluded from frame progress.
        const pinDistance = bounds.height - hero.getBoundingClientRect().height;
        const progress = Math.max(0, Math.min(1, -bounds.top / Math.max(1, pinDistance)));
        targetFrame = pinEnabled.matches ? progress * (frameCount - 1) : 0;
        measureProgress = false;
      }
      const elapsed = previousTime ? Math.min(time - previousTime, 64) : 16.67;
      previousTime = time;
      // Resolve the endpoints immediately so frame 240 stays fixed on release.
      currentFrame = targetFrame === 0 || targetFrame === frameCount - 1
        ? targetFrame
        : currentFrame + (targetFrame - currentFrame) * (1 - Math.exp(-elapsed / 65));
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
      if (disposed || !pinEnabled.matches) return;
      while (activeLoads < 4 && nextFrame < preloadOrder.length) loadFrame(preloadOrder[nextFrame++]);
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
      configurePin();
      if (!pinEnabled.matches) {
        currentFrame = targetFrame = 0;
        if (frames[0]) draw(frames[0]);
      } else preload();
      onResize();
    };
    let pixelRatioQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
    const onPixelRatioChange = () => {
      pixelRatioQuery.removeEventListener("change", onPixelRatioChange);
      pixelRatioQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      pixelRatioQuery.addEventListener("change", onPixelRatioChange);
      onResize();
    };
    const observer = new ResizeObserver(onResize);
    configurePin();
    observer.observe(track);
    observer.observe(hero);
    observer.observe(canvas);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    reducedMotion.addEventListener("change", onMotionChange);
    pinEnabled.addEventListener("change", onMotionChange);
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
      pinEnabled.removeEventListener("change", onMotionChange);
      pixelRatioQuery.removeEventListener("change", onPixelRatioChange);
      restoreOverflow();
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
    <div ref={trackRef} className="relative">
    <div ref={heroRef} className="relative md:motion-safe:sticky md:motion-safe:top-0 md:max-h-screen overflow-hidden ">
      <Header />

      <main className="relative z-10 ">
        <div className="flex md:min-h-[calc(100vh-90px)] md:max-w-7xl flex-col mb-10 mt-30 md:mb-0 md:mt-0 md:justify-center max-w-[95%] sm:max-w-none mx-auto md:mx-0 lg:mx-12 ">

          {/* Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative z-20 w-full max-w-3xl space-y-7 sm:space-y-8 px-5 lg:px-0"
          >
            <div className="space-y-4 sm:space-y-5">

              {/* Small Label */}
           
              {/* Heading */}
              <motion.h3
                variants={item}
                className="text-5xl font-medium tracking-tight text-white  md:text-5xl lg:text-6xl 2xl:text-7xl"
              >
                <motion.span
                  className="block"
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
                className=" text-md md:max-w-lg md:text-xl leading-6 text-gray-400 sm:text-base"
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
              h-99vh
              w-full
              opacity-40
              md:right-0
              md:left-auto
              
              md:w-full
                            
              md:opacity-50
              lg:opacity-60
              
              lg:w-[65%]
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
       

     
        </div>
      </main>
    </div>
    <div aria-hidden="true" className="hidden h-[150vh] md:motion-safe:block" />
    </div>
  );
};

export default Hero;
