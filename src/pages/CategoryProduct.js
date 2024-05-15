import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import VerticalCard from '../components/VerticalCard'
import SummaryApi from '../common'

const CategoryProduct = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("category")

    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el => {
        urlCategoryListObject[el] = true
    })

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList, setFilterCategoryList] = useState([])
    const [sortBy, setSortBy] = useState("")

    console.log("sortBy", sortBy)

    const fetchData = async () => {
        const response = await fetch(SummaryApi.filterProduct.url, {
            method: SummaryApi.filterProduct.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                category: filterCategoryList
            })
        })

        const dataResponse = await response.json()

        setData(dataResponse?.data || [])
    }

    const handleSelectCategory = (e) => {
        const { name, value, checked } = e.target

        setSelectCategory((preve) => {
            return {
                ...preve,
                [value]: checked
            }
        })
    }

    useEffect(() => {
        fetchData()
    }, [filterCategoryList])

    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
            if (selectCategory[categoryKeyName]) {
                return categoryKeyName
            }
            return null
        }).filter(el => el)

        setFilterCategoryList(arrayOfCategory)

        //Formato para el cambio de URL cuando se cambia en la casilla de verificación
        const urlFormat = arrayOfCategory.map((el, index) => {
            if ((arrayOfCategory.length - 1) === index) {
                return `category=${el}`
            }
            return `category=${el}&&`
        })

        navigate("/product-category?" + urlFormat.join(""))

    }, [selectCategory])

    const handleOnChangeSortBy = (e) => {
        const { value } = e.target

        setSortBy(value)

        if (value === 'asc') {
            setData(preve => preve.sort((a, b) => a.sellingPrice - b.sellingPrice))
        }

        if (value === 'dsc') {
            setData(preve => preve.sort((a, b) => b.sellingPrice - a.sellingPrice))
        }
    }

    useEffect(() => {

    }, [sortBy])

    return (
        <div className='container mx-auto p-4'>

            {/***Versión de Escritorio */}
            <div className='hidden lg:grid grid-cols-[200px,1fr]'>
                {/**Izquierda */}
                <div className='bg-blue-100 p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
                    {/***Ordenar por */}
                    <div className=''>
                        <h3 className='text-base uppercase font-medium text-black border-b pb-1 border-blue-950 text-center'>Ordenar por</h3>

                        <form className='text-sm flex flex-col gap-2 py-2'>
                            <div className='flex items-center gap-3'>
                                <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"} />
                                <label>Precio: Menor a Mayor</label>
                            </div>

                            <div className='flex items-center gap-3'>
                                <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"} />
                                <label>Precio: Mayor a Menor</label>
                            </div>
                        </form>
                    </div>

                    {/***Filtrar por */}
                    <div className=''>
                        <h3 className='text-base uppercase font-medium text-black border-b pb-1 border-blue-950 text-center'>Categoría</h3>

                        <form className='text-sm flex flex-col gap-2 py-2'>
                            {
                                productCategory.map((categoryName, index) => {
                                    return (
                                        <div className='flex items-center gap-3'>
                                            <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                                            <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                                        </div>
                                    )
                                })
                            }
                        </form>
                    </div>
                </div>

                {/**Derecha (Productos) */}
                <div className='px-4'>
                    <p className='font-medium text-slate-800 text-lg my-2'>Resultados de la Búsqueda: 🔎 {data.length}</p>

                    <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
                        {
                            data.length !== 0 && (
                                <VerticalCard data={data} loading={loading} />
                            )
                        }
                    </div>
                </div>
            </div>
            <br></br><br></br><br></br>
        </div>
    )
}

export default CategoryProduct

