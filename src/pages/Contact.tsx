
import { motion } from "framer-motion";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Mail, Github, Linkedin, Phone, MapPin, Send } from "lucide-react";
import GlassCard from "../components/GlassCard";
import { usePersonalInfo } from "../hooks/usePersonalInfo";
import { supabase } from "@/integrations/supabase/client";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";

const Contact = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.3 });
  const [formRef, formInView] = useInView({ threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { data: personalInfo, isLoading } = usePersonalInfo();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log("Submitting contact form:", formData);
      
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });
      
      if (error) {
        console.error("Error sending email:", error);
        alert("Failed to send message. Please try again or contact me directly via email.");
      } else {
        console.log("Email sent successfully:", data);
        alert("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message. Please try again or contact me directly via email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <DotLottieReact
            src="https://lottie.host/206cf556-6aab-4cc8-aa2d-7598ec0fbedc/jvDXSqpSNx.lottie"
            loop
            autoplay
            className="size-2/3"
        />
      </div>
    );
  }

  if (!personalInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-white text-xl">Failed to load contact information</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-16"
    >
      {/* Hero Section */}
      <section ref={heroRef} className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Ready to collaborate on your next project? Let's discuss how we can bring your ideas to life.
          </p>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {personalInfo.email && (
              <motion.a
                href={`mailto:${personalInfo.email}`}
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <GlassCard className="text-center cursor-pointer p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full">
                      <Mail size={24} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                  <p className="text-gray-300 text-sm">{personalInfo.email}</p>
                </GlassCard>
              </motion.a>
            )}

            {personalInfo.phone && (
              <motion.a
                href={`tel:${personalInfo.phone}`}
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <GlassCard className="text-center cursor-pointer p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full">
                      <Phone size={24} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
                  <p className="text-gray-300 text-sm">{personalInfo.phone}</p>
                </GlassCard>
              </motion.a>
            )}

            {personalInfo.location && (
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <GlassCard className="text-center p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                      <MapPin size={24} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Location</h3>
                  <p className="text-gray-300 text-sm">{personalInfo.location}</p>
                </GlassCard>
              </motion.div>
            )}
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            {personalInfo.github_url && (
              <motion.a
                href={personalInfo.github_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                <Github size={28} />
              </motion.a>
            )}
            {personalInfo.linkedin_url && (
              <motion.a
                href={personalInfo.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                <Linkedin size={28} />
              </motion.a>
            )}
            {personalInfo.email && (
              <motion.a
                href={`mailto:${personalInfo.email}`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                <Mail size={28} />
              </motion.a>
            )}
          </div>
        </motion.div>
      </section>

      {/* Contact Form */}
      <section ref={formRef} className="px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-6">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Send Me a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell me about your project, collaboration ideas, or just say hello! I'm always excited to discuss innovative solutions and new opportunities."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
