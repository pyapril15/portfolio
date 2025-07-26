import { motion } from "framer-motion";
import {
    Github,
    Linkedin,
    Mail,
    MapPin,
    Heart,
    Send,
    Award,
    Code,
    Briefcase,
    Coffee,
    Twitter,
    Instagram,
    Globe,
    ExternalLink
} from "lucide-react";

interface PersonalInfo {
    name: string;
    email: string;
    github_url?: string;
    linkedin_url?: string;
    role: string;
}

interface FooterProps {
    personalInfo: PersonalInfo;
}

// Enhanced Professional Footer Component
const Footer = ({ personalInfo }: FooterProps) => {
    const currentYear = new Date().getFullYear();

    const footerNavigation = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Skills', href: '#skills' },
        { name: 'Contact', href: '#contact' }
    ];

    const services = [
        { name: 'Web Development', href: '#' },
        { name: 'Mobile Apps', href: '#' },
        { name: 'UI/UX Design', href: '#' },
        { name: 'Consulting', href: '#' }
    ];

    const socialLinks = [
        {
            icon: Github,
            href: personalInfo?.github_url,
            label: 'GitHub',
            color: 'hover:text-gray-300',
            description: 'View my code repositories'
        },
        {
            icon: Linkedin,
            href: personalInfo?.linkedin_url,
            label: 'LinkedIn',
            color: 'hover:text-blue-400',
            description: 'Connect with me professionally'
        },
        {
            icon: Mail,
            href: `mailto:${personalInfo?.email}`,
            label: 'Email',
            color: 'hover:text-green-400',
            description: 'Send me a message'
        }
    ].filter(social => social.href && social.href !== '#' && social.href !== 'mailto:undefined');

    const achievements = [
        { icon: Award, text: "15+ Projects Completed" },
        { icon: Code, text: "25+ Technologies" },
        { icon: Briefcase, text: "2+ Years Experience" },
        { icon: Coffee, text: "100+ Cups of Coffee" }
    ];

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle newsletter subscription
        const form = e.target as HTMLFormElement;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;

        if (email) {
            // Here you would typically send the email to your backend
            console.log('Newsletter subscription:', email);
            // Show success message
            alert('Thank you for subscribing to my newsletter!');
            form.reset();
        }
    };

    return (
        <footer className="relative bg-gradient-to-br from-gray-900/95 via-purple-900/95 to-gray-900/95 backdrop-blur-sm border-t border-gray-700/50 overflow-hidden">
            {/* Background Pattern - Consistent with main theme */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.3),transparent_50%)]"></div>
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px'
                    }}
                ></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 py-16">
                {/* Top Section */}
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-3xl font-bold text-white mb-4">
                                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    {personalInfo?.name || 'Praveen Yadav'}
                                </span>
                            </h3>
                            <p className="text-gray-400 mb-6 max-w-md leading-relaxed text-lg">
                                Crafting exceptional digital experiences with cutting-edge technologies.
                                Let's build something amazing together.
                            </p>

                            {/* Achievement Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                {achievements.map((achievement, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex items-center space-x-2 text-gray-300 text-sm"
                                    >
                                        <achievement.icon size={16} className="text-purple-400" />
                                        <span>{achievement.text}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Social Links */}
                            <div className="flex space-x-4">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        className={`group relative p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-gray-400 ${social.color} transition-all duration-300 hover:bg-white/10 hover:border-white/20`}
                                        aria-label={social.label}
                                        title={social.description}
                                    >
                                        <social.icon size={20} />

                                        {/* Tooltip */}
                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                                            {social.description}
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="text-xl font-semibold text-white mb-6">Quick Links</h4>
                            <ul className="space-y-3">
                                {footerNavigation.map((item, index) => (
                                    <motion.li
                                        key={item.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <a
                                            href={item.href}
                                            className="text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm flex items-center group"
                                            onClick={(e) => {
                                                if (item.href.startsWith('#')) {
                                                    e.preventDefault();
                                                    const element = document.querySelector(item.href);
                                                    element?.scrollIntoView({ behavior: 'smooth' });
                                                }
                                            }}
                                        >
                                            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                                            {item.name}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Services & Contact */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="text-xl font-semibold text-white mb-6">Services</h4>
                            <ul className="space-y-3 mb-8">
                                {services.map((service, index) => (
                                    <motion.li
                                        key={service.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <a
                                            href={service.href}
                                            className="text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm flex items-center group"
                                        >
                                            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                                            {service.name}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Contact Info */}
                            <div className="space-y-3">
                                <h5 className="text-lg font-medium text-white mb-4">Get In Touch</h5>
                                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                                    <Mail size={16} className="text-purple-400" />
                                    <span>{personalInfo?.email}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                                    <MapPin size={16} className="text-purple-400" />
                                    <span>Sarnath, India</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                                    <Globe size={16} className="text-purple-400" />
                                    <span>Available Worldwide</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Newsletter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 mb-12"
                >
                    <div className="max-w-2xl mx-auto text-center">
                        <h4 className="text-2xl font-bold text-white mb-4">Stay Updated</h4>
                        <p className="text-gray-400 mb-6">Get notified about new projects and tech insights</p>
                        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                required
                                className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-200"
                            />
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                            >
                                <Send size={18} />
                                <span>Subscribe</span>
                            </motion.button>
                        </form>
                    </div>
                </motion.div>

                {/* Bottom Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="pt-8 border-t border-gray-700/50"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} {personalInfo?.name || 'Praveen Yadav'}. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-2 text-gray-400 text-sm">
                            <span>Crafted with</span>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                <Heart size={16} className="text-red-400 fill-current" />
                            </motion.div>
                            <span>using React & Framer Motion</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <a href="#privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;