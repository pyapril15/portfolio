
import { motion } from "framer-motion";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Calendar, Tag, ExternalLink, Github } from "lucide-react";
import GlassCard from "../components/GlassCard";
import ProjectModal from "../components/ProjectModal";
import { useProjects } from "../hooks/useProjects";

const Projects = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.3 });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.1 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All Projects");
  
  const { data: projectsData, isLoading } = useProjects();

  const tabs = ["All Projects", "Mobile App", "Website", "Enterprise"];

  const filteredProjects = projectsData?.filter(project => 
    activeTab === "All Projects" || project.category === activeTab
  ) || [];

  const handleProjectClick = (project) => {
    // Transform the project data to match the expected format
    const transformedProject = {
      id: project.id,
      name: project.name,
      description: project.description,
      shortDescription: project.short_description || project.description,
      startDate: project.start_date || 'Unknown',
      endDate: project.end_date || 'Present',
      technologies: project.technologies || [],
      category: project.category,
      image: project.image_url || '/placeholder.svg',
      liveUrl: project.live_demo_url,
      sourceUrl: project.source_code_url,
      features: project.features || [],
      stats: typeof project.stats === 'object' ? 
        Object.entries(project.stats).map(([key, value]) => ({ label: key, value: String(value) })) : 
        [
          { label: "Duration", value: "3 months" },
          { label: "Team Size", value: "1" },
          { label: "Status", value: "Completed" }
        ]
    };
    
    setSelectedProject(transformedProject);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-white text-xl">Loading projects...</div>
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
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              My Projects
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore my portfolio of innovative applications and websites built with cutting-edge technologies.
          </p>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
                }`}
              >
                {tab}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={projectsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => handleProjectClick(project)}
              >
                <GlassCard className="cursor-pointer group">
                  <div className="relative mb-4 overflow-hidden rounded-lg">
                    <img
                      src={project.image_url || '/placeholder.svg'}
                      alt={project.name}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Hover buttons */}
                    <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.live_demo_url && (
                        <motion.a
                          href={project.live_demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          onClick={(e) => e.stopPropagation()}
                          className="p-3 bg-green-500 text-white rounded-full shadow-lg"
                        >
                          <ExternalLink size={20} />
                        </motion.a>
                      )}
                      {project.source_code_url && (
                        <motion.a
                          href={project.source_code_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          onClick={(e) => e.stopPropagation()}
                          className="p-3 bg-gray-800 text-white rounded-full shadow-lg"
                        >
                          <Github size={20} />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                        {project.short_description || project.description}
                      </p>
                    </div>

                    <div className="flex items-center text-gray-400 text-sm mb-3">
                      <Calendar size={14} className="mr-2" />
                      <span>{project.start_date} - {project.end_date || 'Present'}</span>
                    </div>

                    <div>
                      <div className="flex items-center text-gray-400 text-sm mb-2">
                        <Tag size={14} className="mr-2" />
                        <span>Technologies</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(project.technologies || []).slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs border border-purple-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                        {(project.technologies || []).length > 3 && (
                          <span className="px-2 py-1 bg-gray-500/20 text-gray-300 rounded-full text-xs">
                            +{(project.technologies || []).length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-gray-400 text-lg">No projects found for the selected category.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </motion.div>
  );
};

export default Projects;
