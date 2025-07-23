import { motion, AnimatePresence } from "framer-motion";
import { Download, ChevronDown, Github, Linkedin, Mail, ExternalLink, MapPin, Calendar, Users, GitFork } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import GlassCard from "../components/GlassCard";
import { usePersonalInfo } from "../hooks/usePersonalInfo";

// GitHub Hover Card Component
const GitHubCard = ({ personalInfo, isVisible }) => {
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchGitHubData = async () => {
    if (githubData || loading) return;

    setLoading(true);
    try {
      const username = personalInfo.github_url?.split('/').pop();
      if (username) {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        setGithubData(data);
      }
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      fetchGitHubData();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
      <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 z-50"
      >
        <div className="bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-gray-600 via-gray-700 to-gray-900 backdrop-blur-3xl border border-gray-700/50 rounded-2xl p-6 shadow-2xl shadow-purple-500/20 min-w-[320px]">
          {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
              </div>
          ) : githubData ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                      src={githubData.avatar_url}
                      alt={githubData.login}
                      className="w-16 h-16 rounded-full border-2 border-purple-400/30"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg">{githubData.name || githubData.login}</h3>
                    <p className="text-blue-200">@{githubData.login}</p>
                  </div>
                </div>

                {githubData.bio && (
                    <p className="text-gray-300 text-sm leading-relaxed">{githubData.bio}</p>
                )}

                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <MapPin size={14} />
                    <span>{githubData.location || 'Unknown'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>Since {new Date(githubData.created_at).getFullYear()}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-1 text-blue-400">
                    <Users size={16} />
                    <span>{githubData.followers} followers</span>
                  </div>
                  <div className="flex items-center space-x-1 text-green-400">
                    <GitFork size={16} />
                    <span>{githubData.public_repos} repos</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-700/50">
                  <button
                      onClick={() => window.open(githubData.html_url, '_blank')}
                      className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                  >
                    <Github size={16} />
                    <span>View Profile</span>
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
          ) : (
              <div className="text-center py-8">
                <Github size={48} className="mx-auto text-gray-500 mb-4" />
                <p className="text-gray-400">Unable to load GitHub data</p>
              </div>
          )}
        </div>
      </motion.div>
  );
};

// LinkedIn Hover Card Component
const LinkedInCard = ({ personalInfo, isVisible }) => {
  if (!isVisible) return null;

  return (
      <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 z-50"
      >
        <div className="bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-gray-600 via-gray-700 to-gray-900 backdrop-blur-3xl border border-gray-700/50 rounded-2xl p-6 shadow-2xl shadow-purple-500/20 min-w-[300px]">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <Linkedin size={32} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg">{personalInfo.name}</h3>
                <p className="text-blue-200">{personalInfo.role}</p>
              </div>
            </div>

            <div className="text-gray-300 text-sm space-y-2">
              <p className="flex items-center space-x-2">
                <span>🎯</span>
                <span>Professional Network & Opportunities</span>
              </p>
              <p className="flex items-center space-x-2">
                <span>📍</span>
                <span>Based in Sarnath, India</span>
              </p>
              <p className="flex items-center space-x-2">
                <span>🚀</span>
                <span>Open to exciting projects and collaborations</span>
              </p>
            </div>

            <div className="pt-2 border-t border-gray-700/50">
              <button
                  onClick={() => window.open(personalInfo.linkedin_url, '_blank')}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
              >
                <Linkedin size={16} />
                <span>Let's Connect</span>
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
  );
};

// Email Hover Card Component
const EmailCard = ({ personalInfo, isVisible }) => {
  if (!isVisible) return null;

  const handleEmailClick = () => {
    window.open(`mailto:${personalInfo.email}?subject=Hello%20from%20your%20portfolio!&body=Hi%20${personalInfo.name},%0D%0A%0D%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20get%20in%20touch.%0D%0A%0D%0ABest%20regards`, '_blank');
  };

  return (
      <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 z-50"
      >
        <div className="bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-gray-600 via-gray-700 to-gray-900 backdrop-blur-3xl border border-gray-700/50 rounded-2xl p-6 shadow-2xl shadow-purple-500/20 min-w-[300px]">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <Mail size={32} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg">Get In Touch</h3>
                <p className="text-emerald-400">Let's discuss your project</p>
              </div>
            </div>

            <div className="text-gray-300 text-sm space-y-2">
              <p className="flex items-center space-x-2">
                <span>📧</span>
                <span className="font-mono text-emerald-400">{personalInfo.email}</span>
              </p>
              <p className="flex items-center space-x-2">
                <span>💬</span>
                <span>Quick response guaranteed</span>
              </p>
              <p className="flex items-center space-x-2">
                <span>🎯</span>
                <span>Available for freelance & full-time</span>
              </p>
            </div>

            <div className="pt-2 border-t border-gray-700/50">
              <button
                  onClick={handleEmailClick}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
              >
                <Mail size={16} />
                <span>Send Email</span>
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
  );
};

const Home = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.3 });
  const [sectionsRef, sectionsInView] = useInView({ threshold: 0.2 });
  const [hoveredCard, setHoveredCard] = useState(null);
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

  const socialLinks = [
    {
      icon: Github,
      href: personalInfo.github_url,
      label: "GitHub",
      key: "github"
    },
    {
      icon: Linkedin,
      href: personalInfo.linkedin_url,
      label: "LinkedIn",
      key: "linkedin"
    },
    {
      icon: Mail,
      href: `mailto:${personalInfo.email}`,
      label: "Email",
      key: "email"
    }
  ];

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

              <div className="flex space-x-4 relative">
                {socialLinks.filter(social => social.href).map((social) => (
                    <div key={social.label} className="relative">
                      <motion.a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => setHoveredCard(social.key)}
                          onMouseLeave={() => setHoveredCard(null)}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300 block"
                      >
                        <social.icon size={24} />
                      </motion.a>

                      <AnimatePresence>
                        {hoveredCard === social.key && (
                            <>
                              {social.key === 'github' && (
                                  <GitHubCard
                                      personalInfo={personalInfo}
                                      isVisible={true}
                                  />
                              )}
                              {social.key === 'linkedin' && (
                                  <LinkedInCard
                                      personalInfo={personalInfo}
                                      isVisible={true}
                                  />
                              )}
                              {social.key === 'email' && (
                                  <EmailCard
                                      personalInfo={personalInfo}
                                      isVisible={true}
                                  />
                              )}
                            </>
                        )}
                      </AnimatePresence>
                    </div>
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