"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Code, Database, Smartphone, Users } from "lucide-react"

const highlights = [
  {
    icon: Code,
    title: "Full-Stack Development",
    description: "Proficient in MERN stack with expertise in building scalable web applications",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Creating clean, responsive UIs using React and Tailwind CSS",
  },
  {
    icon: Database,
    title: "Data Structures & Algorithms",
    description: "Continuously improving DSA skills in Python and Java",
  },
  {
    icon: Users,
    title: "Real-World Projects",
    description: "Experience in developing management systems and discussion platforms",
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-800 to-black mx-auto mb-8"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Hello! I'm Gourish Chouhan, a Software Product Engineer with expertise in building scalable,
              user-centric applications. With a strong foundation in the MERN stack, I transform complex
              requirements into elegant, efficient solutions.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              My approach combines technical excellence with user experience design, ensuring every application I build
              is not only functional but also intuitive and performant. I specialize in React and modern JavaScript
              frameworks, with a keen eye for responsive design using Tailwind CSS.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Currently expanding my expertise in Data Structures and Algorithms with Python and Java, while
              continuously working on innovative projects that solve real-world problems and drive business value.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300"
              >
                <highlight.icon className="text-blue-600 mb-4" size={32} />
                <h3 className="text-gray-900 font-semibold mb-2">{highlight.title}</h3>
                <p className="text-gray-600 text-sm">{highlight.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
