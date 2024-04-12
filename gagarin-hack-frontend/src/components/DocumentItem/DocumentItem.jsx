import React from 'react'

import "./styles/DocumentItem.css"
import next from '../../assets/next.svg'

function DocumentItem({title, series, number}) {
  return (
    <div className='documentItem'>
        <div className='documentItem-top'>
            <div className='documentItem-title'>{title}</div>
            <img src={next} alt="view document" />
        </div>
        <div className='documentItem-fields'>
            <div className='documentItem-field__series'>Серия: <span>{series}</span></div>
            <div className='documentItem-field__number'>Номер: <span>{number}</span></div>
        </div>
    </div>
  )
}

export default DocumentItem