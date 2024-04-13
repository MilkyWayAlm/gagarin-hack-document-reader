import React from 'react'

import './styles/ShowImg.css'

function ShowImg({photo}) {
  return (
    <div className='imgFile'>
        <div className='imgFileContainer'>
            <img 
                src={photo} 
                alt='Загруженное изображение'
                className='imgFileContainer__img' />
        </div>            
    </div>
  )
}

export default ShowImg