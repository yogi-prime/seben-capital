export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-md flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 select-none">
        <img src="/favicon.ico" alt="Loading" className="h-10 w-10" />
        <div className="h-8 w-8 rounded-full border-2 border-white/30 border-t-white animate-spin" />
        <p className="text-white/80 text-xs tracking-wide">Loading…</p>
      </div>
    </div>
  );
}
