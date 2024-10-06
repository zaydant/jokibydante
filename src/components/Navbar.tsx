'use client'

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { HomeIcon, SearchIcon, MenuIcon } from "lucide-react"

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b">
      <div className="container mx-auto w-2/3 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src="/logo_circle.png" height={40} width={40} alt="Logo" />
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/" icon={<HomeIcon className="w-4 h-4" />}>
              Home
            </NavLink>
            <NavLink href="/invoices" icon={<SearchIcon className="w-4 h-4" />}>
              Transactions
            </NavLink>
          </nav>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <SearchBar />
          <LoginButton />
        </div>
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <MenuIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col gap-4">
              <NavLink href="/" icon={<HomeIcon className="w-4 h-4" />}>
                Home
              </NavLink>
              <NavLink href="/invoices" icon={<SearchIcon className="w-4 h-4" />}>
                Transactions
              </NavLink>
              <SearchBar />
              <LoginButton />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

function NavLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
      {icon}
      <span>{children}</span>
    </Link>
  )
}

function SearchBar() {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <Input
        type="search"
        placeholder="Search..."
        className="pl-8 pr-4 w-full md:w-auto"
      />
    </div>
  )
}

function LoginButton() {
  return (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  )
}