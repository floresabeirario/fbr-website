// Locale-aware navigation helpers — use these instead of next/navigation throughout the app.
// Link, redirect, usePathname and useRouter automatically prepend /en when needed.
import { createNavigation } from "next-intl/navigation";
import { routing } from "./i18n/routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
