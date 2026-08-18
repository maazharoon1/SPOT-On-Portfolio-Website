interface SeperatorProps {
  className?: string;
}

function Seperator({ className = "" }: SeperatorProps) {
  return (
    <div className={`w-full px-4 py-8 ${className}`}>
      <div
        className="
          relative
          flex
          
          w-full
          items-center
          justify-center
          overflow-hidden
          rounded-2xl
         
        "
      >
        {/* Subtle top highlight */}
       
        {/* Center content */}
        <div className="relative flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_10px_3px_rgba(168,85,247,0.5)]" />

          <div className="h-px w-10 bg-linear-to-r from-purple-400/50 to-transparent" />

          <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-white/30">
            Spot On
          </span>

          <div className="h-px w-10 bg-linear-to-l from-purple-400/50 to-transparent" />

          <span className="h-1.5 w-1.5 rounded-full bg-[#ef2a32] shadow-[0_0_10px_3px_rgba(239,42,50,0.4)]" />
        </div>

        {/* Bottom highlight */}
     
      </div>
    </div>
  );
}

export default Seperator;