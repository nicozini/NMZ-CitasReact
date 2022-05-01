// Antes había que importar React. En las versiones actuales ya no es necesario
import React from 'react'
import {useState, useEffect} from 'react'
import Error from './Error'

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
  
  // State / Hooks
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [error, setError] = useState(false);

  // Hook para rellenar el form cuando hago click en editar
  useEffect(() => {
    // Object.keys(<objeto>) se utiliza para comprobar si existe un objeto o si tiene contenido
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])  

  // Funciones
  const generarId = () => {
    let fecha = Date.now().toString(36);
    let random = Math.random().toString(36).substring(2)
    return fecha + random
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    // Primero siempre validar los campos del formulario
    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      console.log('Debes completar todos los campos');
      setError(true);
      return;
    }

    setError(false);

    // Construyo el ojeto paciente para pasarlo al array de pacientes en app.jsx
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
      // id: generarId()
    }


    // SOBRE EDITAR PACIENTES
    if (paciente.id) {
      // Editando el registro
      objetoPaciente.id = paciente.id
      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState )

      setPacientes(pacientesActualizados)
      // Limpio el state
      setPaciente({})

    } else {
      // Nuevo Registro
      objetoPaciente.id = generarId();

      // Otra forma de acceder a los pacientes en el forumlario sin necesidad de enviarlos como props
      // setPacientes(pacientes => [...pacientes, paciente]) en formulario
      // Si paso setPacientes(objetoPaciente), mi array de pacientes en app.jsx pasa a ser un objeto que se sobreescribe
      // Debo copiar el array y agregarle el objeto nuevo
      setPacientes([...pacientes, objetoPaciente]);      
    }


    // Reiniciar el formulario. Lo hago asi porque en el value del form tengo el nombre, email, etc
    // Esto es reiniciar el state a su valor inicial
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }

  // OTRA OPCION PODRIA SER
  // if ([nombre, propietario, email, fecha, sintomas].includes('')) {
  //   setError(true);
  // } else{
  //   setError(false)
  // }


  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      
      <p className="text-lg mt-5 text-center mb-10">Añade Pacientes y {''} <span className="text-indigo-600 font-bold">Administralos</span></p>
      
      <form 
        // Evento aplicado como función
        onSubmit={handleSubmit}
        action="" 
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      >

        {/* Evolución de como muestro el error */}
        {/* { error ? 'Si hay un error' : 'No hay error' } */}
        {/* { error && 'Si hay error en el formulario' } */}
        {/* Si error es verdadero hacer (&&) */}
        {/* { error && 
          <div className='bg-red-800 text-white text-center p-3 uppercase font-bold mb-3 rounded'>
            <p>Todos los campos son obligatorios</p>
          </div>
        } */}
        {/* CREO UN COMPONENTE DE ERROR EN VEZ DEL HTML ACA*/}
        { error && <Error><p>Todos los campos son obligatorios</p></Error>}



        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
          <input 
            type="text" 
            id="mascota" 
            placeholder="Nombre de la mascota" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 

            value={nombre}
            // Evento aplicado como callback
            onChange={ (e) => setNombre(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
          <input 
            type="text" 
            id="propietario" 
            placeholder="Nombre del Propietario" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            
            value={propietario}
            onChange={ (e) => setPropietario(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">E-mail</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Tu E-mail de Contacto" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta Paciente</label>
          <input 
            type="date" 
            id="alta" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            
            value={fecha}
            onChange={ (e) => setFecha(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Síntomas y Comentarios</label>
          <textarea 
            id="sintomas" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            placeholder="Describe los síntomas e ingresa comentarios"

            value={sintomas}
            onChange={ (e) => setSintomas(e.target.value) }
          ></textarea>
        </div>

        <input 
          type="submit" 
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all" 
          value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
        />

      </form>
    </div>
  )
}

export default Formulario




// OTRA FORMA PARA OPTIMIZAR EL STATE ES LA SIGUIENTE
// function Formulario() {
//   const [paciente, setPaciente] = useState({
//     mascota: "",
//     propietario: "",
//     email: "",
//     fechaAlta: "",
//     sintomas: "",
//   });
 
//   const { mascota, propietario, email, fechaAlta, sintomas } = paciente;
 
//   const handleChange = (e) => {
//     setPaciente({
//       ...paciente,
//       [e.target.name]: e.target.value,
//     });
//   };
 
//   const handleSubmit = e => {
//     e.preventDefault();
//     /* aqui los controles */
//     console.log("submit");
//   }
 
//    return (
//     <div className="md:w-1/2 lg:w-2/5 mb-10">
//       <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

//       <p className="text-lg mt-5 text-center">
//         Añadir Pacientes y {""}
//         <span className="text-indigo-600 font-bold ">Administrarlos</span>
//       </p>

//       <form className="bg-gray-400 shadow-md rounded-lg p-5 mt-5" onSubmit={handleSubmit}>
//         <div className="mb-5">
//           <label
//             className="block text-gray-700 uppercase font-bold"
//             htmlFor="mascota"
//           >
//             Nombre Mascota
//           </label>
//           <input
//             className="border-2 w-full p-2 mt-2 rounded-lg placeholder-gray-400"
//             id="mascota"
//             name="mascota"
//             onChange={handleChange}
//             placeholder="Nombre de la Mascota"
//             required
//             type="text"
//             value={mascota}
//           />
//         </div>
//       </form>
//     </div>
//   );
// }
 
// export default Formulario;