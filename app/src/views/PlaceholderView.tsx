import { Construction } from 'lucide-react';

export default function PlaceholderView({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <Construction size={48} className="text-gray-300 mb-4" strokeWidth={1.2} />
      <h2 className="text-lg font-semibold text-gray-600">{name}</h2>
      <p className="text-sm text-gray-400 mt-1 max-w-md">
        This view is part of Phase 2. The governance engine and data model are ready —
        this is where the UI will be built.
      </p>
    </div>
  );
}
