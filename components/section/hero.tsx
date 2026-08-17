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
    <div className="relative md:min-h-screen overflow-hidden ">
      <Header />

      <main className="relative z-10 px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-20">
        <div className="mx-auto flex md:min-h-[calc(100vh-100px)] max-w-7xl flex-col mb-10 mt-30 md:mb-0 md:mt-0 md:justify-center">

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
                  className="block font-thin  text-purple-400/80 "
                  whileHover={{ x: 12 }}
                  transition={{ duration: 0.25 }}
                >
                  Portfolio
                </motion.span>
              </motion.h3>

              {/* Description */}
              <motion.p
                variants={item}
                className="max-w-lg text-xl leading-6 text-gray-400 sm:text-base"
              >
                Visual identities, illustration and digital experiences
                crafted with precision.
              </motion.p>

              {/* Avatar / CTA */}
              <motion.div
                variants={item}
                className="flex items-center gap-3 pt-2"
              >
                <div className="flex -space-x-3">

                  {[1, 2, 3].map((avatar, index) => (
                    <motion.img
                      key={avatar}
                      src="https://placehold.co/40x40"
                      alt="Client"
                      className="h-9 w-9 rounded-full border-2 border-[#0a0a0f] object-cover sm:h-10 sm:w-10"
                      initial={{
                        opacity: 0,
                        scale: 0,
                        x: -10,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 1 + index * 0.12,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 180,
                      }}
                      whileHover={{
                        y: -6,
                        scale: 1.12,
                        zIndex: 10,
                      }}
                    />
                  ))}

                  {/* Arrow Button */}
                  <motion.button
                    className="group relative h-9 w-9 rounded-full border border-white/20 bg-black/20 backdrop-blur-2xl transition-all duration-300 hover:border-purple-800/30 hover:bg-black/40 sm:h-10 sm:w-10"
                    aria-label="View portfolio"
                    initial={{
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      delay: 1.4,
                      duration: 0.5,
                      type: "spring",
                    }}
                    whileHover={{
                      scale: 1.15,
                      rotate: 45,
                      borderColor: "rgba(168, 85, 247, 0.6)",
                      boxShadow:
                        "0 0 25px rgba(168, 85, 247, 0.25)",
                    }}
                    whileTap={{
                      scale: 0.9,
                    }}
                  >
                    <span className="text-sm font-light tracking-[0.25em] text-white">
                      →
                    </span>
                  </motion.button>
                </div>
              </motion.div>
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
          <motion.div
            className="pointer-events-none absolute right-[15%] top-[25%] z-0 h-72 w-72 rounded-full bg-purple-700/10 blur-[120px]"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.55, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

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
