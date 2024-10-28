'use client'

import React, { useState } from "react"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import NavBar from "../../components/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Invoices() {
  const [invoiceNumber, setInvoiceNumber] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (invoiceNumber) {
      router.push(`/invoices/${invoiceNumber}`)
    }
  }

  return (
    <div className="min-h-screen w-full p-4 bg-white flex flex-col poppins">
      <NavBar />
      <div className="flex flex-col w-full items-center justify-center px-4">
        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-bold mb-4 mt-12 text-black">Find Your Order!</h1>
          <p className="mb-4 text-black">Find your order by entering your invoice number below:</p>
          <p className="mb-4 text-black">Enter this id for example: JDTbvae_ZiO1</p>
          <form onSubmit={handleSearch} className="w-full max-w-md">
            <div className="mb-4">
              <label htmlFor="invoiceNumber" className="block text-sm font-medium mb-2 text-black">
                Your Invoice Number:
              </label>
              <Input
                type="text"
                id="invoiceNumber"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full"
                placeholder="Enter Invoice Number"
              />
            </div>
            <Button type="submit" className="w-full">
              <Search className="mr-2 h-4 w-4" />
              Find Invoice
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}