import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, Home, FolderOpen, Wrench, User, MessageCircle } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  // Track scroll direction and hide/show navbar
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    // Add backdrop blur when scrolled
    setScrolled(latest > 50);
  });

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest('.mobile-menu')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Projects", path: "/projects", icon: FolderOpen },
    { name: "Skills", path: "/skills", icon: Wrench },
    { name: "About", path: "/about", icon: User },
    { name: "Contact", path: "/contact", icon: MessageCircle },
  ];

  return (
      <>
        <motion.nav
            variants={{
              visible: { y: 0 },
              hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "backdrop-blur-xl bg-gray-900/70 border-b border-white/10 shadow-lg shadow-purple-500/5"
                    : "bg-transparent"
            }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              {/* Logo */}
              <Link to="/" className="text-2xl font-bold text-white z-50 relative">
                <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                >
                  Praveen Yadav
                </motion.span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                      <Link key={item.name} to={item.path}>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 relative ${
                                isActive
                                    ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white border border-white/20 shadow-lg shadow-purple-500/20"
                                    : "text-gray-300 hover:text-white hover:bg-white/10 hover:shadow-md"
                            }`}
                        >
                          <Icon size={18} />
                          <span className="font-medium">{item.name}</span>
                          {isActive && (
                              <motion.div
                                  layoutId="activeTab"
                                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30"
                                  transition={{ type: "spring", duration: 0.6 }}
                              />
                          )}
                        </motion.div>
                      </Link>
                  );
                })}
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 z-50 relative"
                  aria-label="Toggle mobile menu"
              >
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </motion.nav>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isOpen && (
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 z-40 md:hidden"
              >
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                />

                {/* Mobile Menu */}
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                    className="mobile-menu absolute right-0 top-0 h-full w-80 max-w-[80vw] bg-gradient-to-br from-gray-900/95 via-purple-900/95 to-gray-900/95 backdrop-blur-xl border-l border-white/10 shadow-2xl"
                >
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b border-white/10">
                      <div className="flex items-center justify-between">
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Navigation
                    </span>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsOpen(false)}
                            className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <X size={20} />
                        </motion.button>
                      </div>
                    </div>

                    {/* Navigation Items */}
                    <div className="flex-1 py-6">
                      <div className="space-y-2">
                        {navItems.map((item, index) => {
                          const Icon = item.icon;
                          const isActive = location.pathname === item.path;
                          return (
                              <Link key={item.name} to={item.path}>
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02, x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex items-center space-x-3 px-6 py-4 mx-4 rounded-xl transition-all duration-300 ${
                                        isActive
                                            ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white border border-white/20 shadow-lg"
                                            : "text-gray-300 hover:text-white hover:bg-white/10"
                                    }`}
                                >
                                  <Icon size={20} />
                                  <span className="font-medium">{item.name}</span>
                                  {isActive && (
                                      <motion.div
                                          layoutId="activeMobileTab"
                                          className="ml-auto w-2 h-2 bg-purple-400 rounded-full"
                                          transition={{ type: "spring", duration: 0.6 }}
                                      />
                                  )}
                                </motion.div>
                              </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-white/10">
                      <p className="text-gray-400 text-sm text-center">
                        Portfolio by Praveen Yadav
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
          )}
        </AnimatePresence>
      </>
  );
};

export default Navigation;