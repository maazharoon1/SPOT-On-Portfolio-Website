"use client";

import React from "react";
import { motion, cubicBezier } from "motion/react";
import Header from "../ui/header";

const Hero = () => {
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
    <div className="relative md:max-h-screen overflow-hidden ">
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
              SPOT ON EVERYWHERE
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
              backgroundImage: "url('/heroImage.jpeg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 35%, black 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 35%, black 100%)",
            }}
          />

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
