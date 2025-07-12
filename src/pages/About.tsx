
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, MapPin, GraduationCap, Trophy, Code, Target } from "lucide-react";
import GlassCard from "../components/GlassCard";
import { usePersonalInfo } from "../hooks/usePersonalInfo";
import { useJourneyTimeline } from "../hooks/useJourneyTimeline";

const About = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.3 });
  const [timelineRef, timelineInView] = useInView({ threshold: 0.1 });
  
  const { data: personalInfo, isLoading: personalLoading } = usePersonalInfo();
  const { data: timelineData, isLoading: timelineLoading } = useJourneyTimeline();

  const iconMap = {
    'GraduationCap': GraduationCap,
    'Code': Code,
    'Trophy': Trophy,
    'Target': Target
  };

  if (personalLoading || timelineLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-white text-xl">Loading about information...</div>
      </div>
    );
  }

  if (!personalInfo || !timelineData) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-white text-xl">Failed to load about information</div>
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
          <div className="mb-12">
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
                className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-purple-400/30 shadow-2xl shadow-purple-500/20"
                style={{
                  background: "linear-gradient(45deg, #8b5cf6, #ec4899)",
                }}
              >
                <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-white">
                  {personalInfo.name.split(' ').map(n => n[0]).join('')}
                </div>
              </motion.div>
            )}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h1>
          
          <div className="space-y-6 mb-12">
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {personalInfo.bio}
            </p>
            
            {personalInfo.quote && (
              <motion.blockquote
                initial={{ opacity: 0, scale: 0.9 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-2xl font-light italic text-purple-300 max-w-2xl mx-auto"
              >
                "{personalInfo.quote}"
              </motion.blockquote>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-gray-300">
            {personalInfo.location && (
              <div className="flex items-center space-x-2">
                <MapPin size={20} className="text-purple-400" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Calendar size={20} className="text-purple-400" />
              <span>BCA Student (2022-2025)</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Journey Timeline */}
      <section ref={timelineRef} className="px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                My Journey
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A roadmap of my growth from curious student to aspiring developer.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Path */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-30" />
            
            {timelineData.map((item, index) => {
              const IconComponent = iconMap[item.icon] || Code;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                  animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.3 }}
                  className={`relative flex items-center mb-16 ${
                    isEven ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg`}
                    >
                      <IconComponent size={28} className="text-white" />
                    </motion.div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ${isEven ? "pr-8" : "pl-8"}`}>
                    <GlassCard>
                      <div className="space-y-4">
                        <div>
                          <div className={`text-sm font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-2`}>
                            {item.phase}
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                          <div className="text-purple-300 font-medium mb-3">{item.period}</div>
                          <p className="text-gray-300 leading-relaxed">{item.description}</p>
                        </div>

                        {item.highlights && item.highlights.length > 0 && (
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">🚀 Highlights</h4>
                            <ul className="space-y-2">
                              {item.highlights.map((highlight, hIndex) => (
                                <motion.li
                                  key={hIndex}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                                  transition={{ duration: 0.5, delay: index * 0.3 + hIndex * 0.1 }}
                                  className="flex items-center text-gray-300"
                                >
                                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0" />
                                  <span className="text-sm">{highlight}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </GlassCard>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
