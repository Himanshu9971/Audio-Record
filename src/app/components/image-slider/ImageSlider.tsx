'use client'
import React, { useEffect, useState } from 'react'
import loginImage from '../../../../public/login-bg.svg'
import Image from 'next/image'

const ImageSlider = () => {
    const imageData = [
        {
            id: 1,
            image: loginImage,
            title: ' Speech into Text Effortlessly',
            description: 'Capture every word you say with our cutting-edge speech-to-text technology. It works in real-time, ensuring you never miss a moment of conversation.',
        },
        {
            id: 2,
            image: loginImage,
            title: 'Transform Speech into Text Effortlessly',
            description: 'Capture every word you say with our cutting-edge speech-to-text technology. It works in real-time, ensuring you never miss a moment of conversation.',
        },
        {
            id: 3,
            image: loginImage,
            title: 'Transform Speech into Text Effortlessly',
            description: 'Capture every word you say with our cutting-edge speech-to-text technology. It works in real-time, ensuring you never miss a moment of conversation.',
        },
    ]

    const [currentIndex, setCurrentIndex] = useState(0)
    const goToSlide = (index: React.SetStateAction<number>) => {
        setCurrentIndex(index)
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % imageData.length)
        }, 5000)

        return () => clearInterval(intervalId)
    }, [imageData.length])

    return (
        <div className='flex flex-col items-center w-full max-w-1/2 border-2 p-8 border-gray-200 rounded-3xl'>

            <div className='w-full h-2/3 bg-blue-200 rounded-3xl relative'>

                <Image
                    src={imageData[currentIndex].image}
                    alt="Login Background"
                    className='w-full h-full object-contain'
                />

            </div>

            <div className='text-center py-8 mx-auto'>

                <h1 className='text-2xl font-bold mb-4'>{imageData[currentIndex].title}</h1>
                <p className='text-gray-400 text-md w-full'>
                    {imageData[currentIndex].description}
                </p>

                <div className='flex space-x-2 mt-4 justify-center'>
                    {imageData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-blue-200' : 'bg-gray-300'} transition-all`}
                        />
                    ))}
                </div>

            </div>

        </div>
    )
}

export default ImageSlider