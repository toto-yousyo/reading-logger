"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SyncButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSync() {
    setLoading(true);
    try {
      const res = await fetch("/api/wishlist/sync", { method: "POST" });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error ?? "同期に失敗しました");
        return;
      }
      router.refresh();
    } catch {
      alert("同期に失敗しました");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleSync}
      disabled={loading}
      className="bg-indigo-600 text-white rounded px-4 py-2 hover:bg-indigo-500 disabled:opacity-50"
    >
      {loading ? "同期中..." : "Amazonから同期"}
    </button>
  );
}
