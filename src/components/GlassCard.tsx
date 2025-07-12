
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard = ({ children, className, hover = true }: GlassCardProps) => {
  const cardContent = (
    <div
      className={cn(
        "backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6",
        "shadow-xl shadow-black/20",
        hover && "transition-all duration-300 hover:bg-white/20 hover:shadow-2xl hover:shadow-purple-500/20",
        className
      )}
    >
      {children}
    </div>
  );

  if (hover) {
    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

export default GlassCard;
