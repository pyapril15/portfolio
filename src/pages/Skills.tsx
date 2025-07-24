import {motion} from "framer-motion";
import {useState} from "react";
import {useInView} from "react-intersection-observer";
import {Award} from "lucide-react";
import GlassCard from "../components/GlassCard";
import {useSkills} from "../hooks/useSkills";
import {useCertifications} from "../hooks/useCertifications";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";

const Skills = () => {
    const [heroRef, heroInView] = useInView({threshold: 0.3});
    const [skillsRef, skillsInView] = useInView({threshold: 0.1});
    const [certsRef, certsInView] = useInView({threshold: 0.1});
    const [activeTab, setActiveTab] = useState("All Skills");

    const {data: skillsData, isLoading: skillsLoading} = useSkills();
    const {data: certificationsData, isLoading: certsLoading} = useCertifications();

    const skillCategories = [
        "All Skills",
        "Programming Languages",
        "Frontend Development",
        "Backend Development",
        "Development Tools",
        "Database",
        "Cloud & Deployment",
        "Data Analysis",
        "Design & Other"
    ];

    const filteredSkills = skillsData?.filter(skill =>
        activeTab === "All Skills" || skill.category === activeTab
    ) || [];

    const groupedSkills = {};

    skillCategories.forEach(category => {
        if (category === "All Skills") return; // Skip "All Skills" in grouping

        const skillsInCategory = filteredSkills.filter(skill => skill.category === category);
        if (skillsInCategory.length > 0) {
            groupedSkills[category] = skillsInCategory;
        }
    });

    if (skillsLoading) {
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

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="min-h-screen pt-24 pb-16"
        >
            {/* Hero Section */}
            <section ref={heroRef} className="py-20 px-4">
                <motion.div
                    initial={{opacity: 0, y: 50}}
                    animate={heroInView ? {opacity: 1, y: 0} : {}}
                    transition={{duration: 0.8}}
                    className="text-center max-w-4xl mx-auto"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              My Skills
            </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        A comprehensive overview of my technical expertise and professional capabilities.
                    </p>
                </motion.div>
            </section>

            {/* Skills Section */}
            <section ref={skillsRef} className="px-4 mb-20">
                <div className="max-w-7xl mx-auto">
                    {/* Filter Tabs */}
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        animate={skillsInView ? {opacity: 1, y: 0} : {}}
                        transition={{duration: 0.6}}
                        className="flex flex-wrap justify-center gap-4 mb-12"
                    >
                        {skillCategories.map((category) => (
                            <motion.button
                                key={category}
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                onClick={() => setActiveTab(category)}
                                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                    activeTab === category
                                        ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg"
                                        : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
                                }`}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Skills Grid */}
                    {activeTab === "All Skills" ? (
                        Object.entries(groupedSkills).map(([category, skills], categoryIndex) => (
                            <motion.div
                                key={category}
                                initial={{opacity: 0, y: 50}}
                                animate={skillsInView ? {opacity: 1, y: 0} : {}}
                                transition={{duration: 0.6, delay: categoryIndex * 0.1}}
                                className="mb-12"
                            >
                                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                  <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    {category}
                  </span>
                                </h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {skills.map((skill, index) => (
                                        <motion.div
                                            key={skill.id}
                                            initial={{opacity: 0, scale: 0.9}}
                                            animate={skillsInView ? {opacity: 1, scale: 1} : {}}
                                            transition={{duration: 0.5, delay: index * 0.1}}
                                        >
                                            <GlassCard className="text-center h-full p-6">
                                                <div className="text-4xl mb-4">{skill.icon}</div>
                                                <h3 className="text-lg font-bold text-white mb-2">{skill.name}</h3>
                                                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                                                    {skill.description}
                                                </p>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-400">Proficiency</span>
                                                        <span
                                                            className="text-green-400 font-semibold">{skill.proficiency}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                                        <motion.div
                                                            initial={{width: 0}}
                                                            animate={skillsInView ? {width: `${skill.proficiency}%`} : {}}
                                                            transition={{duration: 1, delay: index * 0.1}}
                                                            className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full"
                                                        />
                                                    </div>
                                                </div>
                                            </GlassCard>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{opacity: 0}}
                            animate={skillsInView ? {opacity: 1} : {}}
                            transition={{duration: 0.6}}
                            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {filteredSkills.map((skill, index) => (
                                <motion.div
                                    key={skill.id}
                                    initial={{opacity: 0, scale: 0.9}}
                                    animate={skillsInView ? {opacity: 1, scale: 1} : {}}
                                    transition={{duration: 0.5, delay: index * 0.1}}
                                >
                                    <GlassCard className="text-center h-full p-6">
                                        <div className="text-4xl mb-4">{skill.icon}</div>
                                        <h3 className="text-lg font-bold text-white mb-2">{skill.name}</h3>
                                        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                                            {skill.description}
                                        </p>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-400">Proficiency</span>
                                                <span
                                                    className="text-green-400 font-semibold">{skill.proficiency}%</span>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-2">
                                                <motion.div
                                                    initial={{width: 0}}
                                                    animate={skillsInView ? {width: `${skill.proficiency}%`} : {}}
                                                    transition={{duration: 1, delay: index * 0.1}}
                                                    className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full"
                                                />
                                            </div>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Certifications Section */}
            {!certsLoading && certificationsData && certificationsData.length > 0 && (
                <section ref={certsRef} className="px-4">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{opacity: 0, y: 50}}
                            animate={certsInView ? {opacity: 1, y: 0} : {}}
                            transition={{duration: 0.8}}
                            className="text-center mb-12"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span
                    className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  Certifications
                </span>
                            </h2>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                Professional certifications and achievements that validate my expertise.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {certificationsData.map((cert, index) => (
                                <motion.div
                                    key={cert.id}
                                    initial={{opacity: 0, y: 50}}
                                    animate={certsInView ? {opacity: 1, y: 0} : {}}
                                    transition={{duration: 0.6, delay: index * 0.1}}
                                >
                                    <GlassCard className="text-center h-full p-6">
                                        <div className="flex justify-center mb-4">
                                            <div
                                                className="p-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full">
                                                <Award size={32} className="text-white"/>
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-2">{cert.name}</h3>
                                        <p className="text-purple-300 font-medium mb-2">{cert.organization}</p>
                                        <p className="text-gray-400 text-sm mb-4">{cert.date}</p>
                                        {cert.link && (
                                            <motion.a
                                                href={cert.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{scale: 1.05}}
                                                className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium transition-all duration-300"
                                            >
                                                View Certificate
                                            </motion.a>
                                        )}
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </motion.div>
    );
};

export default Skills;
