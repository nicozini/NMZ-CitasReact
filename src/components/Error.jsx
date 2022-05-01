// Recordar que en las versiones nuevas no hace flata el import React. Lo dejo
import React from 'react'

const Error = ({children}) => {
  return (
    <div className='bg-red-800 text-white text-center p-3 uppercase font-bold mb-3 rounded'>
      {children}
    </div>
  )
}

export default Error