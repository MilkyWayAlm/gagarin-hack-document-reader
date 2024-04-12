import React from 'react'
import './styles/FieldPtsOrSts.css'

function FieldPtsOrSts() {
  return (
    <div className='fieldPtsOrSts'>
        <div className='fieldsSeriesAndNumber'>
            <div className='fieldSeries _field'>
                <p className='field-title'>Серия: </p>
                <input type="text" className='field-input'/>
            </div>
            <div className='fieldNumber _field'>
                <p className='field-title'>Номер:</p>
                <input type='text'className='field-input' style={{width: "290px"}}/>
            </div>
        </div>
        <div className='numberPage _field'>
            <p className='field-title'>Номер страницы</p>
            <input type='text' className='field-input'/>
        </div>
    </div>
  )
}

export default FieldPtsOrSts