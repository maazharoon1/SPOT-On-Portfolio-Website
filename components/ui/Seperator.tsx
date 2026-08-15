"use client";

import { motion } from "motion/react";

interface SeperatorProps {
  className?: string;
}

function Seperator({ className = "" }: SeperatorProps) {
  return (
    <motion.div
      className={`relative flex w-full items-center justify-center ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Main Line */}
      <motion.div
        className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* Center Dots */}
      <motion.div
        className="absolute flex items-center gap-3"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.5,
          duration: 0.5,
          type: "spring",
          stiffness: 200,
        }}
      >
        <motion.span
          className="h-1 w-1 rounded-full bg-purple-400 shadow-[0_0_10px_3px_rgba(168,85,247,0.6)]"
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.span
          className="h-2 w-2 rounded-full border border-purple-400/70 bg-purple-500/20 shadow-[0_0_15px_4px_rgba(168,85,247,0.35)]"
          animate={{
            scale: [1, 1.3, 1],
            boxShadow: [
              "0 0 15px 4px rgba(168,85,247,0.25)",
              "0 0 25px 7px rgba(168,85,247,0.45)",
              "0 0 15px 4px rgba(168,85,247,0.25)",
            ],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.span
          className="h-1 w-1 rounded-full bg-purple-400 shadow-[0_0_10px_3px_rgba(168,85,247,0.6)]"
          animate={{
            opacity: [1, 0.4, 1],
            scale: [1.3, 0.8, 1.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default Seperator;
