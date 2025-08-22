"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function search() {
    router.push(`/?q=${encodeURIComponent(q)}`);
  }

  return (
    <div className="flex gap-2">
      <Input placeholder="Search mentors..." value={q} onChange={(e) => setQ(e.target.value)} />
      <Button onClick={search}>Search</Button>
    </div>
  );
}
