import axios from 'axios'

export interface InvoiceData {
  transactionId: string
  owner: string | null
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
  proof: string | null
  createdAt: string
  updatedAt: string
}

const baseUrl = "https://api-dante-joki-871423140998.asia-southeast2.run.app/api"

// Fetch all joki transactions
export const fetchAllInvoiceData = async (): Promise<InvoiceData[]> => {
  try {
    const response = await axios.get<{ message: string; data: InvoiceData[] }>(
      `${baseUrl}/joki`
    )
    return response.data.data
  } catch (error) {
    console.error("Error fetching all invoice data:", error)
    throw new Error("Failed to fetch all invoice data. Please try again later.")
  }
}

// fetch single invoice data
export const fetchInvoiceData = async (invoiceNumber: string): Promise<InvoiceData> => {
  try {
    const response = await axios.get<{ message: string; data: InvoiceData }>(
      `${baseUrl}/joki/${invoiceNumber}`
    )
    return response.data.data
  } catch (error) {
    console.error("Error fetching invoice data:", error)
    throw new Error("Failed to fetch invoice data. Please try again later.")
  }
}
