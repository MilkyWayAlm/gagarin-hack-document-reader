import React from 'react'

import './styles/ShowImg.css'
import empty from '../../assets/emptyFile.svg'

function ShowImg({image}) {
  return (
    <div>
      {
        image !== ''
        ? 
        <div className='imgFile'>
          <div className='imgFileContainer'>
              <img 
                src={image} 
                alt='Загруженное изображение'
                className='imgFileContainer__img' />
          </div>            
        </div>
        :
        <div className='imgFileEmpty'>
          <img src={empty} alt='emptyImage'/>
        </div>
      }
    </div>
  )
}

export default ShowImg