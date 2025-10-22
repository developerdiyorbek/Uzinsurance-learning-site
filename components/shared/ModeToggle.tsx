"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

function ModeToggle() {
  const [mount, setMount] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMount(true), []);

  return mount && resolvedTheme === "dark" ? (
    <Button
      size={"icon"}
      variant={"outline"}
      onClick={() => setTheme("light")}
      aria-label="mode-toggle-to-light"
      className="cursor-pointer"
    >
      <Sun />
    </Button>
  ) : (
    <Button
      size={"icon"}
      onClick={() => setTheme("dark")}
      variant={"outline"}
      aria-label="mode-toggle-to-dark"
      className="cursor-pointer"
    >
      <Moon />
    </Button>
  );
}

export default ModeToggle;
