import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  Phone, 
  Shield, 
  FileWarning, 
  ArrowRight, 
  ArrowLeft,
  MessageCircle,
  Clock,
  Users,
  ChevronRight,
  Heart,
  Mail
} from 'lucide-react';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=1920",
    title: "24/7 Emergency Response",
    description: "Immediate assistance when you need it most"
  },
  {
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1920",
    title: "Report Violations",
    description: "Help maintain community safety and compliance"
  },
  {
    image: "https://images.unsplash.com/photo-1590402494610-2c378a9114c6?auto=format&fit=crop&q=80&w=1920",
    title: "Professional Support",
    description: "Expert team ready to handle any situation"
  }
];

const services = [
  {
    icon: <AlertTriangle className="w-8 h-8 text-red-500" />,
    title: "Emergency Response",
    description: "24/7 rapid response to critical situations"
  },
  {
    icon: <FileWarning className="w-8 h-8 text-orange-500" />,
    title: "Violation Reporting",
    description: "Easy-to-use system for reporting violations"
  },
  {
    icon: <Shield className="w-8 h-8 text-blue-500" />,
    title: "Community Safety",
    description: "Protecting and serving our community"
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-green-500" />,
    title: "Expert Consultation",
    description: "Professional guidance when you need it"
  }
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Slider */}
      <section className="relative h-[600px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/50 z-10" />
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute inset-0 z-20 flex items-center justify-center text-center"
            >
              <div className="max-w-3xl px-4">
                <h1 className="text-5xl font-bold text-white mb-4">{slides[currentSlide].title}</h1>
                <p className="text-xl text-white/90">{slides[currentSlide].description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 px-8 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors"
                >
                  Report Emergency
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600">Comprehensive emergency and violation management solutions</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center">
              <Clock className="w-12 h-12 mx-auto mb-4 text-red-500" />
              <h3 className="text-4xl font-bold mb-2">24/7</h3>
              <p className="text-gray-400">Emergency Support</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-4xl font-bold mb-2">10,000+</h3>
              <p className="text-gray-400">Community Members</p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <h3 className="text-4xl font-bold mb-2">98%</h3>
              <p className="text-gray-400">Resolution Rate</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">Have an emergency or need to report a violation? Our team is here to help 24/7.</p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-red-500 mr-3" />
                  <span>Emergency: 911</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-blue-500 mr-3" />
                  <span>support@emergency-response.com</span>
                </div>
              </div>
            </div>
            <motion.form
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent"
              ></textarea>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Send Message
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Emergency Response</h3>
              <p className="text-gray-400">Protecting communities, saving lives.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Heart className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Emergency Response. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;