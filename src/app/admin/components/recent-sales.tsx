import Image from "next/image";

interface RecentSalesProps {
  paymentMethod: string;
  transactionId: string;
  price: string;
}

export function RecentSales({ paymentMethod, transactionId, price }: RecentSalesProps) {
  return (
    <div className="space-y-8 mb-8">
      <div className="flex items-center">
        <div className="p-1">
          <Image src={"/wallet.png"} alt="sales" width={30} height={30} />
        </div>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">{paymentMethod}</p>
          <p className="text-sm text-muted-foreground">{transactionId}</p>
        </div>
        <div className="ml-auto font-medium">+Rp. {price}</div>
      </div>
    </div>
  );
}
