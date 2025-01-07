import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { usePathname } from "../../hooks/usePathname";

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link
        to="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Overview
      </Link>
      <Link
        to="/candidates"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/candidates" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Candidates
      </Link>
      <Link
        to="/jobs"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/jobs" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Jobs
      </Link>
      // ... other navigation items
    </nav>
  );
} 