// Si tu archivo actual está en 'src/pages/About/',
// necesitas subir dos niveles (../../) para llegar a 'src',
// y luego bajar a 'assets/'.
import juanPhoto from "../../assets/juan.jpeg";   // CORREGIDO: de .jpg a .jpeg
import ianPhoto from "../../assets/ian.jpeg";   // Esta ya estaba bien
import brayanPhoto from "../../assets/brayan.jpg"; // CORREGIDO: de .jpg a .webp


const About = () => {
  return (
    <div className="mt-[60px] flex justify-center items-center min-h-screen bg-[linear-gradient(rgba(0,0,0,0.6),_rgba(0,0,0,0.6)),url('/fondo_1.png')] bg-no-repeat bg-center bg-fixed font-['MedievalSharp',_cursive] cursor-[url('/assets/sword-cursor.png'),_auto] p-5">
      <ul className="list-none flex flex-wrap justify-center items-stretch gap-5 p-0 max-w-6xl w-full">
        <li className="bg-gradient-to-b from-[#9b7e20] to-[#774b1f] border-2 border-[#c4a484] rounded-lg shadow-lg text-center flex-1 basis-[280px] max-w-xs min-h-[400px] flex flex-col items-center p-5 transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-amber-200/50 hover:scale-105">
          <img className="w-32 h-32 rounded-full object-cover border-2 border-yellow-400 mb-4" src={brayanPhoto} alt="Foto de Brayan" />
          <h2 className="text-white text-xl font-['Cinzel',_serif] my-2.5 text-shadow-[3px_3px_8px_rgba(0,0,0,0.5)]">Brayan Penagos</h2>
          <p className="text-white/70 text-base font-['Cinzel',_serif] leading-snug flex-grow flex items-center text-center">¡Hola! Soy desarrollador Front-End. Me apasiona ser el puente entre el diseño creativo y la funcionalidad técnica, construyendo experiencias web que no solo se vean bien, sino que se sientan increíbles para el usuario.</p>
        </li>
        <li className="bg-gradient-to-b from-[#9b7e20] to-[#774b1f] border-2 border-[#c4a484] rounded-lg shadow-lg text-center flex-1 basis-[280px] max-w-xs min-h-[400px] flex flex-col items-center p-5 transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-amber-200/50 hover:scale-105">
          <img className="w-32 h-32 rounded-full object-cover border-2 border-yellow-400 mb-4" src={juanPhoto} alt="Foto de Sebastián" />
          <h2 className="text-white text-xl font-['Cinzel',_serif] my-2.5 text-shadow-[3px_3px_8px_rgba(0,0,0,0.5)]">Sebastián López</h2>
          <p className="text-white/70 text-base font-['Cinzel',_serif] leading-snug flex-grow flex items-center text-center">Hola, soy un desarrollador que se enfoca en backend, esforzándome al máximo
            para que todos nuestros usuarios tengan una experiencia optimizada y segura.
          </p>
        </li>
        <li className="bg-gradient-to-b from-[#9b7e20] to-[#774b1f] border-2 border-[#c4a484] rounded-lg shadow-lg text-center flex-1 basis-[280px] max-w-xs min-h-[400px] flex flex-col items-center p-5 transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-amber-200/50 hover:scale-105">
          <img className="w-32 h-32 rounded-full object-cover border-2 border-yellow-400 mb-4" src={ianPhoto} alt="Foto de Ian" />
          <h2 className="text-white text-xl font-['Cinzel',_serif] my-2.5 text-shadow-[3px_3px_8px_rgba(0,0,0,0.5)]">Ian Morales</h2>
          <p className="text-white/70 text-base font-['Cinzel',_serif] leading-snug flex-grow flex items-center text-center">Me encanta la programación y la resolución de problemas. Siempre busco mejorar y aprender más sobre el desarrollo web.</p>
        </li>
      </ul>
    </div>
  );
};

export default About;
