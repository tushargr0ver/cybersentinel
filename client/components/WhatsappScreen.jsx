
import { useState } from "react";
import {
  ChevronLeft,
  Smile,
  Mic,
  Phone,
  Video,
  MoreVertical,
  Signal,
  Wifi,
  BatteryFull,
  Paperclip,
  Camera,
} from "lucide-react";


export default function WhatsappScreen() {
  const [messages, setMessages] = useState([
    { id: 1, from: "other", text: "Hey, how are you?", time: "8:22 p. m." },
    { id: 2, from: "me", text: "I'm good! How about you?", time: "8:23 p. m." },
    { id: 3, from: "other", text: "Doing great, thanks!", time: "8:27 p. m." },
    { id: 4, from: "me", text: "Cool 😄", time: "8:30 p. m." },
  ]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-[390px] h-[844px] bg-black rounded-[2.8rem] shadow-[inset_0_0_10px_rgba(0,0,0,0.4)] p-[6px] border-[8px] border-neutral-700 relative flex flex-col">
        <div className="flex-1 bg-white rounded-[2rem] overflow-hidden relative flex flex-col">

          {/* Status Bar */}
          <div className="h-7 w-full flex items-center justify-between px-6 pt-1 text-[13px] text-white font-medium bg-[#128C7E] z-10 relative">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <Signal size={18} />
              <Wifi size={18} />
              <BatteryFull size={20} />
            </div>
          </div>

          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-0 w-40 h-6 bg-black rounded-b-2xl z-30 shadow-md" />

          {/* Main WhatsApp Screen */}
          <div className="flex flex-col h-full w-full overflow-hidden bg-[#ECE5DD]">

            {/* Header */}
            <header className="h-14 bg-[#128C7E] text-white px-2 pr-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ChevronLeft />
                <div className="w-8 h-8 bg-white/30 rounded-full mr-1" />
                <div>
                  <div className="text-sm font-medium">John Doe</div>
                  <div className="text-xs text-white/80">online</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Video size={22} />
                <Phone size={20} />
                <MoreVertical size={20} />
              </div>
            </header>

            {/* Messages Area */}
            <main className="flex-1 overflow-y-auto p-3">
           

              <div className="flex flex-col gap-2">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`max-w-[75%] px-3 py-2 rounded-lg text-sm relative ${
                      msg.from === "me"
                        ? "ml-auto bg-[#DCF8C6] text-gray-900"
                        : "bg-white text-gray-900"
                    }`}
                  >
                    <div>{msg.text}</div>
                    <div className="text-[10px] text-gray-500 text-right mt-1">
                      {msg.time}
                    </div>
                  </div>
                ))}
              </div>
              
            </main>

            {/* Input Section */}
            <div className="px-3 py-2 border-t border-gray-300 flex items-center gap-2 mb-2">
              <div className="flex items-center gap-2 bg-white px-3 py-2.5 rounded-full flex-1 border border-gray-300">
                <Smile className="text-gray-600" size={20} />
                <input
                  type="text"
                  placeholder="Type a message"
                  className="flex-1 bg-transparent text-sm focus:outline-none"
                />
                <Paperclip className="text-gray-600 rotate-45 mr-2" size={20} />
                <Camera className="text-gray-600" size={20} />
              </div>

              <div className="p-2 rounded-full bg-[#128C7E] flex items-center justify-center">
                <Mic className="text-white" size={24} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}