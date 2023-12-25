"use client";

import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";
import { useEffect, useState } from "react";

export default function Auth() {
  const supabase = createClientComponentClient<Database>();

  // State to store the dark mode status
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Function to check for dark mode
    const checkDarkMode = () => {
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    };

    // Set the initial dark mode status
    setIsDarkMode(checkDarkMode());

    // Set up a listener for changes in dark mode status
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    const darkModeChangeHandler = (e: MediaQueryListEvent) =>
      setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener("change", darkModeChangeHandler);

    // Clean up the listener
    return () =>
      darkModeMediaQuery.removeEventListener("change", darkModeChangeHandler);
  }, []);

  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <SupabaseAuth
        appearance={{
          theme: ThemeSupa,
        }}
        supabaseClient={supabase}
        theme={isDarkMode ? "dark" : "light"}
      />
    </main>
  );
}
