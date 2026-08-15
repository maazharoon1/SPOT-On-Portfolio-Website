interface SeperatorProps {
  className?: string;
}

function Seperator({ className = "" }: SeperatorProps) {
  return (
    <div className={`relative flex w-full items-center justify-center ${className}`}>
      <div className="h-px w-full bg-linear-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="absolute flex items-center gap-3">
        <span className="h-1 w-1 rounded-full bg-purple-400 shadow-[0_0_10px_3px_rgba(168,85,247,0.6)]" />
        <span className="h-2 w-2 rounded-full border border-purple-400/70 bg-purple-500/20 shadow-[0_0_15px_4px_rgba(168,85,247,0.35)]" />
        <span className="h-1 w-1 rounded-full bg-purple-400 shadow-[0_0_10px_3px_rgba(168,85,247,0.6)]" />
      </div>
    </div>
  );
}

export default Seperator;
