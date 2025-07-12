
import { ReactNode } from "react";
import Navigation from "./Navigation";
import ParallaxBackground from "./ParallaxBackground";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <ParallaxBackground />
      <Navigation />
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;
