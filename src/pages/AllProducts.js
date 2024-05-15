import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()
    console.log("product data", dataResponse)
    setAllProduct(dataResponse?.data || [])
  }

  useEffect(() => {
    fetchAllProduct()
  }, [])

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>Todos los Productos</h2>
        <button className='border-2 border-blue-400 text-blue-400 hover:bg-blue-950 hover:text-white transition-all py-1 px-3 rounded-full' onClick={() => setOpenUploadProduct(true)}><strong>Subir Producto</strong></button>
      </div>

      {/**Todos los Productos*/}
      <div className='bg-slate-100 flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          allProduct.map((product, index) => {
            return (
              <AdminProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProduct} />
            )
          })
        }
      </div>

      {/**Componente para Subir Productos*/}
      {
        openUploadProduct && (
          <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
        )
      }
    </div>
  )
}

export default AllProducts