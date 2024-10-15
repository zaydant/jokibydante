"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  CreditCard,
  DollarSign,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  Users,
  Settings,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

const sidebarItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Transactions", href: "/admin/transactions", icon: CreditCard },
  { name: "Users", href: "/admin/users", icon: Users },
  {
    name: "Withdraw Requests",
    href: "/admin/withdraw-requests",
    icon: DollarSign,
  },
  {
    name: "Support Requests",
    href: "/admin/support-requests",
    icon: HelpCircle,
  },
  { name: "Profile", href: "/admin/profile", icon: User },
];

const bottomItems = [
  { name: "Settings", href: "/admin/settings", icon: Settings },
  { name: "Help & Support", href: "/admin/help", icon: HelpCircle },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-[#1C1C25] text-white h-screen w-64 flex flex-col poppins">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden bg-[#1C1C25] text-white border-white"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-[#1C1C25]">
          <SidebarContent pathname={pathname} handleLogout={handleLogout} />
        </SheetContent>
      </Sheet>
      <div className="hidden md:flex flex-col h-full">
        <SidebarContent pathname={pathname} handleLogout={handleLogout} />
      </div>
    </div>
  );
}

function SidebarContent({
  pathname,
  handleLogout,
}: {
  pathname: string;
  handleLogout: () => void;
}) {
  return (
    <>
      <div className="p-4 poppins">
        <Link
          href="/"
          className="flex items-center justify-center space-x-2 text-white"
        >
          <div className="flex items-center justify-center">
            <Image src={"/logo.png"} height={100} width={100} alt="Logo" />
          </div>
        </Link>
      </div>
      <ScrollArea className="flex-grow px-3">
        <div className="space-y-1 py-4">
          {sidebarItems.map((item) =>
            item.name === "Dashboard" ? (
              <Button
                key={item.href}
                asChild
                variant="ghost"
                className={`w-full justify-start ${
                  pathname === item.href
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Link href={item.href} className="flex items-center">
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </Button>
            ) : (
              <AlertDialog key={item.href}>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-400 hover:bg-white/10 hover:text-white"
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Coming Soon!</AlertDialogTitle>
                    <AlertDialogDescription>
                      This feature is under development and will be available
                      soon.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction>
                      <Button variant="default">OK</Button>{" "}
                      {/* This will close the dialog */}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )
          )}
        </div>
      </ScrollArea>
      <div className="mt-auto p-4 border-t border-gray-700 poppins">
        {bottomItems.map((item) => (
          <AlertDialog key={item.href}>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-400 hover:bg-white/10 hover:text-white"
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Coming Soon!</AlertDialogTitle>
                <AlertDialogDescription>
                  This feature is under development and will be available soon.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>
                  <Button variant="default">OK</Button>{" "}
                  {/* This will close the dialog */}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ))}
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-400 hover:bg-white/10 hover:text-white"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Log out
        </Button>
      </div>
    </>
  );
}
