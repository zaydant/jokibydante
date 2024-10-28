"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import NavBar from "@/components/Navbar";
import { Loader2, Clipboard } from "lucide-react";
import { fetchInvoiceData, InvoiceData } from "@/services/TransactionServices";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Badge } from "@/components/ui/badge";

// Helper function to format price
function formatPrice(price: number): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add dot every 3 digits
}

export default function InvoicePage({
  params,
}: {
  params: { invoiceNumber: string };
}) {
  const { invoiceNumber } = params;
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast(); // Hook to use the toast

  useEffect(() => {
    const getInvoiceData = async () => {
      try {
        if (!invoiceNumber) {
          throw new Error("Invalid invoice number");
        }
        const data = await fetchInvoiceData(invoiceNumber);
        setInvoiceData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    getInvoiceData();
  }, [invoiceNumber]);

  const handleCopy = (price: string) => {
    navigator.clipboard.writeText(price).then(() => {
      toast({
        title: "Copied to clipboard",
        description: `${price} has been copied.`,
      });
    });
  };

  if (!invoiceNumber) {
    notFound();
  }

  return (
    <div className="min-h-screen w-full p-4 bg-white flex flex-col poppins">
      <NavBar />
      <div className="flex flex-col w-full items-center justify-center px-4 py-8">
        <div className="w-full md:w-2/3 flex flex-col">
          <div className="flex flex-col justify-start">
            <h1 className="text-4xl font-bold mb-4 text-black">Thank You!</h1>
            <h3 className="text-lg mb-8 text-black">
              Your order {invoiceData?.transactionId} is finished!
            </h3>
            <p className="text-lg mb-4 text-black">
              {invoiceData?.createdAt
                ? `This transaction was created on ${new Date(
                    invoiceData.createdAt
                  ).toLocaleDateString()} at ${new Date(
                    invoiceData.createdAt
                  ).toLocaleTimeString()}.`
                : ""}
            </p>
            <p className="text-lg mb-4 text-black">
              {invoiceData?.updatedAt
                ? `Last updated on ${new Date(
                    invoiceData.updatedAt
                  ).toLocaleDateString()} at ${new Date(
                    invoiceData.updatedAt
                  ).toLocaleTimeString()}.`
                : ""}
            </p>
          </div>
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading invoice data...</span>
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : invoiceData ? (
            <div className="flex flex-col md:flex-row w-full justify-start bg-gray-100 p-6 rounded-lg shadow-2xl border-y my-8">
              <div className="flex flex-col w-full md:w-1/2 mx-4">
                <div className="flex flex-col md:flex-row p-4">
                  <Image
                    src={"/invoice/rank.png"}
                    alt="Joki Rank"
                    width={200}
                    height={100}
                    quality={90}
                    className="object-cover rounded-lg"
                  />
                  <div className="flex flex-col justify-start ml-4">
                    <h3 className="text-md mb-2 mt-2 md:mt-0 font-bold">Joki Rank</h3>
                    <h3 className="text-md mb-4 font-bold">
                      {invoiceData.rank} x{invoiceData.quantity}
                    </h3>
                    <div className="grid grid-cols-3 gap-4 pb-2">
                      <p className="text-sm mb-1">Email:</p>
                      <p className="text-sm mb-1">{invoiceData.email}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pb-2">
                      <p className="text-sm mb-1">Password:</p>
                      <p className="text-sm mb-1">{invoiceData.password}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pb-2">
                      <p className="text-sm mb-1">Login</p>
                      <p className="text-sm mb-1">{invoiceData.loginMethod}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pb-2">
                      <p className="text-sm mb-1">Req Hero:</p>
                      <p className="text-sm mb-1">{invoiceData.reqHero}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pb-2">
                      <p className="text-sm mb-1">Contact Number:</p>
                      <p className="text-sm mb-1">
                        {invoiceData.contactNumber}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 flex justify-between items-center">
                  <h3>Total Payment:</h3>
                  <button
                    className="flex items-center space-x-2 rounded-md border border-slate-600 px-2.5 py-1 hover:bg-slate-200 text-lg md:text-xl print:hidden"
                    onClick={
                      () => handleCopy(formatPrice(Number(invoiceData.price))) // Ensure price is a number
                    }
                  >
                    <div className="max-w-[172px] truncate md:w-auto md:max-w-none flex items-center text-sm">
                      Rp. {formatPrice(Number(invoiceData.price))}
                      <Clipboard className="ml-2" />
                    </div>
                  </button>
                </div>
              </div>
              <div className="flex flex-col w-full md:w-1/2 mx-4">
                <div className="flex flex-col p-4 w-full">
                  <h3 className="mb-4">Payment Method</h3>
                  {invoiceData.paymentMethod === "Bank Transfer" ? (
                    <>
                      <div className="flex flex-col items-start justify-center w-full">
                        <Image
                          src={"/invoice/bca.png"}
                          alt="Bank Transfer"
                          width={200}
                          height={100}
                          quality={90}
                          className="object-cover rounded-lg mb-4 justify-center"
                        />
                        <div className="grid grid-cols-2 gap-4 pb-2 w-full">
                          <p className="text-sm mb-1">Account Number:</p>
                          <p className="text-sm mb-1 font-bold">6663331234</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pb-2 w-full">
                          <p className="text-sm mb-1">Account Holder:</p>
                          <p className="text-sm mb-1 font-bold">
                            SOMEONE&apos;S NAME
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Image
                        src={"/invoice/gopay.png"}
                        alt="Gopay"
                        width={200}
                        height={100}
                        quality={90}
                        className="object-cover rounded-lg mb-4"
                      />
                      <p className="text-sm">Account Number: 081234567890</p>
                      <p className="text-sm">
                        Account Holder: SOMEONE&apos;S NAME
                      </p>
                    </>
                  )}
                  <div className="border-black mt-8 grid w-full grid-cols-8 gap-4 border-t pt-8 text-left md:gap-x-2">
                    <div className="col-span-3 flex items-center md:col-span-4 text-sm">
                      Invoice Number:
                    </div>
                    <div className="col-span-5 flex items-center md:col-span-4 text-sm">
                      <button
                        className="flex items-center space-x-2 rounded-md border border-slate-600 px-2.5 py-1 hover:bg-slate-200 text-lg md:text-xl print:hidden"
                        onClick={() => handleCopy(invoiceData.transactionId)}
                      >
                        <div className="max-w-[172px] truncate md:w-auto md:max-w-none flex items-center text-sm">
                          {invoiceData.transactionId}
                          <Clipboard className="ml-2" />
                        </div>
                      </button>
                    </div>
                    <div className="col-span-3 flex items-center md:col-span-4 text-sm">
                      Transaction Status:
                    </div>
                    <div className="col-span-5 flex items-center md:col-span-4 text-sm">
                      {invoiceData.paymentStatus === true ? (
                        <Badge className="bg-green-500">Paid</Badge>
                      ) : (
                        <Badge variant="destructive">Not Paid</Badge>
                      )}
                    </div>
                    <div className="col-span-3 flex items-center md:col-span-4 text-sm">
                      Joki Status:
                    </div>
                    <div className="col-span-5 flex items-center md:col-span-4 text-sm">
                      {invoiceData.jokiStatus === "finished" ? (
                        <Badge className="bg-green-500">Finished</Badge>
                      ) : status === "onProgress" ? (
                        <Badge className="bg-orange-500">On Progress</Badge>
                      ) : (
                        <Badge variant="destructive">Not Started</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col w-full mt-8">
                    <h3 className="font-bold text-md text-black mb-4">
                      Screenshot Proof
                    </h3>
                    {invoiceData.proof && (
                      <Image
                        src={invoiceData.proof}
                        alt="Payment Proof"
                        width={600}
                        height={400}
                        quality={90}
                        className="object-cover rounded-lg"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-black">No invoice data found.</p>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
