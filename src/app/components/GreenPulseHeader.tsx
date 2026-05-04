import React from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function GreenPulseHeader() {
  return (
    <div className="bg-gradient-to-r from-green-600 to-green-500 px-6 py-5">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <div className="flex items-center gap-3">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1607194402064-d0742de6d17b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGxlYWYlMjBwbGFudCUyMGxvZ298ZW58MXx8fHwxNzcyNjIzODU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="GreenPulse Logo"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-white/30"
          />
          <h1 className="text-2xl font-bold text-white">GreenPulse</h1>
        </div>
        <div />
      </div>
    </div>
  );
}
