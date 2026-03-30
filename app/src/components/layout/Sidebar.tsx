import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Zap,
  FilePlus,
  List,
  LayoutDashboard,
  GitBranch,
  Languages,
  ArrowLeftRight,
  Play,
  Settings,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useI18n } from '../../i18n';

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { t } = useI18n();

  const primaryItems = [
    { to: '/',        label: t.routing.routingPlayground, icon: Zap },
    { to: '/intake',  label: t.nav.newRequest,            icon: FilePlus },
    { to: '/changes', label: t.nav.changeRegister,        icon: List },
  ];

  const moreItems = [
    { to: '/dashboard',  label: t.nav.dashboard,          icon: LayoutDashboard },
    { to: '/workflow',   label: t.nav.workflow,            icon: GitBranch },
    { to: '/translator', label: t.nav.translator,         icon: Languages },
    { to: '/compare',    label: t.nav.compareFrameworks,   icon: ArrowLeftRight },
    { to: '/simulator',  label: t.nav.scenarioSimulator,   icon: Play },
  ];

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2 text-xs font-medium transition-colors border-l-2 ${
      isActive
        ? 'border-l-cf-500 bg-cf-50 text-cf-800'
        : 'border-l-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700'
    }`;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-50 p-2 bg-white border border-gray-200 rounded"
      >
        <Menu size={20} className="text-gray-600" />
      </button>

      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          w-56 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-50
          transition-transform duration-200
          lg:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="px-4 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-gray-900 tracking-wide uppercase">ChangeFlow</div>
            <div className="text-[10px] text-gray-400 mt-0.5">Governance framework</div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-1 rounded hover:bg-gray-100 text-gray-400"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 py-2 overflow-y-auto">
          {/* Primary items */}
          {primaryItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={navLinkClass}
            >
              <Icon size={15} strokeWidth={1.8} />
              {label}
            </NavLink>
          ))}

          {/* More tools expander */}
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className="flex items-center justify-between w-full px-4 py-2 text-xs font-medium text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors border-l-2 border-l-transparent mt-1"
          >
            <span>{t.routing.moreTools}</span>
            {moreOpen
              ? <ChevronUp size={12} />
              : <ChevronDown size={12} />
            }
          </button>

          {moreOpen && moreItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={navLinkClass}
            >
              <Icon size={15} strokeWidth={1.8} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="py-2 border-t border-gray-200">
          <NavLink
            to="/settings"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 text-xs font-medium transition-colors border-l-2 ${
                isActive
                  ? 'border-l-cf-500 bg-cf-50 text-cf-800'
                  : 'border-l-transparent text-gray-400 hover:bg-gray-50 hover:text-gray-600'
              }`
            }
          >
            <Settings size={15} strokeWidth={1.8} />
            {t.nav.settings}
          </NavLink>
        </div>
      </aside>
    </>
  );
}
