"use client"

import Sidebar from "./Sidebar"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <>
    <div className="flex h-screen items-center justify-center md:hidden poppins">
        <div className="text-center space-y-4">
          <p className="text-lg font-semibold">Oops, I think your screen is too small :(</p>
          <p className="text-gray-600">Consider using the mobile version!</p>
          <div className="space-x-4">
            <Button 
              onClick={() => router.push('/download-app')} 
            >
              Download App
            </Button>
            <Button 
              onClick={() => router.push('/')} 
              className="bg-white text-black hover:bg-slate-200"
            >
              Home
            </Button>
          </div>
        </div>
      </div>
    <div className="h-screen overflow-hidden hidden md:flex">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
    </>
  )
}