"use client";
import { useRouter, useSearchParams } from "next/navigation";
export function Pagination({page,total}:{page:number,total:number}){
  const router=useRouter();
  const params=useSearchParams();
  const prev=()=>{if(page>1){router.push(`/?page=${page-1}`)}};
  const next=()=>{if(page<total){router.push(`/?page=${page+1}`)}};
  return(
    <div className="flex gap-2 py-4">
      <button onClick={prev} disabled={page<=1} className="px-3 py-1 border rounded">Prev</button>
      <span>Page {page} / {total}</span>
      <button onClick={next} disabled={page>=total} className="px-3 py-1 border rounded">Next</button>
    </div>
  );
}
