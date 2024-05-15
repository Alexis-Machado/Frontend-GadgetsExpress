import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />

      <HorizontalCardProduct category={"airpodes"} heading={"AirPods"} />
      <HorizontalCardProduct category={"watches"} heading={"Relojes"} />

      <VerticalCardProduct category={"mobiles"} heading={"Celulares"} />
      <VerticalCardProduct category={"Mouse"} heading={"Mouse"} />
      <VerticalCardProduct category={"televisions"} heading={"Televisores"} />
      <VerticalCardProduct category={"camera"} heading={"Cámaras & Fotografía"} />
      <VerticalCardProduct category={"earphones"} heading={"Auriculares con Cable"} />
      <VerticalCardProduct category={"speakers"} heading={"Parlantes Bluetooth"} />
      <VerticalCardProduct category={"refrigerator"} heading={"Neveras"} />
      <VerticalCardProduct category={"trimmers"} heading={"Máquinas de Motilar"} />
      <VerticalCardProduct category={"processor"} heading={"Procesadores"} />
      <VerticalCardProduct category={"printers"} heading={"Impresoras"} /><br></br><br></br>
    </div>
  )
}

export default Home