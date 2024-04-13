import React from 'react'

import "./styles/DocumentItem.css"
import next from '../../assets/next.svg'
import { Link } from 'react-router-dom'

function DocumentItem({info}) {
  return (
    <div>
      <Link to={`/document/${info.id}`} className='documentItem-link'>
      <div className='documentItem'>
          <div className='documentItem-top'>
              <div className='documentItem-title'>{info.type}</div>
              <img src={next} alt="view document" />
          </div>
          <div className='documentItem-fields'>
              <div className='documentItem-field__series'>Серия: <span>{info.series}</span></div>
              <div className='documentItem-field__number'>Номер: <span>{info.number}</span></div>
          </div>
      </div>
      </Link>
    </div>
  )
}

export default DocumentItem