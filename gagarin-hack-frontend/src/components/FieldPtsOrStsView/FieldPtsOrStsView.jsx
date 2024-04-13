// FieldPtsOrSts.jsx
import React from 'react';
import './styles/FieldPtsOrStsView.css';

function FieldPtsOrStsView({ document }) {
  return (
    <div className='fieldPtsOrStsView'>
      <div className='fieldsSeriesAndNumberView'>
        <div className='fieldSeriesView _fieldView'>
          <p className='fieldView-title'>Серия: </p>
          <input value={document.series} type="text" className='fieldView-input' readOnly/>
        </div>
        <div className='fieldNumberView _fieldView'>
          <p className='fieldView-title'>Номер:</p>
          <input value={document.number} type='text' className='fieldView-input' readOnly/>
        </div>
      </div>
      <div className='numberPageView _fieldView'>
        <p className='fieldView-title'>Номер страницы</p>
        <input value={document.numberPage} type='text' className='fieldView-input' readOnly/>
      </div>
    </div>
  );
}

export default FieldPtsOrStsView;
