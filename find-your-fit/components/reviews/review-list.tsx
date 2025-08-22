export function ReviewList({reviews}:{reviews:any[]}){
  if(!reviews||reviews.length===0) return <p className="text-sm">No reviews yet.</p>;
  return(
    <div className="space-y-2">
      {reviews.map(r=>(
        <div key={r.id} className="border p-2 rounded">
          <p>Rating: {r.rating}/5</p>
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  )
}
