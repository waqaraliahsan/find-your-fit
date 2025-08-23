export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default function OkPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">OK ✅</h1>
      <p>If you can see this, the app is serving pages correctly.</p>
      <p>Go back to the home page: <a className="underline text-blue-600" href="/">/</a></p>
    </div>
  );
}
