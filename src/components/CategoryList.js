import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const categoryLoading = new Array(13).fill(null)

    const fetchCategoryProduct = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.categoryProduct.url)
        const dataResponse = await response.json()
        setLoading(false)
        setCategoryProduct(dataResponse.data)
    }

    useEffect(() => {
        fetchCategoryProduct()
        // Aplicar el estilo de fondo azul claro al body #f1f5f9
        document.body.style.backgroundColor = '#ecffff';
        // Limpiar el estilo del body cuando el componente se desmonta
        return () => {
            document.body.style.backgroundColor = null;
        };
    }, [])

    // Objeto que mapea las categorías en inglés desde prodcut category a español
    const categoryTranslations = {
        "airpodes": "AirPods",
        "camera": "Cámaras",
        "earphones": "Auriculares",
        "mobiles": "Celulares",
        "Mouse": "Mouse",
        "printers": "Impresoras",
        "processor": "Procesadores",
        "refrigerator": "Neveras",
        "speakers": "Parlantes",
        "trimmers": "Cortapelos",
        "televisions": "Televisores",
        "watches": "Relojes"
    };

    return (
        <div className='container mx-auto p-4'>
            <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
                {
                    loading ? (
                        categoryLoading.map((el, index) => {
                            return (
                                <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-white animate-pulse' key={"categoryLoading" + index}>
                                </div>
                            )
                        })
                    ) :
                        (
                            categoryProduct.map((product, index) => {
                                return (
                                    <Link to={"/product-category?category=" + product?.category} className='cursor-pointer flex flex-col items-center' key={product?.category}>
                                        <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-white flex items-center justify-center hover:shadow-xl'>
                                            <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all' />
                                        </div>
                                        <p className='text-center text-xxs md:text-xs uppercase font-bold'>{categoryTranslations[product?.category]}</p>
                                    </Link>
                                )
                            })
                        )
                }
            </div>
        </div>
    )
}

export default CategoryList