import { LucideIcon } from "lucide-react";

export interface NavigationLink {
  icon?: LucideIcon;
  href: string;
  label: string;
}

export interface NavigationLinks {
  [path: string]: NavigationLink[];
}