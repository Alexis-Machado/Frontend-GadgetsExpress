import React from 'react';
import './Footer.css';

const Footer = () => {

  return (
    <footer className='bg-slate-200 fixed bottom-0 w-full px-11'>
      <div className='container mx-auto p-4'>
        <p className='text-center font-bold' title="🧑‍💻ECOMERCE 🤍GADGETS EXPRESS💙 SOPETRÁN">EXPLORA NUESTRO UNIVERSO DIGITAL ✨🚀</p>
      </div>

      {/* Renderiza la imagen */}
      <div className="absolute bottom-0 right-46 p-0">
        <img
          title="INSTITUCIÓN UNIVERSITARIA DIGITAL DE ANTIOQUIA ❤️🖤💙"
          src="https://th.bing.com/th/id/R.76e1e37100b73602df45713eb2045d40?rik=rdFS7DZ3lP9Bcg&pid=ImgRaw&r=0"
          alt="logo"
          style={{ maxWidth: '170px' }}
        />
      </div>

      {/* Renderiza los iconos de redes sociales para todas las páginas */}
      <div className="social-icon2 p-2 px-11" title="REDES SOCIALES💚❤️💗💙🖤">
        <a href="https://wa.me/6045200750">
          <i className="bx bxl-whatsapp" style={{ color: 'green' }}></i>
        </a>
        <a href="https://www.youtube.com/@IUDigitalDeAntioquia">
          <i className="bx bxl-youtube" style={{ color: '#FF0000' }}></i>
        </a>
        <a href="https://www.instagram.com/iudigital/">
          <i className="bx bxl-instagram" style={{ color: '#FF1493' }}></i>
        </a>
        <a href="https://www.facebook.com/soyiudigital/">
          <i className="bx bxl-facebook" style={{ color: 'blue' }}></i>
        </a>
        <a href="#">
          <i className="bx bxl-twitter" style={{ color: 'blue' }}></i>
        </a>
        <a href="#">
          <i className="bx bxl-tiktok" style={{ color: '#000000' }}></i>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
