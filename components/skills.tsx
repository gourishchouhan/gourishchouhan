"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
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
  SiFigma 
} from "react-icons/si"
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
  { name: "Express.js", icon: SiExpress, color: "#000000" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
]

const duplicatedSkills = [...skills, ...skills]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Technical Skills</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-800 to-black mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Proficient in modern technologies and frameworks for building scalable applications
          </p>
        </motion.div>

        {/* Skills Carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex space-x-8"
            animate={{
              x: [0, -100 * skills.length],
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            style={{ width: `${duplicatedSkills.length * 200}px` }}
          >
            {duplicatedSkills.map((skill, index) => {
              const IconComponent = skill.icon
              return (
                <motion.div
                  key={`${skill.name}-${index}`}
                  className="flex-shrink-0 w-48 h-32 bg-white rounded-lg shadow-md border border-gray-200 flex flex-col items-center justify-center hover:shadow-lg hover:border-blue-300 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <IconComponent 
                    className="text-4xl mb-2" 
                    style={{ color: skill.color }}
                  />
                  <h3 className="text-gray-900 font-semibold text-center">{skill.name}</h3>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Gradient overlays for smooth edges */}
          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
        </div>

        {/* Skills Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid md:grid-cols-4 gap-6"
        >
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Frontend</h3>
            <p className="text-gray-600 text-sm">React, TypeScript, Tailwind CSS, Next.js</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Backend</h3>
            <p className="text-gray-600 text-sm">Node.js, Express.js, Python, Java</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Database</h3>
            <p className="text-gray-600 text-sm">MongoDB, PostgreSQL, Redis</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tools</h3>
            <p className="text-gray-600 text-sm">Git, Docker, AWS, Figma</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}