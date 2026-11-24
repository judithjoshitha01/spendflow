import { Bell, Search } from "lucide-react";

function Navbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      
      {/* Mobile Logo */}
      <div className="lg:hidden">
        <h1 className="text-lg font-bold">
          Spend<span className="text-indigo-600">Flow</span>
        </h1>
      </div>

      {/* Desktop Search */}
      <div className="hidden w-72 items-center gap-2 rounded-xl bg-slate-50 px-4 py-2.5 md:flex">
        <Search size={17} className="text-slate-400" />

        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>

      {/* Right */}
      <div className="ml-auto flex items-center gap-4">
        <button className="relative text-slate-500 hover:text-slate-900">
          <Bell size={20} strokeWidth={1.8} />

          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-indigo-600" />
        </button>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600">
          J
        </div>
      </div>

    </header>
  );
}

export default Navbar;