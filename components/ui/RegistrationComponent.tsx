"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function RegistrationComponent() {
  const [isRegistering, setIsRegistering] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Add your registration logic here
    console.log('Registration submitted')
    setIsRegistering(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Your main content goes here */}
      </main>

      {/* Footer with Register Button */}
      <motion.div 
        className="bg-rose-100 py-8 px-4 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-rose-400 text-white px-6 py-3 rounded-xl font-bold text-xl shadow-xl hover:bg-rose-500 transition-colors"
            onClick={() => router.push('/register')}
          >
            <span className="relative z-10">Register Here!</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Registration Modal */}
      {isRegistering && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setIsRegistering(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full relative overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-rose-50 to-transparent"
              animate={{
                x: ["-100%", "100%"],
                opacity: [0, 0.1, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Let's Get Started</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                <input
                  id="name"
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, rotate: [0, 2, -2, 0] }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-rose-500 text-white py-3 rounded-lg font-semibold hover:bg-rose-600 transition-colors relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-white"
                  animate={{
                    x: ["-100%", "100%"],
                    opacity: [0, 0.2, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="relative z-10">Continue</span>
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

