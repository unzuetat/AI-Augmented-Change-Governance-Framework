import { useStore } from '../../store';
import { listProfiles } from '../../profiles';
import { ProfileId } from '../../types/profile';

export default function Header({ title }: { title: string }) {
  const { activeProfileId, activeProfile, setProfile } = useStore();
  const allProfiles = listProfiles();

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-20">
      <h2 className="text-sm font-semibold text-gray-800">{title}</h2>

      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-400 font-medium">Active profile:</span>
        <select
          value={activeProfileId}
          onChange={(e) => setProfile(e.target.value as ProfileId)}
          className="text-xs font-medium bg-cf-50 text-cf-700 border border-cf-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-cf-300 cursor-pointer"
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
