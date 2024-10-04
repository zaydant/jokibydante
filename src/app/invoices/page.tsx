"use client";

import React, { useState } from "react";
import { Search } from "@mui/icons-material";
import NavBar from "../components/Navbar";

export default function Invoices() {
  const [invoiceNumber, setInvoiceNumber] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your search logic here
    console.log("Searching for invoice:", invoiceNumber);
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col poppins">
        <NavBar />
        <div className="flex flex-col w-full items-center justify-center px-4">
          <div className="w-2/3">
            <h1 className="text-4xl font-bold mb-4 mt-12 text-black">Find Your Order!</h1>

            <p className="mb-4 text-black">
              Find your order by entering your invoice number below:
            </p>

            <form onSubmit={handleSearch} className="w-full max-w-md">
              <div className="mb-4">
                <label
                  htmlFor="invoiceNumber"
                  className="block text-sm font-medium mb-2 text-black"
                >
                  Your Invoice Number:
                </label>
                <input
                  type="text"
                  id="invoiceNumber"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-3xl text-black shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                  placeholder="Enter Invoice Number"
                />
              </div>

              <button
                type="submit"
                className="w-1/3 flex items-center justify-center px-4 py-2 border border-transparent 
                rounded-3xl shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <Search className="mr-1" />
                Find Invoice
              </button>
            </form>
          </div>
        </div>
    </div>
  );
}
