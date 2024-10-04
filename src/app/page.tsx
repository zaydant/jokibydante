import Hero from "./components/home/Hero";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white poppins w-full">
      <div className="w-full md:w-2/3 p-4 min-h-screen flex flex-col">
        <Navbar />
        <main className="container">
        <Hero />
        </main>
      </div>
    </div>
  );
}
