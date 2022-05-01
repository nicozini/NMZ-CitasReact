import { useState, useEffect } from 'react'

import Header from "./components/Header"
import Formulario from "./components/Formulario"
import ListadoPacientes from "./components/ListadoPacientes"

function App() {

  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});


  // Local Storage (utilizo dos useEffect)
  // Para trabajar con storage, primero debo reivsar si hay algo en el state. Si no hay nada lo guardo en el state
  // useEffect es el mejor lugar para mantener sincronizado con Storage
  useEffect(() => {
    // El primer useEffect no observa ninguna dependencia, se ejecuta una sola vez
    // Obtiene lo que haya en localStorage
    const obtenerLS = () => {
      // Si no hay nada en localStorage, agregale un array vacío
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
      setPacientes(pacientesLS);
    }

    obtenerLS();
  }, [])

  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }, [pacientes])



  // Eliminar Paciente
  const eliminarPaciente = (id) => {
    // console.log('Eliminando paciente', id);
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id);
    setPacientes(pacientesActualizados);
  }


  return (
    <div className="container mx-auto mt-20">
      <Header/>

      <div className="mt-12 md:flex">
        <Formulario 
          // Otra forma de acceder a los pacientes en el forumlario sin necesidad de enviarlos como props
          // setPacientes(pacientes => [...pacientes, paciente]) en formulario
          pacientes= {pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes 
          pacientes= {pacientes}
          setPaciente= {setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>

    </div>
  )
}

export default App