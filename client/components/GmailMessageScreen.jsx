"use client";
import { useState } from "react";
import MobileFrameWrapper from "../components/MobileFrameWrapper";
import { Menu, Pencil, Star, ArrowLeft, Archive, Trash, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";

const getRandomColor = (sender) => {
  const colors = [
    "bg-red-500", "bg-blue-500", "bg-green-500",
    "bg-yellow-500", "bg-purple-500", "bg-pink-500",
    "bg-indigo-500", "bg-teal-500", "bg-orange-500"
  ];
  let hash = 0;
  for (let i = 0; i < sender.length; i++) {
    hash = sender.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export default function GmailScreen() {
  const [activeTab, setActiveTab] = useState("All inboxes");
  const [starred, setStarred] = useState({});
  const [selectedEmail, setSelectedEmail] = useState(null);

  const toggleStar = (id) => {
    setStarred((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const profilePics = {
    Google: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    Figma: "https://cdn.worldvectorlogo.com/logos/figma-1.svg",
    GitHub: "https://avatars.githubusercontent.com/u/9919?s=200&v=4",
    LinkedIn: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
    Netflix: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    Amazon: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    Spotify: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
  };

  const emailData = [
    {
      id: 1,
      sender: "Google",
      subject: "Security Alert",
      snippet: "A new sign-in from Chrome on Windows was detected.",
      time: "9:30 AM",
    },
    {
      id: 2,
      sender: "Figma",
      subject: "Design Update",
      snippet: "Check out the new components library we added.",
      time: "8:45 AM",
    },
  ];

  const EmailCard = ({ id, sender, subject, snippet, time }) => {
    const profileImg = profilePics[sender];
    const colorClass = getRandomColor(sender);

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: id * 0.05 }}
        onClick={() => setSelectedEmail({ id, sender, subject, snippet, time })}
        className={`flex items-start gap-3 p-2 rounded-xl w-full shadow-sm cursor-pointer transition duration-200 ${
          id <= 2 ? "bg-blue-50 hover:bg-blue-100" : "bg-white hover:bg-gray-100"
        }`}
      >
        <div
          className={`h-10 w-10 flex-shrink-0 rounded-full flex items-center justify-center text-white font-bold overflow-hidden ${
            profileImg ? "" : colorClass
          }`}
        >
          {profileImg ? (
            <img
              src={profileImg}
              alt={sender}
              className="h-full w-full object-cover"
            />
          ) : (
            sender[0]
          )}
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-[15px] text-gray-800 truncate">{sender}</h3>
            <span className="text-xs text-gray-400 flex-shrink-0">{time}</span>
          </div>
          <p className="text-sm font-medium text-gray-700 truncate">{subject}</p>
          <p className="text-sm text-gray-500 truncate">{snippet}</p>
        </div>

        <button
          className="text-gray-400 hover:text-yellow-400 transition"
          onClick={(e) => {
            e.stopPropagation();
            toggleStar(id);
          }}
        >
          <Star
            size={18}
            fill={starred[id] ? "#FACC15" : "none"}
            className={starred[id] ? "text-yellow-400" : ""}
          />
        </button>
      </motion.div>
    );
  };

  return (
    <MobileFrameWrapper>
      <div className="w-full h-full bg-white flex flex-col relative">

        {/* Top Bar with Back, Mail, Archive, Delete, and More options */}
        <div className="flex items-center justify-between bg-white shadow-md px-4 py-3 border-b border-gray-200">
          <button
            onClick={() => setSelectedEmail(null)}
            className="text-blue-600 hover:text-blue-800 transition"
          >
            <ArrowLeft size={22} />
          </button>
          <h2 className="text-lg font-semibold text-gray-800">Mail</h2>
          <div className="flex items-center gap-3">
            <button className="text-gray-500 hover:text-gray-700">
              <Archive size={20} />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <Trash size={20} />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Email Detail Screen */}
        {selectedEmail ? (
          <div className="flex flex-col flex-1 p-4">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {selectedEmail.subject}
              </h2>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              From: <strong>{selectedEmail.sender}</strong>
            </div>
            <div className="text-xs text-gray-400 mb-4">
              {selectedEmail.time}
            </div>
            <p className="text-gray-700 leading-relaxed">
              {selectedEmail.snippet} <br /><br />
              This is a mock detailed view. You can add full HTML email content, images, etc. here.
            </p>
          </div>
        ) : (
          <>
            {/* Search Bar */}
            <div className="px-4 py-2">
              <div className="flex items-center justify-between bg-blue-50 px-3 h-12 rounded-4xl">
                <Menu className="text-gray-500" size={20} width={28} />
                <input
                  type="text"
                  placeholder="Search in mail"
                  className="bg-transparent text-[15px] text-gray-700 placeholder:text-gray-400 w-full mx-3 focus:outline-none font-medium"
                />
                <img
                  src="https://i.pravatar.cc/40"
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
              </div>
            </div>

            {/* Email List */}
            <main className="flex-1 overflow-y-auto scrollbar-hide px-4">
              <h2 className="text-sm font-semibold py-2 text-gray-500">
                {activeTab}
              </h2>
              <div className="space-y-2">
                {emailData.map((email) => (
                  <EmailCard key={email.id} {...email} />
                ))}
              </div>
            </main>

           
           <button className="absolute bottom-20 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110 active:scale-95">
              <Pencil size={20} />
            </button>
          </>
        )}
      </div>
    </MobileFrameWrapper>
  );
}