import { useContext } from "react";
import { ThemeContext } from "../util/themecontext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 border rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

export default ThemeToggle;
