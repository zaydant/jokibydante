'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useToast } from "@/hooks/use-toast"
import { Toaster } from '@/components/ui/toaster'

export default function Hero() {
  const { toast } = useToast()
  const [currentImage, setCurrentImage] = useState(0)
  const images = ['/hero/ss1.png', '/hero/ss2.png', '/hero/ss3.png']

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const handleLearnMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    toast({
      title: "The button works!",
      description: "It's unfortunate that the page isn't finished. Come back later!",
    })
  }

  return (
    <section className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center min-h-screen">
      <div className="w-full md:w-2/3 md:pr-8 mb-8 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">Boost Smarter, Manage Faster</h1>
        <p className="text-gray-600 mb-6 text-lg md:text-xl">
          Power your Mobile Legends boosting service with our all-in-one management mobile app!
        </p>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="default"
            className="bg-black text-white rounded-xl h-11"
            onClick={handleLearnMore}
          >
            Learn More
          </Button>
        </div>
      </div>

      <div className="w-full md:w-1/3 flex justify-center items-center">
        <div className="rounded-xl overflow-hidden mb-4 md:mb-0 w-[270px] h-[600px] relative">
          {images.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`App Screenshot ${index + 1}`}
              width={270}
              height={600}
              quality={100}
              className={`absolute top-0 left-0 transition-opacity duration-500 ${
                index === currentImage ? 'opacity-100' : 'opacity-0'
              }`}
              priority={index === 0}
            />
          ))}
        </div>
      </div>

      <Toaster />
    </section>
  )
}