"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import NavBar from "@/components/Navbar";
import { Loader2 } from "lucide-react";
import { fetchInvoiceData, InvoiceData } from "@/services/TransactionServices";

export default function InvoicePage({
  params,
}: {
  params: { invoiceNumber: string };
}) {
  const { invoiceNumber } = params;
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (!invoiceNumber) {
    notFound();
  }

  return (
    <div className="min-h-screen w-full p-4 bg-white flex flex-col poppins">
      <NavBar />
      <div className="flex flex-col w-full items-center justify-center px-4 py-8">
        <div className="w-2/3 flex flex-col">
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
                : "Transaction date loading..."}
            </p>
            <p className="text-lg mb-4 text-black">
              {invoiceData?.updatedAt
                ? `Last updated on ${new Date(
                    invoiceData.updatedAt
                  ).toLocaleDateString()} at ${new Date(
                    invoiceData.updatedAt
                  ).toLocaleTimeString()}.`
                : "Transaction update date loading..."}
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
            <div className="bg-gray-100 p-6 rounded-lg shadow-2xl border-y my-8 flex flex-col">
              <h2 className="text-2xl font-semibold mb-4">Invoice Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center">
                <div>
                  <p>
                    <strong>Email:</strong> {invoiceData.email}
                  </p>
                  <p>
                    <strong>Login Method:</strong> {invoiceData.loginMethod}
                  </p>
                  <p>
                    <strong>Requested Hero:</strong> {invoiceData.reqHero}
                  </p>
                  <p>
                    <strong>Contact Number:</strong> {invoiceData.contactNumber}
                  </p>
                  <p>
                    <strong>Service:</strong> {invoiceData.rank} x{invoiceData.quantity}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Price:</strong> Rp{" "}
                    {parseFloat(invoiceData.price).toLocaleString()}
                  </p>
                  <p>
                    <strong>Payment Method:</strong> {invoiceData.paymentMethod}
                  </p>
                  <p>
                    <strong>Payment Status:</strong>{" "}
                    {invoiceData.paymentStatus ? "Paid" : "Unpaid"}
                  </p>
                  <p>
                    <strong>Joki Status:</strong> {invoiceData.jokiStatus}
                  </p>
                </div>
              </div>
              {invoiceData.notes && (
                <div className="mt-4">
                  <strong>Notes:</strong>
                  <p>{invoiceData.notes}</p>
                </div>
              )}
              {invoiceData.proof && (
                <div className="mt-4">
                  <strong>Proof of Payment:</strong>
                  <img
                    src={invoiceData.proof}
                    alt="Proof of Payment"
                    className="mt-2 max-w-full h-auto rounded-lg"
                  />
                </div>
              )}
            </div>
          ) : (
            <p className="text-black">No invoice data found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
