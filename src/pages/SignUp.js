import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import ImageToBase64 from '../helpers/ImageToBase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import './Login.css';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  })

  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleUploadPic = async (e) => {
    const file = e.target.files[0]
    const imagePic = await ImageToBase64(file)

    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {

      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const dataApi = await dataResponse.json()

      if (dataApi.success) {
        toast.success(dataApi.message)
        navigate("/login")
      }

      if (dataApi.error) {
        toast.error(dataApi.message)
      }

    } else {
      toast.error("Por favor, Asegúrate de que las Contraseñas Coincidan 📝")
    }
  }

  return (

    <section id='signup'>
      <div className=''>
        <img className='logo2 absolute bottom-28 left-9 right-3/4' src="https://i.ibb.co/GTXRhZ4/tigre2-preview-rev-1.png" alt="Logo" />
        <img className='logo2 absolute bottom-48 left-2/3 right-96' src="https://i.ibb.co/DwZ4bf1/compras-preview-rev-1.png" alt="Logo" />

        <div className='mx-auto container p-2'>
          <div className='bg-white p-0 w-full max-w-sm mx-auto'>
            <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
              <div>
                <img src={data.profilePic || loginIcons} alt='login icons' />
              </div>
              <form>
                <label>
                  <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                    <strong>Subir📸Foto</strong>
                  </div>
                  <input type='file' className='hidden' onChange={handleUploadPic} />
                </label>
              </form>
            </div>

            <form className='pt-3 flex flex-col gap-2' onSubmit={handleSubmit}>
              <div className='grid'>
                <label><strong>Nombre:</strong> </label>
                <div className='bg-slate-100 p-2'>
                  <input
                    type='text'
                    placeholder='Escribe tu Nombre 🙋'
                    name='name'
                    value={data.name}
                    onChange={handleOnChange}
                    required
                    className='w-full h-full outline-none bg-transparent' />
                </div>
              </div>

              <div className='grid'>
                <label><strong>Correo Electrónico:</strong> </label>
                <div className='bg-slate-100 p-2'>
                  <input
                    type='email'
                    placeholder='Escribe tu Correo Electrónico 📧'
                    name='email'
                    value={data.email}
                    onChange={handleOnChange}
                    required
                    className='w-full h-full outline-none bg-transparent' />
                </div>
              </div>

              <div>
                <label><strong>Contraseña:</strong> </label>
                <div className='bg-slate-100 p-2 flex'>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder='Escribe tu Contraseña 🔑'
                    value={data.password}
                    name='password'
                    onChange={handleOnChange}
                    required
                    className='w-full h-full outline-none bg-transparent' />
                  <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
                    <span>
                      {
                        showPassword ? (
                          <FaEyeSlash />
                        )
                          :
                          (
                            <FaEye />
                          )
                      }
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label><strong>Confirma tu Contraseña:</strong> </label>
                <div className='bg-slate-100 p-2 flex'>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder='Vuelve a Escribir tu Contraseña 🔑'
                    value={data.confirmPassword}
                    name='confirmPassword'
                    onChange={handleOnChange}
                    required
                    className='w-full h-full outline-none bg-transparent' />
                  <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((preve) => !preve)}>
                    <span>
                      {
                        showConfirmPassword ? (
                          <FaEyeSlash />
                        )
                          :
                          (
                            <FaEye />
                          )
                      }
                    </span>
                  </div>
                </div>
              </div>

              <button className='bg-blue-400 hover:bg-blue-950 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'><strong>REGISTRARME</strong></button>

            </form>

            <p className='my-5' style={{ marginLeft: '60px' }}><strong>¿Ya tienes una cuenta?</strong> <Link to={"/login"} className='text-blue-400 hover:text-blue-950 hover:underline'><strong>Inicia Sesión</strong></Link></p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUp