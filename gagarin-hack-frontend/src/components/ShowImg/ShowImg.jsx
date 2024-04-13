import React from 'react'

import './styles/ShowImg.css'

function ShowImg({image}) {
  return (
    <div className='imgFile'>
        <div className='imgFileContainer'>
            <img 
                src={image} 
                alt='Загруженное изображение'
                className='imgFileContainer__img' />
        </div>            
    </div>
  )
}

export default ShowImg