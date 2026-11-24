import {
  Home,
  Map,
  Plus,
  Target,
  Lightbulb,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { path: "/", icon: Home, name: "Home" },
  { path: "/money-map", icon: Map, name: "Map" },
  { path: "/add-expense", icon: Plus, name: "Add" },
  { path: "/future", icon: Target, name: "Future" },
  { path: "/understand", icon: Lightbulb, name: "Insights" },
];

function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white lg:hidden">
      <div className="flex h-16 items-center justify-around">
        
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 text-[11px] ${
                  isActive
                    ? "text-indigo-600"
                    : "text-slate-400"
                }`
              }
            >
              <Icon size={20} strokeWidth={1.8} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}

      </div>
    </nav>
  );
}

export default MobileNav;