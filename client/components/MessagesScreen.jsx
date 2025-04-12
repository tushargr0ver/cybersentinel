"use client";
import { useState } from "react";
import { ArrowLeft, Phone, Video, ChevronLeft, Plus, } from "lucide-react";
import MobileFrameWrapper from "./MobileFrameWrapper";

export default function MessagesScreen() {
  const [messages, setMessages] = useState([
    { id: 1, from: "other", text: "Hey! Just checking in." },
    { id: 2, from: "me", text: "All good! What about you?" },
    { id: 3, from: "other", text: "Doing great, thanks!" },
    { id: 4, from: "me", text: "Nice! Let's catch up soon." },
    { id: 5, from: "other", text: "Sure thing 😄" },
    // Add more to test scroll
  ]);

  return (
    <MobileFrameWrapper>
      <div className="w-full h-full bg-white flex flex-col relative">
        {/* Sticky Top Bar */}
        <header className="h-12 bg-white text-gray-800 px-4 flex items-center justify-between border-b border-gray-200 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <ChevronLeft />

            <span className="font-semibold text-md">+91 9856444390</span>
          </div>
        
        </header>

        {/* Messages Area */}
        <main className="flex-1 overflow-y-auto bg-white px-3 py-3">
          <div className="flex flex-col gap-2 pb-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${msg.from === "me"
                    ? "ml-auto bg-blue-500 text-white rounded-br-sm"
                    : "bg-gray-200 text-black rounded-bl-sm"
                  }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
        </main>

        
        <footer className="bg-white px-3 py-2 border-t mb-2 flex items-center gap-2">
          {/* Plus icon for file upload */}
          <label className="cursor-pointer text-gray-600">
            <Plus size={22} />
            <input type="file" className="hidden" />
          </label>

          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 px-4 py-2 rounded-full bg-gray-100 text-sm focus:outline-none"
          />

          {/* Mic icon for voice recording */}
          <button className="text-blue-500">
            <Plus size={22} />
          </button>
        </footer>

      </div>
    </MobileFrameWrapper>
  );
}