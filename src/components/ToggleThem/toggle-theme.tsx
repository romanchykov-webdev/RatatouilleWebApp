'use client';

import { useTheme } from 'next-themes';
import { JSX, useEffect, useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';

export default function ToggleTheme(): JSX.Element | null {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const cycleTheme = (): void => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  // const currentTheme = theme === "system" ? resolvedTheme : theme

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={cycleTheme}
      className="relative cursor-pointer flex items-center justify-center rounded-md border px-3 py-2 text-sm shadow hover:bg-accent hover:text-accent-foreground transition"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] transition-all rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
      {theme === 'system' && (
        <Monitor className="absolute right-[2rem] bottom-0 h-3 w-3 text-muted-foreground" />
      )}
    </button>
  );
}
