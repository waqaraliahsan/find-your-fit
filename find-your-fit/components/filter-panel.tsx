"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export function FilterPanel() {
  const router = useRouter();
  const params = useSearchParams();

  function clearFilters() {
    router.push("/");
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {params.get("city") && <span className="px-2 py-1 border rounded">City: {params.get("city")}</span>}
      {params.get("gender") && <span className="px-2 py-1 border rounded">Gender: {params.get("gender")}</span>}
      <Button variant="secondary" onClick={clearFilters}>Clear All</Button>
    </div>
  );
}
