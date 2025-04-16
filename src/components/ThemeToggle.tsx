import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4 text-yellow-500 transition-all dark:text-gray-400" />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:animate-pulse"
      />
      <Moon className="h-4 w-4 text-gray-400 transition-all dark:text-blue-300" />
    </div>
  );
};

export default ThemeToggle;