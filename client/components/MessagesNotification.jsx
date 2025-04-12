export default function MessagesNotification() {
    return (
      <div className="w-[320px] bg-white rounded-xl mt-2 shadow-md border border-gray-300 animate-slide-in text-sm font-sans">
        <div className="flex items-start gap-2 px-3 py-2">
          <img src="/messages.png" alt="message" className="h-4 w-4 mt-1" />
  
          <div className="flex-1">
            <div className="flex justify-start gap-2 items-center">
              <span className="font-semibold mb-1 text-gray-900">Messages</span>
              <span className="text-xs text-gray-500 mb-1">now</span>
            </div>
  
            <div className="text-gray-700 leading-tight mt-1">
              <span className="font-medium">Aman:</span> Bro let's meet at CP sharp 5 PM.
            </div>
          </div>
        </div>
  
        <div className="flex justify-start border-t border-gray-200">
          <button className="text-[#1A73E8] font-semibold px-4 py-2 hover:bg-gray-100 transition">
            REPLY
          </button>
          <button className="text-[#1A73E8] font-semibold px-4 py-2 hover:bg-gray-100 transition">
            ARCHIVE
          </button>
        </div>
      </div>
    );
  }
  