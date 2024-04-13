// FieldPtsOrSts.jsx
import React, { useEffect } from 'react';
import './styles/FieldPtsOrSts.css';

function FieldPtsOrSts({ fields, setFields }) {
  const {series, number, numberPage} = fields
  const {setSeries, setNumber, setNumberPage} = setFields
  const handleSeriesChange = (e) => {
    setSeries(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleNumberPageChange = (e) => {
    setNumberPage(e.target.value);
  };

  // eslint-disable-next-line
  useEffect(() =>{
    setSeries(series);
    setNumber(number);
    setNumberPage(numberPage);
  }, [series, number, numberPage]);

  return (
    <div className='fieldPtsOrSts'>
      <div className='fieldsSeriesAndNumber'>
        <div className='fieldSeries _field'>
          <p className='field-title'>Серия: </p>
          <input value={series} type="text" className='field-input' onChange={handleSeriesChange} />
        </div>
        <div className='fieldNumber _field'>
          <p className='field-title'>Номер:</p>
          <input value={number} type='text' className='field-input' style={{width: "290px"}} onChange={handleNumberChange} />
        </div>
      </div>
      <div className='numberPage _field'>
        <p className='field-title'>Номер страницы</p>
        <input value={numberPage} type='text' className='field-input' onChange={handleNumberPageChange} />
      </div>
    </div>
  );
}

export default FieldPtsOrSts;
