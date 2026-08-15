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

  const filteredProjects = ProjectObject.filter(
    (project) => activeTab === project.filter
  );

  // Reset Load More when category changes
  useEffect(() => {
    setVisibleCount(6);
  }, [activeTab]);

  const visibleProjects =
  typeof window !== "undefined" && window.innerWidth >= 768
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
        className="grid w-full grid-cols-2 gap-3 md:grid-cols-3 lg:gap-5 xl:grid-cols-5"
      >
        {visibleProjects.map((Project, index) => (
          <motion.div
            onClick={() => handleClick(Project.id)}
            key={Project.id || `fallback-${index}`}
            layout
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.9,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              filter: "blur(8px)",
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              className="
                group
                relative
                aspect-square
                w-full
                cursor-pointer
                overflow-hidden
                rounded-xl
                bg-neutral-900
              "
              whileHover={{
                y: -8,
                scale: 1.025,
              }}
              whileTap={{
                scale: 0.97,
              }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              {/* Image */}
              <motion.div
                className="absolute inset-0"
                whileHover={{
                  scale: 1.08,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <CldImage
                  src={Project.mainImage}
                  alt={Project.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 20vw"
                  quality="75"
                  className=""
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
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
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
                initial={{ opacity: 0, scale: 0.5 }}
                whileHover={{
                  opacity: 1,
                  scale: 1.2,
                }}
                transition={{ duration: 0.5 }}
              />

              {/* Project Number */}
              <motion.span
                className="
                  absolute
                  left-3
                  top-3
                  z-10
                  text-[10px]
                  font-medium
                  tracking-[0.2em]
                  text-white/50
                "
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.06 + 0.2,
                }}
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
                  p-4
                  sm:p-5
                "
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileHover={{
                  opacity: 1,
                  y: 0,
                }}
              >
                <div className="z-100 rounded-2xl p-2 md:bg-white/4 md:backdrop-blur-sm">

                  <motion.p
                    className="font-serif text-white"
                    style={
                      Project.color
                        ? { color: Project.color }
                        : undefined
                    }
                  >
                    {Project.title}
                  </motion.p>

                  <p
                    className="mt-1 text-xs text-white uppercase "
                    style={
                      Project.color
                        ? { color: Project.color }
                        : undefined
                    }
                  >
                    View Full Project
                  </p>

                </div>
              </motion.div>

              {/* Border Glow */}
              <motion.div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  rounded-xl
                  border
                  border-white/0
                "
                whileHover={{
                  borderColor: "rgba(168, 85, 247, 0.45)",
                  boxShadow:
                    "inset 0 0 25px rgba(168, 85, 247, 0.08), 0 10px 40px rgba(0,0,0,0.35)",
                }}
                transition={{ duration: 0.4 }}
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
