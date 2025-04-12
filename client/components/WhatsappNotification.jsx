import { useEffect, useState } from "react";

export default function WhatsappNotification() {


  return (
    <div className="w-[320px] bg-white rounded-xl mt-2 shadow-md border border-gray-300 text-sm font-sans cursor-pointer">
      <div className="flex items-center gap-1 px-3 pt-2 text-xs text-gray-500 font-medium">
        <img src="/whatsapp.png" alt="whatsapp" className="h-4 w-4" />
        <span>WhatsApp</span>
        <span className="mx-1">•</span>
        <span>1 new message</span>
        <span className="mx-1">•</span>
        <span>now</span>
      </div>

      <div className="flex items-start gap-3 p-3">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src="https://i.pravatar.cc/100?img=60"
            alt="profile"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/fallback-profile.png";
            }}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <p className="font-semibold text-gray-900">name</p>
          <p className="text-gray-800">mESSAGE</p>
        </div>
      </div>

      <div className="flex justify-start border-t border-gray-200">
        <button className="text-[#128C7E] font-semibold px-4 py-2 hover:bg-gray-100 transition">
          CLAIM
        </button>
        <button className="text-[#128C7E] font-semibold px-4 py-2 hover:bg-gray-100 transition">
          IGNORE
        </button>
      </div>
    </div>
  );
}