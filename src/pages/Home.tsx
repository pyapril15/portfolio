
import { motion } from "framer-motion";
import { Download, ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import { useInView } from "react-intersection-observer";
import GlassCard from "../components/GlassCard";
import { usePersonalInfo } from "../hooks/usePersonalInfo";

const Home = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.3 });
  const [sectionsRef, sectionsInView] = useInView({ threshold: 0.2 });
  const { data: personalInfo, isLoading } = usePersonalInfo();

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemAnimation = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const handleDownloadResume = () => {
    if (personalInfo?.resume_url) {
      const link = document.createElement('a');
      link.href = personalInfo.resume_url;
      link.download = `${personalInfo.name.replace(' ', '_')}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Fallback to existing resume
      const link = document.createElement('a');
      link.href = '/resume/praveenyadavresume.png';
      link.download = 'Praveen_Yadav_Resume.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (isLoading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
    );
  }

  if (!personalInfo) {
    return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">Failed to load personal information</div>
        </div>
    );
  }

  return (
      <motion.div
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
          className="min-h-screen"
      >
        {/* Hero Section */}
        <section ref={heroRef} className="min-h-screen flex items-center justify-center px-4 pt-20">
          <motion.div
              variants={containerAnimation}
              className="text-center max-w-4xl mx-auto"
          >
            {/* Hero Image */}
            <motion.div variants={itemAnimation} className="mb-8">
              {personalInfo.image_url ? (
                  <motion.div
                      whileHover={{ scale: 1.05, rotateY: 15 }}
                      className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-purple-400/30 shadow-2xl shadow-purple-500/20"
                  >
                    <img
                        src={personalInfo.image_url}
                        alt={personalInfo.name}
                        className="w-full h-full object-cover"
                    />
                  </motion.div>
              ) : (
                  <motion.div
                      whileHover={{ scale: 1.05, rotateY: 15 }}
                      className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-purple-400/30 shadow-2xl shadow-purple-500/20 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
                  >
                    <div className="text-6xl font-bold text-white">
                      {personalInfo.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </motion.div>
              )}
            </motion.div>

            <motion.div variants={itemAnimation}>
              <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
              </h1>
            </motion.div>

            <motion.div variants={itemAnimation}>
              <p className="text-2xl md:text-3xl text-gray-300 mb-8 font-light">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {personalInfo.role}
              </span>
              </p>
            </motion.div>

            <motion.div variants={itemAnimation}>
              <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                {personalInfo.bio}
              </p>
            </motion.div>

            <motion.div variants={itemAnimation} className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownloadResume}
                  className="flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl"
              >
                <Download size={24} />
                <span>Download Resume</span>
              </motion.button>

              <div className="flex space-x-4">
                {[
                  { icon: Github, href: personalInfo.github_url, label: "GitHub" },
                  { icon: Linkedin, href: personalInfo.linkedin_url, label: "LinkedIn" },
                  { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" }
                ].filter(social => social.href).map((social) => (
                    <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                    >
                      <social.icon size={24} />
                    </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemAnimation}>
              <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="inline-block"
              >
                <ChevronDown size={32} className="text-purple-400" />
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Quick Overview Section */}
        <section ref={sectionsRef} className="py-20 px-4">
          <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={sectionsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
              What I Do
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Projects",
                  count: "10+",
                  description: "Full-stack applications built with modern technologies",
                  color: "from-purple-500 to-pink-500"
                },
                {
                  title: "Skills",
                  count: "15+",
                  description: "Technologies and frameworks mastered",
                  color: "from-blue-500 to-purple-500"
                },
                {
                  title: "About",
                  count: "3+",
                  description: "Years of learning and building projects",
                  color: "from-green-500 to-blue-500"
                },
                {
                  title: "Contact",
                  count: "24/7",
                  description: "Always open to new opportunities",
                  color: "from-pink-500 to-purple-500"
                }
              ].map((item, index) => (
                  <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 50 }}
                      animate={sectionsInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                  >
                    <GlassCard className="text-center h-full">
                      <div className={`text-4xl font-bold mb-4 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                        {item.count}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                    </GlassCard>
                  </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </motion.div>
  );
};

export default Home;
