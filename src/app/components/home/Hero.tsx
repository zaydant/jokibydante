"use client"

/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import Image from 'next/image'
import { Button, Snackbar, Alert } from '@mui/material'
import { Carousel } from "antd";

export default function Hero() {
  const [openAlert, setOpenAlert] = useState(false);

  const carouselSettings = {
    autoplay: true,
    dots: true,
    effect: "fade",
    autoplaySpeed: 3000,
  };

  const handleLearnMore = (event) => {
    event.preventDefault();
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <section className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center min-h-screen">
      <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0">
        <h1 className="text-5xl font-bold mb-4 text-black">Boost Smarter, Manage Faster</h1>
        <p className="text-gray-600 mb-6 text-xl">
          Power your Mobile Legends boosting service with our all-in-one management mobile app!
        </p>
        <div className="flex flex-wrap gap-4">
          <Button variant="contained" className='bg-black text-white rounded-xl h-11 poppins' onClick={handleLearnMore}>
            Learn More
          </Button>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="rounded-xl overflow-hidden mb-4 md:mb-0 w-[270px] h-[600px]">
          <Carousel {...carouselSettings}>
            {['/hero/ss1.png', '/hero/ss2.png', '/hero/ss3.png'].map((src, index) => (
              <div key={index} className="h-[600px]">
                <Image
                  src={src}
                  alt={`Screenshot ${index + 1}`}
                  width={270}
                  height={600}
                  quality={100}
                  className="object-cover"
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      <Snackbar open={openAlert} autoHideDuration={5000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          The button works! It's unfortunate that the page isn't finished. Come back later!
        </Alert>
      </Snackbar>
    </section>
  )
}