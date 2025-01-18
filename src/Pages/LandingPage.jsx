import React from 'react';

const LandingPage = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 60, // Ajustamos el desplazamiento por el navbar
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header/Navegación */}
      <nav className="flex justify-between items-center p-6 bg-emerald-600 text-white">
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
      {/* Aquí va tu logo, por ahora es un placeholder */}
      <img src="/path-to-your-logo.png" alt="Logo" className="w-8 h-8 object-contain" />
    </div>
    <h1 className="text-2xl md:text-4xl font-extrabold text-white">KinderGarden</h1>
  </div>

  {/* Menú en dispositivos móviles solo muestra "Registrarse", en dispositivos grandes muestra los links */}
  <div className="md:flex  md:block hidden">
    <a
      href="#features"
      onClick={() => scrollToSection('features')}
      className="px-4 py-2 hover:underline"
    >
      Características
    </a>
    <a
      href="#contact"
      onClick={() => scrollToSection('contact')}
      className="px-4 py-2 hover:underline"
    >
      Contacto
    </a>


  {/* Botón Registrarse siempre visible, pero en móviles se centra */}
  <button className="px-4 py-2 bg-yellow-500 rounded-full hover:bg-yellow-400 mt-4 md:mt-0">
    Registrarse
  </button>
  </div>
</nav>


      {/* Hero Section */}
      <section className="relative h-[100vh] bg-gradient-to-b from-gray-100 to-white">
        <div className="absolute top-0 left-0 w-full h-64 bg-emerald-600 z-10">
          <div className="container mx-auto px-6 py-10 text-center">
            <h2 className="text-white text-3xl md:text-6xl font-extrabold leading-tight mb-4">
              Gestión Inteligente y Segura para tus Pequeños
            </h2>
            <p className="text-white text-lg md:text-xl mb-8">
              Seguridad, confianza y tecnología al servicio de la educación infantil.
            </p>
            <button className="px-8 py-3 bg-yellow-400 text-emerald-600 rounded-full hover:bg-yellow-500">
              Aprende Más
            </button>
          </div>
        </div>
        
        {/* Formas decorativas */}
        <div className="absolute top-64 left-0 w-full overflow-hidden z-0">
          <div className="relative h-32">
            <div className="absolute w-1/3 h-32 bg-yellow-300 transform -skew-x-12"></div>
            <div className="absolute left-1/3 w-1/3 h-32 bg-red-400"></div>
            <div className="absolute right-0 w-1/3 h-32 bg-orange-400 transform skew-x-12"></div>
          </div>
        </div>

   {/* Ilustración minimalista */}
<div className="absolute top-96 left-0 w-full z-[1] flex justify-center mt-5">
  <img
    src="https://itt0resources.blob.core.windows.net/kindertrack/child.svg" 
    alt="Ilustración minimalista de niños jugando"
    className="w-full md:w-1/2 h-auto mt-5"
  />
</div>

      </section>

      {/* Características */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Características Principales</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img src="/api/placeholder/400/300" alt="Gestión de Niños" className="w-full h-48 object-cover rounded mb-4" />
              <h3 className="text-xl font-bold mb-2">Gestión de Entradas y Salidas</h3>
              <p>Registra y gestiona de manera segura la entrada y salida de los niños en tu institución.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img src="/api/placeholder/400/300" alt="Notificaciones" className="w-full h-48 object-cover rounded mb-4" />
              <h3 className="text-xl font-bold mb-2">Notificaciones en Tiempo Real</h3>
              <p>Envía alertas automáticas a los padres sobre las actividades de sus hijos.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img src="/api/placeholder/400/300" alt="Seguridad" className="w-full h-48 object-cover rounded mb-4" />
              <h3 className="text-xl font-bold mb-2">Seguridad Avanzada</h3>
              <p>Autenticación con tokens para garantizar que los niños solo salgan con autorización válida.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="bg-emerald-600 py-16 text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">Más de 200 Centros Confían en Nosotros</h2>
          <p className="text-lg mb-8">
            Nuestro sistema ayuda a proteger y gestionar a miles de niños diariamente.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-3xl font-bold">20,000+</h3>
              <p>Niños Registrados</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">15+</h3>
              <p>Años de Experiencia</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">99.9%</h3>
              <p>Satisfacción Garantizada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de contacto */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8 text-center">Contáctanos</h2>
          <p className="text-xl text-center mb-12">
            ¿Tienes preguntas? Nuestro equipo está aquí para ayudarte.
          </p>
          <form className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-6">
              <label htmlFor="name" className="block text-lg font-bold mb-2">Nombre</label>
              <input type="text" id="name" className="w-full p-4 border rounded-lg" placeholder="Tu nombre" />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-lg font-bold mb-2">Correo Electrónico</label>
              <input type="email" id="email" className="w-full p-4 border rounded-lg" placeholder="Tu correo" />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-lg font-bold mb-2">Mensaje</label>
              <textarea id="message" className="w-full p-4 border rounded-lg" rows="4" placeholder="Tu mensaje"></textarea>
            </div>
            <button type="submit" className="w-full py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700">
              Enviar Mensaje
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <p>&copy; 2025 KinderTrack. Todos los derechos reservados.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">Facebook</a>
              <a href="#" className="hover:underline">Instagram</a>
              <a href="#" className="hover:underline">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
