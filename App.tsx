import React, { useState } from 'react';
import { motion, useViewportScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Bot, Heart, MessageCircle, Phone, Shield, Stethoscope, Pill, Syringe, CircuitBoard, Cross, Thermometer, Microscope, LigatureIcon as Bandage, Dna } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { EmergencyChat } from './emergency-chat';

function FloatingBubble({ delay = 0, size = 100, left = "50%" }) {
  return (
    <motion.div
      initial={{ y: "110vh", opacity: 0 }}
      animate={{ 
        y: "-10vh",
        opacity: [0, 1, 1, 0],
        x: ["0vw", "5vw", "-5vw", "0vw"]
      }}
      transition={{ 
        duration: 15,
        repeat: Infinity,
        delay,
        ease: "linear",
        times: [0, 0.2, 0.8, 1],
        x: {
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      className="absolute pointer-events-none"
      style={{
        left,
        width: size,
        height: size,
        borderRadius: "50%",
        background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))"
      }}
    />
  );
}

function FloatingIcon({ Icon, delay = 0, size = 40, left = "50%", top = "50%" }) {
  const animationVariants = [
    {
      opacity: [0.2, 0.5, 0.2],
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0]
    },
    {
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 0.8, 1],
      y: [0, -10, 0]
    },
    {
      opacity: [0.4, 0.7, 0.4],
      scale: [1, 1.1, 0.9, 1],
      x: [0, 10, -10, 0]
    }
  ];

  const selectedVariant = animationVariants[Math.floor(Math.random() * animationVariants.length)];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={selectedVariant}
      transition={{ 
        duration: 8,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
      className="absolute text-rose-200 pointer-events-none"
      style={{
        left,
        top,
      }}
    >
      <Icon size={size} />
    </motion.div>
  );
}

function BackgroundGradient() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      animate={{
        background: [
          "radial-gradient(circle at 0% 0%, rgba(254, 226, 226, 0.4) 0%, transparent 50%)",
          "radial-gradient(circle at 100% 100%, rgba(254, 226, 226, 0.4) 0%, transparent 50%)",
          "radial-gradient(circle at 0% 100%, rgba(254, 226, 226, 0.4) 0%, transparent 50%)",
          "radial-gradient(circle at 100% 0%, rgba(254, 226, 226, 0.4) 0%, transparent 50%)",
          "radial-gradient(circle at 0% 0%, rgba(254, 226, 226, 0.4) 0%, transparent 50%)",
        ]
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
}

function App() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showEmergencyChat, setShowEmergencyChat] = useState(false);
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const medicalIcons = [
    { Icon: Stethoscope, delay: 0, size: 48, left: "10%", top: "20%" },
    { Icon: Pill, delay: 5, size: 36, left: "20%", top: "60%" },
    { Icon: Syringe, delay: 2, size: 42, left: "80%", top: "30%" },
    { Icon: CircuitBoard, delay: 7, size: 40, left: "70%", top: "70%" },
    { Icon: Cross, delay: 3, size: 44, left: "30%", top: "40%" },
    { Icon: Heart, delay: 6, size: 38, left: "90%", top: "50%" },
    { Icon: Thermometer, delay: 1, size: 46, left: "15%", top: "80%" },
    { Icon: Microscope, delay: 4, size: 50, left: "85%", top: "15%" },
    { Icon: Bandage, delay: 8, size: 40, left: "40%", top: "75%" },
    { Icon: Dna, delay: 3, size: 52, left: "60%", top: "10%" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "24/7 Chat Support",
      description: "Always here to listen and help, any time of day or night"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safe Space",
      description: "A judgment-free environment where you can be yourself"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Compassionate Care",
      description: "A well trained AI made specially to help you in your time of need"
    }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <BackgroundGradient />
      <FloatingBubble delay={0} size={200} left="20%" />
      <FloatingBubble delay={5} size={150} left="40%" />
      <FloatingBubble delay={2} size={180} left="60%" />
      <FloatingBubble delay={7} size={160} left="80%" />

      {/* Floating Medical Icons */}
      {medicalIcons.map((icon, index) => (
        <FloatingIcon key={index} {...icon} />
      ))}

      {/* Emergency Button */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed top-4 right-4 z-40"
      >
        <motion.button
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95, rotate: -5 }}
          className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-red-700 transition-colors flex items-center gap-2 relative overflow-hidden group"
          onClick={() => setShowEmergencyChat(true)}
        >
          <motion.div
            className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
            animate={{ scale: [1, 1.5], opacity: [0.1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <Phone className="w-5 h-5" />
          Emergency Help !
        </motion.button>
      </motion.div>

      {/* Emergency Chat Modal */}
      <AnimatePresence>
        {showEmergencyChat && (
          <EmergencyChat onClose={() => setShowEmergencyChat(false)} />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative z-10 space-y-8"
      >
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-full p-8 mb-8 shadow-xl relative"
          whileHover={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-rose-200"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <Bot className="w-16 h-16 text-rose-500 relative z-10" />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl font-bold text-gray-800 mb-4 text-center"
          whileHover={{ scale: 1.05 }}
        >
           I'm Bertha
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-800 mb-4 text-center max-w-2xl"
        >
          Your very own AI medical assistant.
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-800 mb-8 text-center max-w-2xl"
        >
          Tell me a little about yourself & we can get right into easing all your medical worries :)
        </motion.p>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
          whileTap={{ scale: 0.95 }}
          className="bg-rose-500 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-xl hover:bg-rose-600 transition-all duration-300 relative overflow-hidden mb-12"
          onClick={() => {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth'
            });
          }}
        >
          <span className="relative z-10">SCROLL DOWN TO REGISTER ;)</span>
        </motion.button>
      </motion.div>
      

      {/* Features Section */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="bg-white py-20 px-4 relative z-10"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02, rotate: [0, 2, -2, 0] }}
              className="bg-rose-50 p-8 rounded-2xl shadow-lg text-center relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                animate={{
                  x: ["-100%", "100%"],
                  opacity: [0, 0.3, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: "easeInOut"
                }}
              />
              <div className="bg-rose-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4 text-rose-500 relative">
                <motion.div
                  className="absolute inset-0 rounded-full bg-rose-200"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: "easeInOut"
                  }}
                />
                <div className="relative z-10">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      
import React, { useState } from "react";
import { motion } from "framer-motion";
import RegistrationComponent from "./components/ui/RegistrationComponent"; // Adjust the import path as needed

const App = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <BackgroundGradient />
      <FloatingBubble delay={0} size={200} left="20%" />
      
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
            onClick={() => setIsRegistering(true)}
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsRegistering(false)}
            >
              &times;
            </button>
            <RegistrationComponent />
          </div>
        </motion.div>
      )}
    </div>
  );