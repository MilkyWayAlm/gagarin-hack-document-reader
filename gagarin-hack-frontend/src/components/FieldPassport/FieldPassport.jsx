import React from 'react';
import './styles/FieldPassport.css';

function FieldPassport({ setSeries, setNumber, setFullName, setDateBirthday, setPlaceOfBirthday, setGender, setNumberPage }) {
  const handleSeriesChange = (e) => {
    setSeries(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleDateBirthdayChange = (e) => {
    setDateBirthday(e.target.value);
  };

  const handlePlaceOfBirthdayChange = (e) => {
    setPlaceOfBirthday(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleNumberPageChange = (e) => {
    setNumberPage(e.target.value);
  };

  return (
    <div className='fieldPassport'>
      <div className='fio _field'>
        <p className='field-title'>ФИО:</p>
        <input type='text' className='field-input' style={{width: "100%"}} onChange={handleFullNameChange} />
      </div>
      <div className='fieldGender _field'>
        <p className='field-title'>ПОЛ:</p>
        <input type='text' className='field-input' onChange={handleGenderChange} />
      </div>
      <div className='fieldPlaceOfBirth _field'>
        <p className='field-title'>Место рождения:</p>
        <input type='text' className='field-input' onChange={handlePlaceOfBirthdayChange} />
      </div>
      <div className='fieldsSeriesAndNumber'>
        <div className='fieldSeries _field'>
          <p className='field-title'>Серия: </p>
          <input type="text" className='field-input' onChange={handleSeriesChange} />
        </div>
        <div className='fieldNumber _field'>
          <p className='field-title'>Номер:</p>
          <input type='text' className='field-input' style={{width: "290px"}} onChange={handleNumberChange} />
        </div>
      </div>
      <div className='numberPage _field'>
        <p className='field-title'>Номер страницы</p>
        <input type='text' className='field-input' onChange={handleNumberPageChange} />
      </div>
    </div>
  );
}

export default FieldPassport;
