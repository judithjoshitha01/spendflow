import {
  Home,
  Map,
  Plus,
  Target,
  Lightbulb,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Money Map",
    path: "/money-map",
    icon: Map,
  },
  {
    name: "Add Expense",
    path: "/add-expense",
    icon: Plus,
  },
  {
    name: "Future",
    path: "/future",
    icon: Target,
  },
  {
    name: "Understand",
    path: "/understand",
    icon: Lightbulb,
  },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      
      {/* Logo */}
      <div className="flex h-20 items-center px-7">
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Spend<span className="text-indigo-600">Flow</span>
          </h1>

          <p className="text-xs text-slate-400">
            See where your money flows
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 pt-6">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <Icon size={19} strokeWidth={1.8} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-slate-100 p-5">
        <p className="text-xs text-slate-400">
          SpendFlow
        </p>
        <p className="mt-1 text-xs text-slate-300">
          Personal finance
        </p>
      </div>

    </aside>
  );
}

export default Sidebar;