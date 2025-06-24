"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "Task Management System",
    description:
      "A comprehensive task management application built with React, Node.js, and MongoDB. Features include user authentication, real-time updates, and collaborative workspaces.",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Tailwind CSS"],
    github: "https://github.com/gourishchouhan/task-management",
    demo: "https://task-management-demo.vercel.app",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    title: "Discussion Platform",
    description:
      "A modern discussion platform similar to Reddit, featuring threaded conversations, voting system, and user profiles. Built with the MERN stack.",
    technologies: ["React", "Express.js", "MongoDB", "JWT", "Redux"],
    github: "https://github.com/gourishchouhan/discussion-platform",
    demo: "https://discussion-platform-demo.vercel.app",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    title: "E-Commerce Dashboard",
    description:
      "An admin dashboard for e-commerce management with analytics, inventory tracking, and order management. Features responsive design and data visualization.",
    technologies: ["React", "Chart.js", "Node.js", "PostgreSQL", "Material-UI"],
    github: "https://github.com/gourishchouhan/ecommerce-dashboard",
    demo: "https://ecommerce-dashboard-demo.vercel.app",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    title: "Weather App",
    description:
      "A beautiful weather application with location-based forecasts, interactive maps, and detailed weather information. Built with React and integrated with weather APIs.",
    technologies: ["React", "OpenWeather API", "Mapbox", "Tailwind CSS"],
    github: "https://github.com/gourishchouhan/weather-app",
    demo: "https://weather-app-demo.vercel.app",
    image: "/placeholder.svg?height=300&width=500",
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-800 to-black mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Showcasing innovative solutions and technical expertise through real-world applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-200 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 font-medium"
                  >
                    <Github size={16} />
                    <span>Code</span>
                  </motion.a>
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-gray-700 text-white rounded-lg transition-colors duration-200 font-medium"
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
