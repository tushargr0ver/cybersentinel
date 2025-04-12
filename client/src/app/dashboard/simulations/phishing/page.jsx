"use client";

import { useState } from "react";
import { DashboardLayout } from "../../../../../components/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldAlert, Mail, MessageSquare, AlertTriangle ,Info } from "lucide-react";
import GmailScreen from "../../../../../components/GmailScreen";
import MessagesScreen from "../../../../../components/MessagesScreen";
import WhatsappScreen from "../../../../../components/WhatsappScreen";

import Image from "next/image";
import WhatsappNotification from "../../../../../components/WhatsappNotification";
import GmailNotification from "../../../../../components/GmailNotification";
import MessagesNotification from "../../../../../components/MessagesNotification";

export default function PhishingSimulationPage() {
  const [selectedTab, setSelectedTab] = useState("");
  const [openedScreen, setOpenedScreen] = useState("");

  const handleOpen = (type) => {
    setOpenedScreen(type);
  };

  const renderHomeScreen = () => {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="w-[390px] h-[844px] bg-neutral-900 rounded-[2.8rem] shadow-[inset_0_0_10px_rgba(0,0,0,0.4)] p-[6px] border-[8px] border-neutral-700 relative flex flex-col">
          <div className="relative w-full h-full bg-black rounded-4xl overflow-hidden">
            <Image
              src="/homescreen.JPG"
              alt="Home screen"
              fill
              className="object-cover rounded-4xl"
            />

            {selectedTab === "email" && (
              <div onClick={() => handleOpen("email")} className="absolute top-6 left-6 z-10 cursor-pointer">
                <GmailNotification />
              </div>
            )}
            {selectedTab === "sms" && (
              <div onClick={() => handleOpen("sms")} className="absolute top-6 left-6 z-10 cursor-pointer">
                <MessagesNotification />
              </div>
            )}
            {selectedTab === "whatsapp" && (
              <div onClick={() => handleOpen("whatsapp")} className="absolute top-6 left-6 z-10 cursor-pointer">
                <WhatsappNotification />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderOpenedScreen = () => {
    if (openedScreen === "email") return <GmailScreen />;
    if (openedScreen === "sms") return <MessagesScreen />;
    if (openedScreen === "whatsapp") return <WhatsappScreen />;
    return null;
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Phishing Simulation</h1>
          <p className="text-muted-foreground">
            Practice identifying phishing attempts in emails and text messages
          </p>
        </div>

        {/* ✅ UPDATED onValueChange to reset openedScreen on Refresh */}
        <Tabs
          value={selectedTab}
          onValueChange={(val) => {
            setSelectedTab(val);
            if (val === "homescreen") {
              setOpenedScreen(""); // 🔥 this resets to homescreen
            }
          }}
          className="w-full"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="sms" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  SMS
                </TabsTrigger>
                <TabsTrigger value="whatsapp" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Whatsapp
                </TabsTrigger>

                <TabsTrigger value="homescreen" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Refresh
                </TabsTrigger>

              </TabsList>
              {selectedTab !== "homescreen" && (
                <div className="flex items-center text-red-500 text-sm">
                 <AlertTriangle size={14}/> Refresh to begin with another stimulation
                </div>
              )}
            </div>


          </div>

          {/* This switches between fresh homescreen or an opened message */}
          <div className="mt-6">
            {openedScreen ? renderOpenedScreen() : renderHomeScreen()}
          </div>
        </Tabs>

        <div className="rounded-lg border p-6">
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Phishing Prevention Tips</h2>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-md border p-4">
              <h3 className="mb-2 font-medium">Email Safety</h3>
              <ul className="space-y-1 text-sm">
                <li>• Check sender email addresses carefully for misspellings</li>
                <li>• Hover over links before clicking to see the actual URL</li>
                <li>• Be suspicious of urgent requests or threats</li>
                <li>• Look for personalization (legitimate emails often use your name)</li>
                <li>• Verify requests through official channels, not email links</li>
              </ul>
            </div>
            <div className="rounded-md border p-4">
              <h3 className="mb-2 font-medium">SMS/Text Safety</h3>
              <ul className="space-y-1 text-sm">
                <li>• Never click links in unexpected text messages</li>
                <li>• Don't respond to texts requesting personal information</li>
                <li>• Verify the sender by calling the official number</li>
                <li>• Be wary of shortened URLs in text messages</li>
                <li>• Report suspicious texts to your mobile carrier</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
