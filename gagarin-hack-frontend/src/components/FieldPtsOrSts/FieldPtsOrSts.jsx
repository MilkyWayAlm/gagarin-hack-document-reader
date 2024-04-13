// FieldPtsOrSts.jsx
import React, { useEffect, useState } from 'react';
import './styles/FieldPtsOrSts.css';

function FieldPtsOrSts({ fields, serverResponse }) {
  const [series, setSeries] = useState(fields.series);
  const [number, setNumber] = useState(fields.number);
  const [numberPage, setNumberPage] = useState(fields.numberPage)
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
  }, [fields]);

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
