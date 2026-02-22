"use client";

import { useState, useEffect } from "react";
import GistList from "./components/GistList";

interface Gist {
  id: string;
  description: string | null;
  html_url: string;
  files: Record<string, { filename: string; language: string | null }>;
  created_at: string;
  updated_at: string;
  public: boolean;
}

export default function Home() {
  const [token, setToken] = useState("");
  const [gists, setGists] = useState<Gist[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedGists, setSelectedGists] = useState<Set<string>>(new Set());

  // Load token from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("github_token");
    if (saved) setToken(saved);
  }, []);

  const saveToken = () => {
    localStorage.setItem("github_token", token);
  };

  const fetchGists = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("https://api.github.com/gists", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      setGists(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch gists");
    } finally {
      setLoading(false);
    }
  };

  const toggleGistSelection = (id: string) => {
    const newSelected = new Set(selectedGists);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedGists(newSelected);
  };

  const selectAll = () => {
    setSelectedGists(new Set(gists.map((g) => g.id)));
  };

  const clearSelection = () => {
    setSelectedGists(new Set());
  };

  const deleteSelected = async () => {
    if (selectedGists.size === 0) return;

    setLoading(true);
    setError("");

    const results = await Promise.allSettled(
      Array.from(selectedGists).map(async (id) => {
        const response = await fetch(`https://api.github.com/gists/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
          },
        });
        if (!response.ok) throw new Error(`Failed to delete gist ${id}`);
        return id;
      })
    );

    const failed = results.filter((r) => r.status === "rejected");
    if (failed.length > 0) {
      setError(`${failed.length} gists failed to delete`);
    }

    // Remove deleted gists from state
    const deletedIds = results
      .filter((r) => r.status === "fulfilled")
      .map((r) => (r as PromiseFulfilledResult<string>).value);

    setGists(gists.filter((g) => !deletedIds.includes(g.id)));
    setSelectedGists(new Set());
    setLoading(false);
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Gist UI</h1>
          <p className="text-gray-400">
            Manage your GitHub gists locally
          </p>
        </header>

        {/* Token Input */}
        <div className="mb-6 p-4 bg-zinc-900 rounded-lg">
          <label className="block text-sm font-medium mb-2">
            GitHub Personal Access Token
          </label>
          <div className="flex gap-2">
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="ghp_..."
              className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={saveToken}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
            >
              Save
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Requires{" "}
            <code className="px-1 bg-zinc-800 rounded">gist</code> scope.{" "}
            <a
              href="https://github.com/settings/tokens/new"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Create token
            </a>
          </p>
        </div>

        {/* Actions */}
        <div className="mb-6 flex gap-2 flex-wrap">
          <button
            onClick={fetchGists}
            disabled={!token || loading}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-zinc-700 disabled:cursor-not-allowed rounded"
          >
            {loading ? "Loading..." : "Fetch Gists"}
          </button>
          {gists.length > 0 && (
            <>
              <button
                onClick={selectAll}
                className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded"
              >
                Select All
              </button>
              <button
                onClick={clearSelection}
                className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded"
              >
                Clear Selection
              </button>
              <button
                onClick={deleteSelected}
                disabled={selectedGists.size === 0 || loading}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-zinc-700 disabled:cursor-not-allowed rounded"
              >
                Delete Selected ({selectedGists.size})
              </button>
            </>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded text-red-200">
            {error}
          </div>
        )}

        {/* Gists List */}
        <GistList
          gists={gists}
          selectedGists={selectedGists}
          onToggleSelect={toggleGistSelection}
        />
      </div>
    </main>
  );
}
