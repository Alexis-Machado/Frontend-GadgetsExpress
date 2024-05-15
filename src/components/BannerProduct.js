import React, { useEffect, useState } from 'react'
import image1 from '../assest/banner/Escritorio_bienvenido.webp'
import image2 from '../assest/banner/Escritorio_Asesoria.webp'
import image3 from '../assest/banner/Escritorio_Ambiente.webp'
import image4 from '../assest/banner/Escritorio_RealmeC33.webp'
import image5 from '../assest/banner/Escritorio_Alianzas.webp'

import image1Movile from '../assest/banner/Movil_Bienvenido.webp'
import image2Movile from '../assest/banner/Movil_Asesoria.webp'
import image3Movile from '../assest/banner/Movil_Ambiente.webp'
import image4Movile from '../assest/banner/Movil_RealmeC33.webp'
import image5Movile from '../assest/banner/Movil_Alianzas.webp'

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import './Banner.css';

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0)

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]

    const mobileImages = [
        image1Movile,
        image2Movile,
        image3Movile,
        image4Movile,
        image5Movile
    ]

    const nextImage = () => {
        if (desktopImages.length - 1 > currentImage) {
            setCurrentImage(preve => preve + 1)
        }
    }

    const preveImage = () => {
        if (currentImage != 0) {
            setCurrentImage(preve => preve - 1)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (desktopImages.length - 1 > currentImage) {
                nextImage()
            } else {
                setCurrentImage(0)
            }
        }, 6000)

        return () => clearInterval(interval)
    }, [currentImage])

    return (
        <div className='container mx-auto px-4 rounded'>
            <div className='relative rounded-3xl border-4 border-blue-950 animate-border-color'>
                <div className='h-56 md:h-72 w-full bg-#ecffff relative'>

                    <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                        <div className='flex justify-between w-full text-2xl'>
                            <button onClick={preveImage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft /></button>
                            <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight /></button>
                        </div>
                    </div>

                    {/**Versión de escritorio y tablet*/}
                    <div className='hidden md:flex h-full w-full overflow-hidden rounded-2xl'>
                        {
                            desktopImages.map((imageURl, index) => {
                                return (
                                    <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURl} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                        <img src={imageURl} className='w-full h-full rounded-2xl' />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                {/**Versión movil*/}
                <div className='flex h-full w-full overflow-hidden md:hidden'>
                    {
                        mobileImages.map((imageURl, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURl} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                    <img src={imageURl} className='w-full h-full object-cover' />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default BannerProduct