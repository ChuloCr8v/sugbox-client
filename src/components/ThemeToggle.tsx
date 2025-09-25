"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <motion.button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      layout
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`fixed z-50 flex items-center justify-center bottom-10 right-10 w-10 h-10 rounded-full shadow-md ${
        theme === "light"
          ? "bg-white shadow-[0_0_8px_2px_rgba(250,204,21,0.6)]"
          : "bg-gray-900 shadow-[0_0_8px_2px_rgba(99,102,241,0.6)]"
      }`}
      // animate={{ x: theme === "light" ? 0 : 32 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "light" ? (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <FaSun className="h-8 w-8 text-yellow-500" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
          >
            <FaMoon className="h-6 w-6 text-indigo-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
