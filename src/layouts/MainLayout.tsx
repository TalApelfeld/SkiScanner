import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "motion/react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import AlertContainer from "../components/common/AlertContainer";
import { useAppSelector } from "../redux/hooks";

const MainLayout: React.FC = () => {
  const { theme } = useAppSelector((state) => state.ui);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <motion.main
        className="flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
      <AlertContainer />
      <Footer />
    </div>
  );
};

export default MainLayout;
