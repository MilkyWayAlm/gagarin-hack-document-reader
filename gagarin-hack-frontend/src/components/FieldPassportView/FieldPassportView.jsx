import React from 'react';
import './styles/FieldPassportView.css';

function FieldPassportView({ document }) {
  return (
    <div className='fieldPassport'>
      <div className='fio _field'>
        <p className='field-title'>ФИО:</p>
        <input value={document.fullName} type='text' className='field-input' style={{width: "100%"}}/>
      </div>
      <div className='fieldGender _field'>
        <p className='field-title'>ПОЛ:</p>
        <input value={document.gender} type='text' className='field-input' />
      </div>
      <div className='fieldPlaceOfBirth _field'>
        <p className='field-title'>Место рождения:</p>
        <input value={document.placeOfBirthday} type='text' className='field-input'/>
      </div>
      <div className='fieldsSeriesAndNumber'>
        <div className='fieldSeries _field'>
          <p className='field-title'>Серия: </p>
          <input value={document.series} type="text" className='field-input' />
        </div>
        <div className='fieldNumber _field'>
          <p className='field-title'>Номер:</p>
          <input value={document.number} type='text' className='field-input' style={{width: "290px"}}/>
        </div>
      </div>
      <div className='numberPage _field'>
        <p className='field-title'>Номер страницы</p>
        <input value={document.numberPage} type='text' className='field-input' />
      </div>
    </div>
  );
}

export default FieldPassportView;
