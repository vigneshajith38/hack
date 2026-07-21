export default function Logo() {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white font-semibold">
        VS
      </div>

      <div>
        <h1 className="text-lg font-semibold text-neutral-900">
          VoiceShield
        </h1>

        <p className="text-xs text-neutral-500">
          AI Voice Authenticity
        </p>
      </div>
    </div>
  );
}