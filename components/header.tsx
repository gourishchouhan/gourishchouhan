"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X, Download } from "lucide-react"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Desktop Centered Oval Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300 hidden md:block ${
          scrolled ? "top-2" : "top-6"
        }`}
      >
        <nav
          className={`bg-white/95 backdrop-blur-md shadow-lg border border-gray-200 rounded-full px-8 py-4 transition-all duration-300 ${
            scrolled ? "shadow-xl" : ""
          }`}
        >
          <div className="flex items-center space-x-8">
            {/* Navigation Items */}
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium text-sm"
              >
                {item.name}
              </motion.button>
            ))}

            {/* Resume Button */}
            <motion.a
              href="/resume.pdf"
              download="Gourish_Chouhan_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-gray-700 text-white font-medium rounded-full transition-all duration-200 shadow-sm text-sm"
            >
              <Download size={16} />
              <span>Resume</span>
            </motion.a>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 md:hidden ${
          scrolled ? "bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200" : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 pb-4 bg-white rounded-lg shadow-lg border border-gray-200"
            >
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left py-3 px-4 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
              <div className="px-4 pt-2">
                <a
                  href="/resume.pdf"
                  download="Gourish_Chouhan_Resume.pdf"
                  className="flex items-center justify-center space-x-2 w-full px-4 py-2 bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-gray-800 text-white font-medium rounded-lg transition-all duration-200"
                >
                  <Download size={16} />
                  <span>Download Resume</span>
                </a>
              </div>
            </motion.div>
          )}
        </nav>
      </motion.header>
    </>
  )
}