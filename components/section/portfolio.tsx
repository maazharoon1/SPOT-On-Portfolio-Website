"use client"

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import PortofolioCard from "./ProjectCard";

const tabs = [
  "Logo Design",
  "Book Cover",
  "Social Media Post ",
  "Packaging",
  "Flyers & Brochures",
  "Brand Guidelines",
  "Motion Graphics",
  // "Stationary",
  // "UI/UX Design",
  // "Illustration",
];

function Portfolio() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const tabRowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const activeButton = tabRefs.current[activeTab];
    const container = tabRowRef.current;

    if (!activeButton || !container) return;

    const buttonLeft = activeButton.offsetLeft;
    const buttonWidth = activeButton.offsetWidth;
    const containerWidth = container.clientWidth;
    const desiredLeft = buttonLeft - containerWidth / 2 + buttonWidth / 2;

    container.scrollTo({
      left: Math.max(0, desiredLeft),
      behavior: "smooth",
    });
  }, [activeTab]);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Ambient Background Glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-20
          -z-10
          h-72
          w-72
          -translate-x-1/2
          rounded-full
          bg-purple-600/10
          blur-[120px]
          opacity-60
        "
      />

      <div className="mx-auto w-full max-w-350 px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="flex flex-col items-start gap-2"
          initial={{
            opacity: 0,
            y: 35,
            filter: "blur(8px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Small Label */}
          <motion.div
            className="mb-2 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-purple-400"
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <span className="h-px w-7 bg-purple-500" />
            Selected Work
          </motion.div>

          <motion.h2
            className="max-w-xl text-2xl leading-tight tracking-tight text-white sm:text-3xl"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Let's Have a Look at My Portfolio
          </motion.h2>

          <motion.p
            className="max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-[15px]"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            A curated collection of visual work across branding,
            illustration, and digital experiences.
          </motion.p>
        </motion.div>

        {/* Tabs */}
  <motion.div
  className="relative mt-6 w-full overflow-hidden"
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ delay: 0.35, duration: 0.35 }}
>
  {/* Tabs */}
  <div
    ref={tabRowRef}
    role="tablist"
    aria-label="Portfolio categories"
    className="
      flex
      w-full
      gap-2
      overflow-x-auto
      pb-2
      scrollbar-none
      [-ms-overflow-style:none]
      [&::-webkit-scrollbar]:hidden
      snap-x
      snap-mandatory
    "
  >
    <div className="flex min-w-max gap-2 px-1">
      {tabs.map((tab, index) => {
        const isActive = tab === activeTab;

        return (
          <motion.button
            ref={(node) => {
              tabRefs.current[tab] = node;
            }}
            key={tab}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${tab}`}
            onClick={() => setActiveTab(tab)}
            className={`
              relative
              shrink-0
              snap-start
              whitespace-nowrap
              overflow-hidden
              rounded-full
              border
              px-4
              py-2
              text-xs
              font-medium
              sm:px-5
              sm:py-2.5
              sm:text-sm

              ${
                isActive
                  ? "border-purple-500/40 text-white"
                  : "border-transparent text-white/50 hover:border-white/10 hover:text-white"
              }
            `}
            whileHover={{
              y: -2,
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.94,
            }}
          >
            {isActive && (
              <motion.span
                layoutId="activePortfolioTab"
                className="
                  absolute
                  inset-0
                  z-0
                  rounded-full
                  border
                  border-purple-500/30
                  bg-purple-500/10
                  shadow-[0_0_25px_rgba(168,85,247,0.12)]
                "
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}

            {!isActive && (
              <motion.span
                className="
                  absolute
                  inset-0
                  rounded-full
                  bg-white/5
                "
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            )}

            <span className="relative z-10">
              {tab}
            </span>
          </motion.button>
        );
      })}
    </div>
  </div>

  {/* Mobile scroll indicator */}
  <div className="mt-2 flex justify-center sm:hidden">
    <div className="relative h-[2px] w-20 overflow-hidden rounded-full bg-white/10">
      <motion.div
        className="
          absolute
          left-0
          top-0
          h-full
          w-8
          rounded-full
          bg-purple-400/70
        "
        animate={{
          x: [0, 48, 0],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  </div>

  {/* Right fade — indicates more tabs */}
  <div
    className="
      pointer-events-none
      absolute
      right-0
      top-0
      h-[calc(100%-18px)]
      w-10
      bg-gradient-to-l
      from-[#0a0a0f]
      to-transparent
      sm:hidden
    "
  />
</motion.div>

        {/* Portfolio Cards */}
        <motion.div
          className="mt-5 w-full"
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          transition={{
            delay: 0.5,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.35,
              }}
            >
              <PortofolioCard activeTab={activeTab} />
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}

export default Portfolio;