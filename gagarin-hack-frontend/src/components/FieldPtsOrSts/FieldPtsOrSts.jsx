// FieldPtsOrSts.jsx
import React, { useEffect } from 'react';
import './styles/FieldPtsOrSts.css';

function FieldPtsOrSts({ fields, setFields }) {
  const {setSeries, setNumber, setNumberPage} = setFields;
  const handleSeriesChange = (e) => {
    setSeries(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleNumberPageChange = (e) => {
    setNumberPage(e.target.value);
  };

  useEffect(() =>{
    setSeries(fields.series);
    setNumber(fields.number);
    setNumberPage(fields.numberPage);
  }, [fields, setSeries, setNumber, setNumberPage]);

  return (
    <div className='fieldPtsOrSts'>
      <div className='fieldsSeriesAndNumber'>
        <div className='fieldSeries _field'>
          <p className='field-title'>Серия: </p>
          <input value={fields.series} type="text" className='field-input' onChange={handleSeriesChange} />
        </div>
        <div className='fieldNumber _field'>
          <p className='field-title'>Номер:</p>
          <input value={fields.number} type='text' className='field-input' onChange={handleNumberChange} />
        </div>
      </div>
      <div className='numberPage _field'>
        <p className='field-title'>Номер страницы</p>
        <input value={fields.numberPage} type='text' className='field-input' onChange={handleNumberPageChange} />
      </div>
    </div>
  );
}

export default FieldPtsOrSts;
