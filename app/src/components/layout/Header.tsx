import { useStore } from '../../store';
import { listProfiles } from '../../profiles';
import { ProfileId } from '../../types/profile';

export default function Header({ title }: { title: string }) {
  const { activeProfileId, setProfile } = useStore();
  const allProfiles = listProfiles();

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-20">
      {/* Title - hidden on mobile to make room, shown with left padding for hamburger */}
      <h2 className="text-sm font-semibold text-gray-800 pl-10 lg:pl-0">{title}</h2>

      {/* Profile selector */}
      <div className="flex items-center gap-2 md:gap-3">
        <span className="text-xs text-gray-400 font-medium hidden sm:inline">Active profile:</span>
        <select
          value={activeProfileId}
          onChange={(e) => setProfile(e.target.value as ProfileId)}
          className="text-xs font-medium bg-cf-50 text-cf-700 border border-cf-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-cf-300 cursor-pointer max-w-[180px] md:max-w-none"
        >
          {allProfiles.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
