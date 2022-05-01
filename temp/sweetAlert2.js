// Para instalar Sweet Alert 2 para React: 

// 1. Instalar sweet alert 2 para react 
//    npm install --save sweetalert2 sweetalert2-react-content

// 2. Importar en el componente que se requiera. Para el caso Paciente.jsx, así:

import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';

// 3. Dentro de la función handleEliminar, de mi componente Paciente.jsx coloqué el siguiente código:

const handleEliminar = () =>{
        Swal.fire({
            title: 'Estás seguro de eliminar?',
            text: "No puedes revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminalo!'
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarPaciente(id);  //llamar el prop y enviar el id
                Swal.fire(
                'Eliminado!',
                'Tu cita se ha eliminado.',
                'success'
                )
            }
        })
}