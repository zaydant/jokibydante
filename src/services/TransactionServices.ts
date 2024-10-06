import axios from 'axios'

export interface InvoiceData {
  transactionId: string
  owner: string
  email: string
  password: string
  loginMethod: string
  reqHero: string
  notes: string
  contactNumber: string
  rank: string
  price: string
  quantity: number
  paymentMethod: string
  paymentStatus: boolean
  jokiStatus: string
  proof: string
  createdAt: string
  updatedAt: string
}

export const fetchInvoiceData = async (invoiceNumber: string): Promise<InvoiceData> => {
  try {
    const response = await axios.get<{ message: string; data: InvoiceData }>(
      `https://api-dante-joki-871423140998.asia-southeast2.run.app/api/joki/${invoiceNumber}`
    )
    return response.data.data
  } catch (error) {
    console.error("Error fetching invoice data:", error)
    throw new Error("Failed to fetch invoice data. Please try again later.")
  }
}