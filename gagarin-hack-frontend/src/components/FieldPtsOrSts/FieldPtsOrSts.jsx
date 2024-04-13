// FieldPtsOrSts.jsx
import React from 'react';
import './styles/FieldPtsOrSts.css';

function FieldPtsOrSts({ setSeries, setNumber, setGender, setFullName, setDateBirthday, setPlaceOfBirthday, setNumberPage }) {
  const handleSeriesChange = (e) => {
    setSeries(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleNumberPageChange = (e) => {
    setNumberPage(e.target.value);
  };

  return (
    <div className='fieldPtsOrSts'>
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

export default FieldPtsOrSts;
