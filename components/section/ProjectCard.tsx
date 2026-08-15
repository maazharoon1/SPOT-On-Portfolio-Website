"use client";

import { CldImage } from "next-cloudinary";
import { AnimatePresence, motion } from "motion/react";
import { ProjectObject } from "@/libs/projectVariable";
import { useEffect, useState } from "react";
import ImagePopup from "../ui/ImagePopup";

function PortfolioCard({ activeTab } : { activeTab : string}) {
  const [popupId, setPopupId] = useState<string | null>(null);

  // Mobile pagination
  const [visibleCount, setVisibleCount] = useState(6);
  const [isDesktop, setIsDesktop] = useState(false);

  const filteredProjects = ProjectObject.filter(
    (project) => activeTab === project.filter
  );

  useEffect(() => {
    const updateViewport = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  // Reset Load More when category changes
  useEffect(() => {
    setVisibleCount(6);
  }, [activeTab]);

  const visibleProjects = isDesktop
    ? filteredProjects
    : filteredProjects.slice(0, visibleCount);

  const hasMore = visibleCount < filteredProjects.length;

  function handleClick(id: string | null) {
    setPopupId(id);
  }

  function handleLoadMore() {
    setVisibleCount((prev) => prev + 4);
  }

  return (
    <div className="w-full">

      <motion.div
        layout
        className="grid w-full grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:gap-5 xl:grid-cols-5"
      >
        {visibleProjects.map((Project, index) => (
          <motion.div
            onClick={() => handleClick(Project.id)}
            key={Project.id || `fallback-${index}`}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{
              duration: 0.25,
              delay: index * 0.03,
              ease: "easeOut",
            }}
            className="w-full min-w-0 will-change-transform"
          >
            <motion.div
              className="
                group
                relative
                w-full
                cursor-pointer
                overflow-hidden
                rounded-lg
                bg-neutral-900
                md:rounded-xl
              "
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >

              {/* Image */}
              <motion.div
                className="relative aspect-[4/5] w-full overflow-hidden md:aspect-square"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <CldImage
                  src={Project.mainImage}
                  alt={Project.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 20vw"
                  quality="auto"
                  format="auto"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </motion.div>

              {/* Dark Gradient */}
              <motion.div
                className="
                  absolute
                  inset-0
                  bg-linear-to-t
                  from-black/90
                  via-black/30
                  to-transparent
                "
                initial={{ opacity: 0.15 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              {/* Purple Glow */}
              <motion.div
                className="
                  pointer-events-none
                  absolute
                  -right-10
                  -top-10
                  h-32
                  w-32
                  rounded-full
                  bg-purple-600/30
                  blur-3xl
                "
                initial={{ opacity: 0.1, scale: 0.85 }}
                whileHover={{ opacity: 1, scale: 1.08 }}
                transition={{ duration: 0.25 }}
              />

              {/* Project Number */}
              <motion.span
                className="
                  absolute
                  left-2
                  top-2
                  z-10
                  text-[9px]
                  font-medium
                  tracking-[0.2em]
                  text-white/50
                  sm:left-3
                  sm:top-3
                  sm:text-[10px]
                "
                initial={{ opacity: 0.7, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
              >
                {String(index + 1).padStart(2, "0")}
              </motion.span>

              {/* Hover Content */}
              <motion.div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  z-10
                  flex
                  items-end
                  justify-between
                  p-2
                  sm:p-3
                  md:p-4
                "
                initial={{ opacity: 0.85, y: 0 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
              >
                <div className="min-w-0 max-w-full rounded-xl bg-black/20 p-2 backdrop-blur-[2px] md:bg-white/4 md:backdrop-blur-sm">
                  <motion.p
                    className="line-clamp-2 font-serif text-sm leading-tight text-white sm:text-base md:text-[15px]"
                    style={
                      Project.color
                        ? { color: Project.color }
                        : undefined
                    }
                  >
                    {Project.title}
                  </motion.p>

                  <p
                    className="mt-1 inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.12em] text-white/80 sm:text-[10px]"
                    style={
                      Project.color
                        ? { color: Project.color }
                        : undefined
                    }
                  >
                    View Full Project
                    <span aria-hidden="true">→</span>
                  </p>
                </div>
              </motion.div>

              {/* Border Glow */}
              <motion.div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  rounded-lg
                  border
                  border-white/0
                  md:rounded-xl
                "
                whileHover={{
                  borderColor: "rgba(168, 85, 247, 0.35)",
                  boxShadow: "inset 0 0 18px rgba(168, 85, 247, 0.06)",
                }}
                transition={{ duration: 0.2 }}
              />

            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile Load More */}
      {hasMore && (
        <motion.div
          className="mt-8 flex justify-center md:hidden"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.button
            onClick={handleLoadMore}
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="
              group
              relative
              overflow-hidden
              rounded-full
              border
              border-white/10
              bg-white/5
              px-7
              py-3
              text-sm
              font-medium
              text-white
              backdrop-blur-md
              transition
              hover:border-purple-500/40
              hover:bg-purple-500/10
            "
          >
            <span className="relative z-10">
              Load More
            </span>

            <motion.span
              className="
                absolute
                inset-0
                -z-0
                bg-linear-to-r
                from-purple-500/0
                via-purple-500/20
                to-purple-500/0
              "
              initial={{
                x: "-100%",
              }}
              whileHover={{
                x: "100%",
              }}
              transition={{
                duration: 0.7,
              }}
            />
          </motion.button>
        </motion.div>
      )}

      {/* Popup */}
      <AnimatePresence>
        {popupId && (
          <ImagePopup
            id={popupId}
            onClose={() => setPopupId(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

export default PortfolioCard;
