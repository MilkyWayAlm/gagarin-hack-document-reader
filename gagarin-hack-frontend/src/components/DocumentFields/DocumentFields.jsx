import React, { useState } from 'react'

import './styles/DocumentFields.css'
import FieldPtsOrSts from '../FieldPtsOrSts/FieldPtsOrSts'
import FieldPassport from '../FieldPassport/FieldPassport'
import MyBtn from '../../UI/MyBtn/MyBtn'

function DocumentFields() {
    const [type, setType] = useState('')
  return (
    <div className='document__fields'>
        <div className='typeDocument'>
            <p className='typeDocument__text'>Тип документа:</p>
            <input type="text" className='typeDocument__input' onChange={e => setType(e.target.value)} />
        </div>
        <div className='mainField'>
        {
            type === 'Свидетельство о регистрации транспортного средства' || type === 'Паспорт транспортного средства'
            ? <FieldPtsOrSts/>
            : 
                type === 'Паспорт РФ'
                ? <FieldPassport/>
                : <div></div>
        }
        </div>
        <div className='btnAdd'>
            <MyBtn>Добавить в "Мои документы"</MyBtn>
        </div>
    </div>
  )
}

export default DocumentFields