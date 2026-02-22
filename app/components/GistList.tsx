interface Gist {
  id: string;
  description: string | null;
  html_url: string;
  files: Record<string, { filename: string; language: string | null }>;
  created_at: string;
  updated_at: string;
  public: boolean;
}

interface GistListProps {
  gists: Gist[];
  selectedGists: Set<string>;
  onToggleSelect: (id: string) => void;
}

export default function GistList({
  gists,
  selectedGists,
  onToggleSelect,
}: GistListProps) {
  if (gists.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No gists loaded. Enter your token and click "Fetch Gists".
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-3">
      {gists.map((gist) => {
        const files = Object.values(gist.files);
        const isSelected = selectedGists.has(gist.id);

        return (
          <div
            key={gist.id}
            className={`p-4 rounded-lg border transition-colors ${
              isSelected
                ? "bg-red-900/20 border-red-700"
                : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggleSelect(gist.id)}
                className="mt-1 w-4 h-4 accent-red-600 cursor-pointer"
              />

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Description */}
                <div className="flex items-center gap-2 mb-2">
                  {gist.public ? (
                    <span className="text-xs px-2 py-0.5 bg-green-900/50 text-green-400 rounded">
                      Public
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 bg-zinc-700 text-zinc-300 rounded">
                      Private
                    </span>
                  )}
                  <h3 className="font-medium truncate">
                    {gist.description || "Untitled Gist"}
                  </h3>
                </div>

                {/* Files */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {files.map((file) => (
                    <span
                      key={file.filename}
                      className="text-xs px-2 py-1 bg-zinc-800 rounded font-mono"
                    >
                      {file.filename}
                      {file.language && (
                        <span className="text-gray-500 ml-1">
                          ({file.language})
                        </span>
                      )}
                    </span>
                  ))}
                </div>

                {/* Meta */}
                <div className="text-xs text-gray-500 flex gap-4">
                  <span>Created: {formatDate(gist.created_at)}</span>
                  <span>Updated: {formatDate(gist.updated_at)}</span>
                  <a
                    href={gist.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    View on GitHub →
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
