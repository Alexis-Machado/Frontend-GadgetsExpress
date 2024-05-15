import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './Login.css';

export default function LoginApp() {
  const [showPassword, setShowPassword] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const dataApi = await dataResponse.json()

    if (dataApi.success) {
      toast.success(dataApi.message)
      navigate("/");
      fetchUserDetails()
      fetchUserAddToCart()
    }

    if (dataApi.error) {
      toast.error(dataApi.message)
    }
  }

  return (
    <>
      <div className="background login-background"></div>
      <div className="container2">
        <div className="item">
          <h2 className="logo">
            <img src="https://img.freepik.com/foto-gratis/representacion-3d-compras-tigres_23-2150897671.jpg?t=st=1713042914~exp=1713046514~hmac=0c4f322637226496bd482c3601196a6aed61b0ccb8291920db7d7c78862b7278&w=740" alt="Logo" />
          </h2>
          <div className="text-item text-black text-nowrap">
            <h2>
              <strong>❤️¡BIENVENIDO A 💙 GADGETS EXPRESS!🖤🤍</strong> <br /><br></br>
            </h2>
          </div>
        </div>
        <div className="login-section" style={{ background: 'transparent' }}>
          <div className="form-box login">
            <form onSubmit={handleSubmit}>
              <h2><strong>Iniciar Sesión</strong></h2>
              <div className="input-box bg-slate-100 p-2">
                <span className="icon">
                  <i className="bx bxs-user-account"></i>
                </span>
                <input
                  type="email"
                  placeholder="                                  Ingresa tu Correo 📧"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                />
                <label><strong>Correo Electrónico</strong></label>
              </div>
              <div className="input-box bg-slate-100 p-2">
                <span className="icon">
                  <i className="bx bxs-lock-alt"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="                     Ingresa tu Contraseña 🔑"
                  value={data.password}
                  name="password"
                  onChange={handleOnChange}
                  required
                />
                <label><strong>Contraseña</strong></label>
                <div className="cursor-pointer text-xl ojo" onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <div className="remember-password">
                <label>
                  <input type="checkbox" /> <strong>Recuérdame</strong>
                </label>
                <Link to="/forgot-password"><strong className='text-blue-400 hover:text-blue-950'>Olvidaste tu Contraseña</strong></Link>
              </div>
              <button className="btn hover:bg-blue-950 hover:scale-110 transition-all"><strong>INGRESAR</strong></button>
              <div className="create-account">
                <p>
                  <strong>¿Aún no tienes cuenta? </strong>
                  <Link to="/sign-up" className="register-link"><strong className='text-blue-400 hover:text-blue-950 hover:underline'>Regístrate</strong></Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
