"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiMongodb,
  SiPostgresql,
  SiExpress,
  SiNextdotjs,
  SiTailwindcss,
  SiGit,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const skills = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Java", icon: FaJava, color: "#ED8B00" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Express.js", icon: SiExpress, color: "#000000", darkColor: "#FFFFFF" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000", darkColor: "#FFFFFF" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Git", icon: SiGit, color: "#F05032" },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark mode tracking
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Layout constants (must match Tailwind classes)
  const CARD_WIDTH = 192; // w-48
  const GAP_X = 32; // space-x-8
  const ITEM_STRIDE = CARD_WIDTH + GAP_X; // width each item occupies horizontally
  const itemsPerSet = skills.length;

  // Total pixel width of one full set (including gaps; space-x puts no gap after last,
  // but since we align duplicates back-to-back, we include the gap between sets manually).
  const setWidth = useMemo(() => itemsPerSet * ITEM_STRIDE, [itemsPerSet]);

  // Animation speed
  const secondsPerItem = 2; // 2 seconds per item
  const duration = itemsPerSet * secondsPerItem; // time to move by one full set width

  // We render two sets side by side and translateX from 0 to -setWidth continuously.
  // When the first set fully leaves, the second set is exactly in place, making it seamless.
  const duplicated = useMemo(() => [...skills, ...skills], []);

  return (
    <section id="skills" className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0 bg-noise-grid opacity-25"></div>
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="gradient-text mb-6 text-4xl font-bold text-black md:text-5xl">
            Technical Power Level
          </h2>
          <p className="mx-auto max-w-3xl text-xl font-bold text-black">
            Infinite scrolling badges, giant icons, and enough confidence to convince everyone this stack is elite.
          </p>
        </motion.div>

        {/* Seamless Infinite Marquee */}
        <div className="relative overflow-hidden py-2">
          <div className="relative h-36 flex items-center">
            <motion.div
              className="flex"
              style={{
                // Two sets next to each other
                width: `${setWidth * 2}px`,
              }}
              animate={{
                x: [0, -setWidth],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration,
                  ease: "linear",
                },
              }}
            >
              {duplicated.map((skill, index) => {
                const IconComponent = skill.icon;
                const iconColor =
                  skill.darkColor && isDarkMode ? skill.darkColor : skill.color;
                const isLastInSet = (index + 1) % itemsPerSet === 0;

                return (
                  <motion.div
                    key={`${skill.name}-${index}`}
                    className="flex h-32 flex-shrink-0 flex-col items-center justify-center rounded-lg border-4 border-black bg-white shadow-md transition-all duration-300 hover:shadow-lg"
                    style={{
                      width: `${CARD_WIDTH}px`,
                      marginRight: isLastInSet ? `${GAP_X}px` : `${GAP_X}px`,
                    }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <IconComponent
                      className="text-4xl mb-2"
                      style={{ color: iconColor }}
                    />
                    <h3 className="text-center text-sm font-semibold text-black">
                      {skill.name} !!!
                    </h3>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Gradient overlays for smooth edges */}
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-20 bg-gradient-to-r from-yellow-300 to-transparent"></div>
          <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-20 bg-gradient-to-l from-cyan-300 to-transparent"></div>
        </div>

        {/* Skills Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid gap-6 md:grid-cols-4"
        >
          <div className="text-center">
            <h3 className="mb-2 text-lg font-semibold text-black">
              Frontend Wizardry
            </h3>
            <p className="text-sm font-bold text-black">
              React, TypeScript, Tailwind CSS, Next.js
            </p>
          </div>
          <div className="text-center">
            <h3 className="mb-2 text-lg font-semibold text-black">
              Backend Boom
            </h3>
            <p className="text-sm font-bold text-black">
              Node.js, Express.js, Python, Java
            </p>
          </div>
          <div className="text-center">
            <h3 className="mb-2 text-lg font-semibold text-black">
              Data Dungeon
            </h3>
            <p className="text-sm font-bold text-black">
              MongoDB, PostgreSQL, Redis
            </p>
          </div>
          <div className="text-center">
            <h3 className="mb-2 text-lg font-semibold text-black">
              Bonus Loot
            </h3>
            <p className="text-sm font-bold text-black">
              Git, Docker, Figma
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
