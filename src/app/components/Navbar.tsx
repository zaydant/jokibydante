import React from "react";
import { Button } from "@mui/material";
import { Search, Home } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div
      className="h-[77px] w-full px-12 flex items-center justify-center"
    >
      <div className="w-2/3 flex justify-between items-center">
        <Menu />
        <SearchAndLogin />
      </div>
    </div>
    </header>
    
  );

  function Menu() {
    return (
      <div className="flex items-center gap-8">
        {/* Logo */}
        <div className="">
          <Image src="/logo_circle.png" height={60} width={60} alt="logo" />
        </div>
        {/* Navigation Links */}
        <div className="flex items-center gap-10">
          <a href="/" className="text-black hover:text-blue-400">
            <Home /> Home
          </a>
          <a href="/invoices" className="text-black hover:text-blue-400">
            <Search /> Transactions
          </a>
        </div>
      </div>
    );
  }

  function SearchAndLogin() {
    return (
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="border-2 border-slate-600 rounded-full py-2 px-4 pl-10 focus:outline-double transition-all text-black"
          />
          <Search className="absolute left-2 text-black" />
        </div>
        {/* Login Button */}
        <Button variant="contained" className="bg-black poppins rounded-full px-4 py-2 hover:bg-slate-700">
          <Link href="/login">Login</Link>
        </Button>
      </div>
    );
  }
}

export default NavBar;
