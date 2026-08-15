"use client";

import { useScrollTo } from "@/libs/scroll";
import { motion } from "motion/react";

const navItems = [
  { name: "Home", id: "home" },
  { name: "Portfolio", id: "portfolio" },
];

const Header = () => {
  const { scrollToSection } = useScrollTo();

  return (
    <header className="relative top-7 left-10">
      <motion.div
        className="flex items-center gap-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Logo */}
        <motion.button
          onClick={() => scrollToSection("home")}
          className="rounded-2xl border bg-black backdrop-blur-3xl border-white/10 md:bg-black/5 px-6 py-3  transition-all duration-300 hover:border-purple-500/30 hover:bg-black/10"
          initial={{ opacity: 0, scale: 0.8, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            delay: 0.15,
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{
            scale: 1.05,
            y: -2,
            boxShadow: "0 10px 30px rgba(168, 85, 247, 0.15)",
          }}
          whileTap={{
            scale: 0.95,
          }}
        >
          <motion.span
            className="text-xl font-light tracking-[0.25em] text-white"
           
          >
            ZAIN
          </motion.span>
        </motion.button>

        {/* Navigation */}
        <motion.nav
          className="hidden md:block items-center rounded-3xl border border-white/10 z-100 bg-black/5 p-2 backdrop-blur-3xl shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
          initial={{ opacity: 0, x: -30, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {navItems.map((item, index) => (
            <motion.button
              key={item.name}
              onClick={() => scrollToSection(item.id)}
              className={`rounded-2xl px-6 py-3 text-sm mx-1 font-medium transition-all duration-300 cursor-pointer ${
                index === 0
                  ? "bg-white/10 text-white shadow-inner"
                  : "text-purple-400 hover:bg-white/10 hover:text-purple-500"
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.45 + index * 0.12,
                duration: 0.5,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.05,
                y: -2,
              }}
              whileTap={{
                scale: 0.92,
              }}
            >
              {item.name}
            </motion.button>
          ))}
        </motion.nav>
      </motion.div>
    </header>
  );
};

export default Header;