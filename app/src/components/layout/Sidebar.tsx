import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FilePlus,
  List,
  GitBranch,
  Languages,
  ArrowLeftRight,
  Play,
  Settings,
  Menu,
  X,
} from 'lucide-react';

const navItems = [
  { to: '/',           label: 'Dashboard',   icon: LayoutDashboard },
  { to: '/changes',    label: 'Changes',     icon: List },
  { to: '/intake',     label: 'New Change',  icon: FilePlus },
  { to: '/workflow',   label: 'Workflow',     icon: GitBranch },
  { to: '/translator', label: 'Translator',  icon: Languages },
  { to: '/compare',    label: 'Compare',     icon: ArrowLeftRight },
  { to: '/simulator',  label: 'Simulator',   icon: Play },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-sm"
      >
        <Menu size={20} className="text-gray-600" />
      </button>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          w-60 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-50
          transition-transform duration-200
          lg:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo + close button */}
        <div className="px-5 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-cf-700 tracking-tight">
              Change<span className="text-cf-400">Flow</span>
            </h1>
            <p className="text-[10px] font-mono text-gray-400 mt-0.5 uppercase tracking-widest">
              Governance Framework
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-1 rounded hover:bg-gray-100 text-gray-400"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-cf-50 text-cf-700'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`
              }
            >
              <Icon size={18} strokeWidth={1.8} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-gray-100">
          <NavLink
            to="/settings"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-cf-50 text-cf-700'
                  : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
              }`
            }
          >
            <Settings size={18} strokeWidth={1.8} />
            Settings
          </NavLink>
        </div>
      </aside>
    </>
  );
}
