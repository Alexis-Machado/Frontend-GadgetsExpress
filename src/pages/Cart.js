import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayCOPCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";

const Cart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)

    const fetchData = async () => {
        
        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
        })

        const responseData = await response.json()

        if (responseData.success) {
            setData(responseData.data)
        }
    }

    const handleLoading = async () => {
        await fetchData()
    }

    useEffect(() => {
        setLoading(true)
        handleLoading()
        setLoading(false)
    }, [])

    const increaseQty = async (id, qty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(
                {
                    _id: id,
                    quantity: qty + 1
                }
            )
        })

        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
        }
    }

    const decreaseQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(
                    {
                        _id: id,
                        quantity: qty - 1
                    }
                )
            })

            const responseData = await response.json()

            if (responseData.success) {
                fetchData()
            }
        }
    }

    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(
                {
                    _id: id,
                }
            )
        })

        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
            context.fetchUserAddToCart()
        }
    }

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)

    const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice), 0)

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
        <div className='container mx-auto'>
            <div className='text-center text-lg my-3'>
                {
                    data.length === 0 && !loading && (
                        <p className='bg-white py-5'>No Tienes Productos en tu Carrito</p>
                    )
                }
            </div>

            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                {/***Ver Producto*/}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart.map((el, index) => {
                                return (
                                    <div key={el + "Add To Cart Loading" + index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                    </div>
                                )
                            })

                        ) : (
                            data.map((product, index) => {
                                return (
                                    <div key={product?._id + "Add To Cart Loading"} className='w-full bg-slate-200 h-32 my-2 border border-slate-600 rounded-lg grid grid-cols-[128px,1fr]'>
                                        <div className='w-32 h-32 bg-slate-200 rounded-lg'>
                                            <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                                        </div>
                                        <div className='px-4 py-2 relative'>
                                            {/***Eliminar Producto*/}
                                            <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={() => deleteCartProduct(product?._id)}>
                                                <MdDelete />
                                            </div>

                                            <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                            <p className='capitalize text-slate-500'>{categoryTranslations[product?.productId.category]}</p>
                                            <div className='flex items-center justify-between'>
                                                <p className='text-red-600 font-medium text-lg'>{displayCOPCurrency(product?.productId?.sellingPrice)}</p>
                                                <p className='text-slate-700 font-bold text-lg'>{displayCOPCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                            </div>
                                            <div className='flex items-center gap-3 mt-1'>
                                                <button className='border border-blue-950 bg-blue-400 text-white hover:bg-blue-950 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => decreaseQty(product?._id, product?.quantity)}><strong>-</strong></button>
                                                <span><strong>{product?.quantity}</strong></span>
                                                <button className='border border-blue-950 bg-blue-400 text-white hover:bg-blue-950 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => increaseQty(product?._id, product?.quantity)}><strong>+</strong></button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>

                {/***Resumen*/}
                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                    {
                        loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>

                            </div>
                        ) : (
                            <div className='h-45 bg-slate-200 border border-slate-600 rounded-lg p-2'>
                                <h2 className='text-white bg-blue-950 px-4 py-1 text-center rounded-lg'><strong>RESUMEN DE TU COMPRA</strong></h2><br></br>
                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-left text-slate-600'>
                                    <p>CANTIDAD DE PRODUCTOS:</p>
                                    <p className='text-slate-800'><strong>{totalQty}</strong></p>
                                </div><br></br>

                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-left text-slate-600'>
                                    <p>TOTAL A PAGAR:</p>
                                    <p className='text-slate-800'><strong>{displayCOPCurrency(totalPrice)}</strong></p>
                                </div><br></br>

                                <button className='bg-teal-500 hover:bg-teal-600 rounded-lg p-2 text-white w-full hover:scale-95 transition-all' title='PASAR A PASARELA DE PAGOS POR PSE'><strong>PAGAR AHORA</strong></button>
                            </div>
                        )
                    }
                </div>
            </div>
            <br></br><br></br>
        </div>
    )
}

export default Cart