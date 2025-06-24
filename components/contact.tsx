"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Let&apos;s Connect
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-800 to-black mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to discuss opportunities and bring innovative ideas to life
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              I&apos;m always excited to discuss new opportunities, innovative
              projects, and potential collaborations. Let&apos;s connect and
              explore how we can work together to create something amazing.
            </p>
          </motion.div>

          {/* Contact Information Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <motion.a
              href="mailto:gourish.chouhan@example.com"
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex flex-col items-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:border-gray-400 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <Mail className="text-gray-700 mb-4" size={32} />
              <h3 className="text-gray-900 font-semibold mb-2">Email</h3>
              <p className="text-gray-600 text-center">
                gourish.chouhan@example.com
              </p>
            </motion.a>

            <motion.a
              href="tel:+911234567890"
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex flex-col items-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:border-gray-400 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <Phone className="text-gray-700 mb-4" size={32} />
              <h3 className="text-gray-900 font-semibold mb-2">Phone</h3>
              <p className="text-gray-600 text-center">+91 12345 67890</p>
            </motion.a>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex flex-col items-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:border-gray-400 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <MapPin className="text-gray-700 mb-4" size={32} />
              <h3 className="text-gray-900 font-semibold mb-2">Location</h3>
              <p className="text-gray-600 text-center">India</p>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center space-x-6"
          ></motion.div>
        </div>
      </div>
    </section>
  );
}