"use client"

import React from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
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
  SiGit 
} from "react-icons/si"
import { FaJava } from "react-icons/fa"

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
]

// Create multiple copies for seamless infinite scroll
const duplicatedSkills = [...skills, ...skills, ...skills]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Check for dark mode
  React.useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    }
    
    checkDarkMode()
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="py-20 bg-secondary-50 dark:bg-secondary-800">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Technical Skills</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Proficient in modern technologies and frameworks for building scalable applications
          </p>
        </motion.div>

        {/* Skills Carousel */}
        <div className="relative overflow-hidden py-2">
          {/* Skills Container */}
          <div className="relative h-36 flex items-center">
            <motion.div
              className="flex space-x-8"
              animate={{
                x: [0, -(skills.length * 208)]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: skills.length * 2, // 2 seconds per skill
                  ease: "linear"
                }
              }}
              style={{ 
                width: `${duplicatedSkills.length * 208}px`
              }}
            >
              {duplicatedSkills.map((skill, index) => {
                const IconComponent = skill.icon
                const iconColor = skill.darkColor && isDarkMode ? skill.darkColor : skill.color
                
                return (
                  <motion.div
                    key={`${skill.name}-${index}`}
                    className="flex-shrink-0 w-48 h-32 bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center hover:shadow-lg hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <IconComponent 
                      className="text-4xl mb-2" 
                      style={{ color: iconColor }}
                    />
                    <h3 className="text-gray-900 dark:text-white font-semibold text-center text-sm">{skill.name}</h3>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Gradient overlays for smooth edges */}
          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-secondary-50 dark:from-secondary-800 to-transparent pointer-events-none z-5"></div>
          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-secondary-50 dark:from-secondary-800 to-transparent pointer-events-none z-5"></div>
        </div>

        {/* Skills Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid md:grid-cols-4 gap-6"
        >
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Frontend</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">React, TypeScript, Tailwind CSS, Next.js</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Backend</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Node.js, Express.js, Python, Java</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Database</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">MongoDB, PostgreSQL, Redis</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tools</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Git, Docker, VS Code</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}