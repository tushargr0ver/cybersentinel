import React from "react";
import Image from "next/image";
import WhatsappNotification from "./WhatsappNotification";
import GmailNotification from "./GmailNotification";
import MessagesNotification from "./MessagesNotification";

const Homescreen = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-[390px] h-[844px] bg-neutral-900 rounded-[2.8rem] shadow-[inset_0_0_10px_rgba(0,0,0,0.4)] p-[6px] border-[8px] border-neutral-700 relative flex flex-col">
        <div className="relative w-full h-full bg-black rounded-4xl">
          <Image
            src="/homescreen.JPG"
            alt="Home screen"
            fill
            className="object-cover rounded-4xl"
          />

         
        </div>
      </div>
    </div>
  );
};

export default Homescreen;
