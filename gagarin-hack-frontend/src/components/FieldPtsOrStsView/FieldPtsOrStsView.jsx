// FieldPtsOrSts.jsx
import React from 'react';
import './styles/FieldPtsOrStsView.css';

function FieldPtsOrStsView({ document }) {
  return (
    <div className='fieldPtsOrSts'>
      <div className='fieldsSeriesAndNumber'>
        <div className='fieldSeries _field'>
          <p className='field-title'>Серия: </p>
          <input value={document.series} type="text" className='field-input'/>
        </div>
        <div className='fieldNumber _field'>
          <p className='field-title'>Номер:</p>
          <input value={document.number} type='text' className='field-input' style={{width: "290px"}}/>
        </div>
      </div>
      <div className='numberPage _field'>
        <p className='field-title'>Номер страницы</p>
        <input value={document.numberPage} type='text' className='field-input'/>
      </div>
    </div>
  );
}

export default FieldPtsOrStsView;
