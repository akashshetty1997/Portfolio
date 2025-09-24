// src/components/providers/theme-provider.tsx
"use client";

import * as React from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    // Always add dark class to the HTML element
    document.documentElement.classList.add("dark");

    // Store dark theme preference
    localStorage.setItem("theme", "dark");
  }, []);

  return <>{children}</>;
}
