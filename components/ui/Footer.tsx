
"use client";

import { useScrollTo } from "@/libs/scroll";
import { motion } from "motion/react";

export function Footer() {
  const { scrollToSection } = useScrollTo();

  const socials = [
    { label: "Instagram", href: "#" },
    { label: "Twitter / X", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Dribbble", href: "#" },
  ];

  return (
    <footer className="mx-auto max-w-[1600px] px-5 pb-14 sm:px-8 lg:px-12">
      <motion.div
        className="grid gap-10 pt-10 lg:grid-cols-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 40 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Main CTA */}
        <motion.div
          className="lg:col-span-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <motion.p
            className="label-xs text-fuchsia-100"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            LET&apos;S WORK TOGETHER
          </motion.p>

          <motion.a
            href="mailto:hello@example.com"
            className="group mt-4 inline-block font-display text-fuchsia-100 hover:text-white text-[clamp(1.75rem,4.5vw,3.25rem)] leading-none tracking-[-0.02em]"
            whileHover={{ x: 6 }}
            transition={{ duration: 0.25 }}
          >
            <span className="relative">
              hello@example.com

              <motion.span
                className="absolute -bottom-1.5 left-0 h-px bg-primary"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </span>
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.nav
          aria-label="Social"
          className="lg:col-span-3"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 25 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <ul className="space-y-3">
            {socials.map((social, index) => (
              <motion.li
                key={social.label}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.25 + index * 0.08,
                }}
              >
                <motion.a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="label-xs inline-flex items-center gap-2 text-fuchsia-100 transition-colors hover:text-white"
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full bg-primary opacity-0"
                    whileHover={{ opacity: 1, scale: 1.4 }}
                  />

                  {social.label}
                </motion.a>
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        {/* Company Info */}
        <motion.div
          className="label-xs space-y-2 ml-5 md:mt-5  text-fuchsia-100 lg:col-span-3"
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 25 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
     

        

          <motion.p whileHover={{ x: 4 }}>
            © {new Date().getFullYear()} ZAIN 
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Bottom Decorative Line */}
      <motion.div
        className="mt-16 h-px origin-left bg-border"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.2,
          delay: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* Bottom Text */}
      <motion.div
        className="mt-5 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-fuchsia-100"
        initial={{ opacity: 0.4 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >

        <motion.span
          animate={{ y: [0, -3, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          id="home"
          onClick={()=> scrollToSection("home")}
        >
          ↑ Back to top
        </motion.span>
      </motion.div>
    </footer>
  );
}