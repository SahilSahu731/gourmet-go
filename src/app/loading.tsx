import { UtensilsCrossed } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black">
      <div className="relative flex flex-col items-center gap-8">
        {/* Animated Rings */}
        <div className="absolute -inset-4 rounded-full border border-orange-500/20 animate-[ping_3s_infinite]" />
        <div className="absolute -inset-8 rounded-full border border-orange-500/10 animate-[ping_3s_infinite_1s]" />

        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-orange-400 to-orange-600 text-white shadow-2xl shadow-orange-500/20 animate-bounce">
          <UtensilsCrossed className="h-10 w-10" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl font-black italic tracking-tighter text-white uppercase">
            Gourmet<span className="text-orange-500">Go</span>
          </p>
          <div className="flex gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-[bounce_1s_infinite_0ms]" />
            <div className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-[bounce_1s_infinite_200ms]" />
            <div className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-[bounce_1s_infinite_400ms]" />
          </div>
        </div>
      </div>
    </div>
  );
}
