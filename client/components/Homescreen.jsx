export default function GmailNotification() {
    return (
        <div className="w-[320px] bg-white rounded-xl mt-2 shadow-md border border-gray-300 animate-slide-in text-sm font-sans">
        <div className="flex items-start gap-3 px-3 py-2">
          <img src="/gmail.png" alt="gmail" className="h-5 w-5 mt-1" />
  
          <div className="flex-1">
            <div className="flex justify-start gap-3 items-center">
              <span className="font-semibold text-gray-900">Gmail</span>
              <span className="text-xs text-gray-500">now</span>
            </div>
  
            <div className="text-gray-700 leading-tight mt-1">
              <span className="font-medium">HR Team:</span> Meeting at 10 AM with HR regarding internship confirmation.
            </div>
          </div>
        </div>
  
        <div className="flex justify-start border-t border-gray-200">
          <button className="text-[#D93025] font-semibold px-4 py-2 hover:bg-gray-100 transition">
            MARK AS READ
          </button>
          <button className="text-[#D93025] font-semibold px-4 py-2 hover:bg-gray-100 transition">
            REPLY
          </button>
        </div>
      </div>
    );
  }
  