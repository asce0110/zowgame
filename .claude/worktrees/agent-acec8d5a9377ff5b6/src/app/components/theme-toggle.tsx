import { Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-store";
import { vibrate } from "../lib/haptics";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => { vibrate(6); toggle(); }}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="hidden sm:flex p-3 rounded-xl border ec-surface ec-border ec-text hover:ec-hover-surface transition-colors cursor-pointer min-h-[44px] min-w-[44px] items-center justify-center"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-300" />
      ) : (
        <Moon className="w-4 h-4 text-violet-500" />
      )}
    </button>
  );
}
